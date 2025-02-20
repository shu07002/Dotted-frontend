import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBlocker, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import TagBox from '@/components/WriteCommunityPage/TagBox';
import Editor from '@/components/WriteCommunityPage/Editor';

export interface CommunityData {
  title: string;
  content: string;
  images: string[];
  tag: string;
}

export default function WriteCommunityPage() {
  const { register, handleSubmit, watch, setValue, trigger } =
    useForm<CommunityData>();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false); // ✅ 제출 여부 상태 추가
  const location = useLocation();
  // if (location.pathname.includes('edit')) {
  // }

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (isSubmitted) return false; // 제출된 경우 차단하지 않음
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    if (blocker.state === 'blocked' && !isSubmitted) {
      // ✅ 제출된 경우 confirm 생략
      const confirmLeave = window.confirm(
        'Your unsaved changes may be lost. Do you want to leave?'
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, isSubmitted]); // ✅ isSubmitted 상태 추가

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSubmitted) {
        // ✅ 제출된 경우 unload 이벤트 생략
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSubmitted]); // ✅ isSubmitted 상태 추가

  const extractDataURLs = (htmlContent: string) => {
    const srcArray: string[] = [];
    const imgTagRegex = /<img[^>]*src=["'](data:[^"']+)["'][^>]*>/g;
    let match;

    while ((match = imgTagRegex.exec(htmlContent)) !== null) {
      srcArray.push(match[1]);
    }

    return srcArray;
  };

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
      setTimeout(() => {
        navigate('/community');
      }, 0);
    },

    onError: (error) => {
      console.error('❌ 글쓰기기 실패:', error);
    }
  });

  const onSubmit = async (data: CommunityData) => {
    if (postingMutation.isPending) return;

    const extractedImages = extractDataURLs(data.content);

    let updatedContent = data.content;
    extractedImages.forEach((imgSrc, index) => {
      updatedContent = updatedContent
        .replace(`src="${imgSrc}"`, `src={images[${index}].image_url}`)
        .replace(`src='${imgSrc}'`, `src={images[${index}].image_url}`);
    });

    const updatedData = {
      ...data,
      content: updatedContent,
      images: extractedImages
    };

    try {
      await postingMutation.mutateAsync(updatedData);
    } catch (error) {
      console.error('❌ Mutation failed:', error);
    }
  };

  return (
    <WriteCommunityPageContainer onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Title>Community</Title>

        <TagBox register={register} watch={watch} setValue={setValue} />

        <TitleWrapper>
          <label htmlFor="title"></label>
          <input
            type="text"
            placeholder="Please write title"
            {...register('title', { required: 'Plaese write down your email' })}
          />
        </TitleWrapper>

        <Editor watch={watch} setValue={setValue} trigger={trigger} />

        <SubmitButton type="submit">
          {postingMutation.isPending ? 'Submitting...' : 'Submit'}
        </SubmitButton>
      </Wrapper>
    </WriteCommunityPageContainer>
  );
}

// ... (스타일 컴포넌트들은 그대로 유지)
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
  width: 100%;
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
