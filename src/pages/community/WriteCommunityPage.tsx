import { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-quill-new/dist/quill.snow.css';
import TagBox from '@/components/WriteCommunityPage/TagBox';
import Editor from '@/components/WriteCommunityPage/Editor';
import { data, useBlocker, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

export interface CommunityData {
  title: string;
  content: string;
  images: string[];
  tag: string | number;
}

export default function WriteCommunityPage() {
  const { register, handleSubmit, watch, setValue, trigger } =
    useForm<CommunityData>();
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const confirmLeave = window.confirm(
        'Your unsaved changes may be lost. Do you want to leave?'
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

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
      console.log(data);
      const accessToken = window.localStorage.getItem('accessToken');
      console.log(accessToken);
      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/create`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
        }
      );

      if (!response.ok) throw new Error('Failed to sign up');
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 글쓰기 성공:', data);
      navigate(`detail/${data.id}`);
    },
    onError: (error) => {
      console.error('❌ 글쓰기기 실패:', error);
    }
  });

  const onSubmit = async (data: CommunityData) => {
    if (postingMutation.isPending) return;
    console.log(data.content);

    const extractedImages = extractDataURLs(data.content);
    console.log('🖼 Extracted Images:', extractedImages);

    let updatedContent = data.content;
    extractedImages.forEach((imgSrc, index) => {
      // 특수문자를 이스케이프 처리한 이미지 URL을 사용
      const escapedImgSrc = imgSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      updatedContent = updatedContent
        .replace(`src="${imgSrc}"`, `src={image${index + 1}}`)
        .replace(`src='${imgSrc}'`, `src={image${index + 1}}`);
    });

    console.log('📝 Updated Content:', updatedContent);

    const updatedData = {
      ...data,
      content: updatedContent,
      images: extractedImages,
      tag: 1
    };

    console.log('📤 최종 전송 데이터:', updatedData);

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
