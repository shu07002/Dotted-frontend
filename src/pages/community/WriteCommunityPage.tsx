import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import TagBox from '@/components/WriteCommunityPage/TagBox';
import Editor from '@/components/WriteCommunityPage/Editor';

export interface CommunityData {
  title: string;
  content: string;
  images: string[]; // create 시에는 base64만 담겨있다고 가정
  tag: string;
}

export interface CommunityUpdateData {
  title: string;
  content: string;
  images: ImagePayload[];
  tag: string;
}

export interface ImagePayload {
  id?: number;
  action: 'keep' | 'delete' | 'add';
  order: number;
  image_data?: string; // add 시 필수
}

/** 기존에 서버에서 받아온 이미지 정보 예시 */
interface OriginalImage {
  id: number;
  image_url: string; // 예: s3 url
}

export default function WriteCommunityPage() {
  const { register, handleSubmit, watch, setValue, trigger } =
    useForm<CommunityData>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // location state로부터 넘어온 기존 데이터 (수정 모드일 때)
  const { state } = useLocation();

  /**
   * originalImageList에는 서버에서 받아온 기존 이미지 정보( image_id, url 등 )를 저장해둡니다.
   * 수정 시에 keep/delete 여부 판단할 때 사용합니다.
   */
  const originalImageList = useRef<OriginalImage[]>([]);

  useEffect(() => {
    if (state && state.postId) {
      setEditMode(true);
      setValue('title', state.title || '');
      setValue('content', state.content || '');
      setValue('tag', state.tag || '');
      // 서버에서 받아온 기존 이미지 목록
      if (state.images) {
        originalImageList.current = state.images;
      }
    }
  }, [state, setValue]);

  // 뒤로가기/새로고침 방지 로직
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isSubmitted) return false;
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state === 'blocked' && !isSubmitted) {
      const confirmLeave = window.confirm(
        'Your unsaved changes may be lost. Do you want to leave?'
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, isSubmitted]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitted]);

  // -------------------------------------
  // 1) 게시글 생성 Mutation
  // -------------------------------------
  const postingMutation = useMutation({
    mutationFn: async (data: CommunityData) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) throw new Error('Failed to posting');
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 글쓰기 성공:', data);
      setIsSubmitted(true);
      blocker.reset?.();
      navigate('/community');
    },
    onError: (error) => {
      console.error('❌ 글쓰기 실패:', error);
    }
  });

  // -------------------------------------
  // 2) 게시글 수정 Mutation (PATCH)
  // -------------------------------------
  const updateMutation = useMutation({
    mutationFn: async ({
      postId,
      data
    }: {
      postId: number;
      data: CommunityUpdateData;
    }) => {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/${postId}/update`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) throw new Error('Failed to update post');
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 글수정 성공:', data);
      setIsSubmitted(true);
      blocker.reset?.();
      setTimeout(() => {
        navigate('/community');
      }, 100);
    },
    onError: (error) => {
      console.error('❌ 글수정 실패:', error);
    }
  });

  /**
   * 에디터 내용에서 data URL을 추출합니다. (새로 추가된 이미지)
   * <img src="data:...."> 형태만 뽑아낸다고 가정
   */
  const extractBase64Images = (htmlContent: string) => {
    const srcArray: string[] = [];
    const imgTagRegex = /<img[^>]*src=["'](data:[^"']+)["'][^>]*>/g;
    let match;
    while ((match = imgTagRegex.exec(htmlContent)) !== null) {
      srcArray.push(match[1]);
    }
    return srcArray;
  };

  /**
   * 최종 content에서 <img src="...">를 전부 뽑아내서,
   * 기존 이미지가 여전히 남아있는지(keep), 사라졌는지(delete), 새로 추가되었는지(add) 판별하는 로직 예시
   */
  const buildImagePayloadForUpdate = (
    htmlContent: string,
    originalImages: OriginalImage[]
  ): ImagePayload[] => {
    // 1) 최종 content에서 모든 img src 추출
    const allImgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g;
    const foundSrcList: string[] = [];
    let match;
    while ((match = allImgRegex.exec(htmlContent)) !== null) {
      foundSrcList.push(match[1]);
    }

    // 2) 결과로 보낼 image 배열
    const imagePayload: ImagePayload[] = [];
    let order = 1;

    // 2-1) 기존 이미지에 대해 keep/delete 판단
    for (const original of originalImages) {
      if (foundSrcList.includes(original.image_url)) {
        // 에디터 최종 내용에 원본 url이 남아있으면 keep
        imagePayload.push({
          id: original.id,
          action: 'keep',
          order: order++
        });
      } else {
        // 최종 내용에 없으면 delete
        imagePayload.push({
          id: original.id,
          action: 'delete',
          order: -1
        });
      }
    }

    // 2-2) 새로 추가된 base64 이미지(add)
    // 이미 foundSrcList에 base64가 들어있음.
    // 그 중에 기존 url이 아닌 data: 로 시작하는 것은 새 이미지로 판단
    for (const src of foundSrcList) {
      if (src.startsWith('data:')) {
        imagePayload.push({
          action: 'add',
          order: order++,
          image_data: src
        });
      }
    }

    return imagePayload;
  };

  // -------------------------------------
  // onSubmit
  // -------------------------------------
  const onSubmit = async (data: CommunityData) => {
    // 중복 클릭 방지
    if (postingMutation.isPending || updateMutation.isPending) return;

    // content 내의 base64 이미지 추출 (create 시 사용)
    const extractedImages = extractBase64Images(data.content);

    console.log(extractedImages);

    if (!editMode) {
      // -----------------------------
      // 새 게시글 작성 로직
      // -----------------------------
      const newPostData: CommunityData = {
        ...data,
        images: extractedImages
      };
      try {
        await postingMutation.mutateAsync(newPostData);
      } catch (error) {
        console.error('❌ 글쓰기 실패:', error);
      }
    } else {
      // -----------------------------
      // 기존 게시글 수정 로직
      // -----------------------------
      if (!state?.postId) {
        alert('수정할 게시글 ID가 없습니다.');
        return;
      }

      // 1) 이미지 payload 만들기 (keep/delete/add)
      const imagePayload = buildImagePayloadForUpdate(
        data.content,
        originalImageList.current
      );

      // 2) PATCH 보낼 최종 데이터 구성
      const updateData: CommunityUpdateData = {
        title: data.title,
        content: data.content,
        images: imagePayload,
        tag: data.tag
      };
      console.log(updateData);

      try {
        await updateMutation.mutateAsync({
          postId: state.postId,
          data: updateData
        });
      } catch (error) {
        console.error('❌ 글수정 실패:', error);
      }
    }
  };

  return (
    <WriteCommunityPageContainer onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Title>Community</Title>

        <TagBox register={register} watch={watch} setValue={setValue} />

        <TitleWrapper>
          <label htmlFor="title" />
          <input
            type="text"
            placeholder="Please write title"
            {...register('title', { required: 'Please write your title' })}
          />
        </TitleWrapper>

        <Editor watch={watch} setValue={setValue} trigger={trigger} />

        {editMode ? (
          <SubmitButton type="submit">
            {updateMutation.isPending ? 'Updating...' : 'Edit'}
          </SubmitButton>
        ) : (
          <SubmitButton type="submit">
            {postingMutation.isPending ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        )}
      </Wrapper>
    </WriteCommunityPageContainer>
  );
}

const WriteCommunityPageContainer = styled.form`
  margin-top: 2.5rem;
  width: 100%;
  padding: 0 24.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 0 10rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 100% */
  letter-spacing: -0.18rem;
  margin-bottom: 1.5rem;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 5.4rem;

  > input {
    border: none;
    width: 100%;
    height: 100%;
    padding: 2rem 2.6rem;
    outline: none;
    border-top: 1px solid ${({ theme }) => theme.colors.gray400};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
    background: ${({ theme }) => theme.colors.backgroundLayer2};

    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 150% */
    letter-spacing: -0.032rem;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 4.2rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 13.9rem;
`;
