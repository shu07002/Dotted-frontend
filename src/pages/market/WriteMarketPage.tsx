import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ImgBox from '@/components/MarketPage/ImgBox';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { fetchWithAuth } from '@/utils/auth'; // auth.ts에서 정의한 fetchWithAuth를 import

interface MarketData {
  title: string;
  content: string;
  price: number;
  images: (string | null)[];
}

export interface ImagePayload {
  image_id?: number;
  action: 'keep' | 'delete' | 'add';
  order: number;
  image_data?: string; // add 시 필수
}

export interface MarketUpdateData {
  title: string;
  content: string;
  price: number;
  images: ImagePayload[];
}

interface OriginalImage {
  id: number;
  image_url: string; // 예: s3 url
}

export default function WriteMarketPage() {
  const { register, handleSubmit, setValue } = useForm<MarketData>();
  const [previews, setPreviews] = useState<(string | null)[]>([]);
  const imgFileRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isSubmitted) return false;
    return currentLocation.pathname !== nextLocation.pathname;
  });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const originalImageList = useRef<OriginalImage[]>([]);

  useEffect(() => {
    if (state && state.postId) {
      console.log(state);
      setEditMode(true);
      // state에 있는 데이터로 form 필드 채우기
      setValue('title', state.title || '');
      setValue('price', state.price || '');
      setValue('content', state.content || '');
      // 기존 이미지 목록을 previews 상태에 넣어주기
      if (state.images) {
        originalImageList.current = state.images; // 원본 이미지 저장
        setPreviews(state.images.map((img: OriginalImage) => img.image_url));
      }
    }
  }, [state, setValue]);

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
    mutationFn: async (data: MarketData) => {
      // fetchWithAuth 내부에서 토큰 유효성 검사/갱신이 처리됨
      const response = await fetchWithAuth<any>(
        `${import.meta.env.VITE_API_DOMAIN}/posting/market/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      return response;
    },
    onSuccess: (data) => {
      console.log('🎉 글쓰기 성공:', data);
      setIsSubmitted(true);
      blocker.reset?.();
      setTimeout(() => {
        navigate('/market');
      }, 100);
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
      data: MarketUpdateData;
    }) => {
      // fetchWithAuth 내부에서 토큰 관리 수행
      const response = await fetchWithAuth<any>(
        `${import.meta.env.VITE_API_DOMAIN}/posting/market/${postId}/update`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      return response;
    },
    onSuccess: (data) => {
      console.log('🎉 글수정 성공:', data);
      setIsSubmitted(true);
      blocker.reset?.();
      setTimeout(() => {
        navigate('/market');
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
          image_id: original.id,
          action: 'keep',
          order: order++
        });
      } else {
        // 최종 내용에 없으면 delete
        imagePayload.push({
          image_id: original.id,
          action: 'delete',
          order: -1
        });
      }
    }

    // 2-2) 새로 추가된 base64 이미지(add)
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
  const onSubmit = async (data: MarketData) => {
    // 중복 클릭 방지
    if (postingMutation.isPending || updateMutation.isPending) return;

    if (editMode && state?.postId) {
      // -----------------------------
      // 기존 게시글 수정 로직 (editMode)
      // -----------------------------
      const imagesPayload: ImagePayload[] = [];

      // 새 순서대로 기존 이미지와 새 이미지 처리
      previews.forEach((preview, newOrder) => {
        // Case 1: 기존 이미지가 있다면 keep
        const originalImage = originalImageList.current.find(
          (img) => img.image_url === preview
        );
        if (originalImage) {
          imagesPayload.push({
            image_id: originalImage.id,
            action: 'keep',
            order: newOrder + 1 // API는 1-based index
          });
        }
        // Case 2: 새로 추가된 이미지 (base64)
        else if (preview) {
          imagesPayload.push({
            action: 'add',
            order: newOrder + 1,
            image_data: preview
          });
        }
      });

      // Case 3: 삭제된 이미지 처리
      originalImageList.current.forEach((original) => {
        if (!previews.includes(original.image_url)) {
          imagesPayload.push({
            image_id: original.id,
            action: 'delete',
            order: -1
          });
        }
      });

      const updateData: MarketUpdateData = {
        title: data.title,
        content: data.content,
        price: data.price,
        images: imagesPayload
      };

      console.log('Update request data:', updateData);

      try {
        await updateMutation.mutateAsync({
          postId: state.postId,
          data: updateData
        });
      } catch (error) {
        console.error('❌ 글수정 실패:', error);
        alert('Failed to update the post. Please try again.');
      }
    } else {
      // -----------------------------
      // 새 게시글 작성 로직
      // -----------------------------
      const validImages = previews.filter(
        (preview): preview is string => preview !== null
      );
      const requestData: MarketData = {
        title: data.title,
        content: data.content,
        price: data.price,
        images: validImages
      };

      console.log('Create request data:', requestData);

      try {
        await postingMutation.mutateAsync(requestData);
      } catch (error) {
        console.error('❌ 글작성 실패:', error);
        alert('Failed to create the post. Please try again.');
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const onSaveImage = (file: File) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews, reader.result as string];
          console.log(updatedPreviews.length);
          return updatedPreviews;
        });
      };
    }
  };

  useEffect(() => {
    console.log(previews);
  }, [previews]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSaveImage(file);
    }
  };

  return (
    <WriteMarketPageContainer>
      <WriteMarketPageWrapper>
        <Title>Market</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title">
            <span>Title</span>
            <input
              placeholder="Please write title"
              type="text"
              id="title"
              {...register('title', { required: 'Please enter a title' })}
            />
          </label>
          <label htmlFor="price">
            <span>Price</span>
            <input
              className="price"
              placeholder="₩"
              type="text"
              id="price"
              {...register('price', { required: 'Please enter a price' })}
            />
          </label>
          <label htmlFor="image">
            <span>Image</span>
            <ImgBox
              previews={previews}
              imgFileRef={imgFileRef}
              handleDeleteImage={handleDeleteImage}
              handleFileChange={handleFileChange}
              setPreviews={setPreviews}
            />
          </label>
          <label htmlFor="content">
            <span>Content</span>
            <textarea
              placeholder="Please write content"
              id="content"
              {...register('content', { required: 'Please enter content' })}
            />
          </label>
          {editMode ? (
            <SubmitButton type="submit">
              {updateMutation.isPending ? 'Updating...' : 'Edit'}
            </SubmitButton>
          ) : (
            <SubmitButton type="submit">
              {postingMutation.isPending ? 'Submitting...' : 'Submit'}
            </SubmitButton>
          )}
        </Form>
      </WriteMarketPageWrapper>
    </WriteMarketPageContainer>
  );
}

const WriteMarketPageContainer = styled.div`
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

const WriteMarketPageWrapper = styled.div`
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  gap: 2.5rem;
  margin-bottom: 13.7rem;
  > label {
    width: 100%;
    display: flex;

    gap: 2rem;
    > span {
      flex: 0 0 auto;
      display: flex;
      width: 10rem;
      margin-top: 0.5rem;

      color: ${({ theme }) => theme.colors.gray700};
      font-family: Pretendard;
      font-size: 2rem;
      font-style: normal;
      font-weight: 500;
      line-height: 2.4rem; /* 120% */
      letter-spacing: -0.04rem;
    }

    > input {
      width: 100%;
      padding: 0;
      padding-left: 1.2rem;
      height: 3.7rem;
      border-radius: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors.gray400};
      background: ${({ theme }) => theme.colors.backgroundLayer2};

      &.price {
        width: 23.5rem;
      }
    }

    > textarea {
      width: 100%;
      resize: none;
      height: 22.5rem;
      border-radius: 0.5rem;
      border: 1px solid ${({ theme }) => theme.colors.gray400};
      background: ${({ theme }) => theme.colors.backgroundLayer2};
      margin-bottom: 1.2rem;

      padding: 1.2rem;
      font-family: Pretendard;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 2.4rem; /* 150% */
      letter-spacing: -0.032rem;
    }
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  display: grid;
  place-items: center;
  height: 4.2rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.purple600};

  border: none;
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
