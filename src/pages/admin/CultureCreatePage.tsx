import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import CultureEditor from '@/components/admin/CultureEditor';

export interface CultureData {
  title: string;
  content: string;
  thumbnail?: string;
  college: number;
}

export default function CultureCreatePage() {
  const { reset, register, handleSubmit, setValue, watch, trigger } =
    useForm<CultureData>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const postingMutation = useMutation({
    mutationFn: async (data: CultureData) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('college', data.college.toString()); // 숫자는 문자열로 변환
      if (data.thumbnail) {
        formData.append('thumbnail', data.thumbnail);
      }
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/campus/culture`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    },
    onSuccess: () => {
      setIsSubmitted(true);
      alert('글이 성공적으로 작성되었습니다.');
      reset();
    },
    onError: (error) => {
      console.error('❌ 글쓰기 실패:', error);
    }
  });

  const onSubmit = async (data: CultureData) => {
    if (postingMutation.isPending) return;

    const newPostData: CultureData = {
      ...data,
      college: 1
    };

    console.log('보낼 데이터:', newPostData);

    try {
      await postingMutation.mutateAsync(newPostData);
    } catch (error) {
      console.error('❌ 글쓰기 실패:', error);
    }
  };

  return (
    <WriteCommunityPageContainer onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Title>Culture 글 쓰기</Title>

        <TitleWrapper>
          <input
            type="text"
            placeholder="제목"
            {...register('title', { required: 'Please write your title' })}
          />
        </TitleWrapper>

        <CultureEditor watch={watch} setValue={setValue} trigger={trigger} />

        <TitleWrapper>
          <input
            type="text"
            placeholder="썸네일 URL (선택사항)"
            {...register('thumbnail')}
          />
        </TitleWrapper>

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

  @media (max-width: 1200px) {
    padding: 0 10rem;
  }

  @media (max-width: 700px) {
    padding: 0 2rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 3.6rem;
  font-weight: 700;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 5.4rem;

  > input {
    width: 100%;
    height: 100%;
    padding: 2rem 2.6rem;
    border: 1px solid ${({ theme }) => theme.colors.gray400};
    background: ${({ theme }) => theme.colors.backgroundLayer2};
    font-size: 1.6rem;
  }
`;

const SubmitButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 4.2rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 13.9rem;
`;
