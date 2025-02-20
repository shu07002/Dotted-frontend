import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import ImgBox from '@/components/MarketPage/ImgBox';
import { useBlocker, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

interface MarketData {
  title: string;
  content: string;
  price: string;
  images: (string | null)[];
}

export default function WriteMarketPage() {
  const { register, handleSubmit } = useForm<MarketData>();
  const [previews, setPreviews] = useState<(string | null)[]>([]);
  //const [imgFiles, setImgFiles] = useState<(File | null)[]>([null]);
  const imgFileRef = useRef<HTMLInputElement>(null);
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

  const postingMutation = useMutation({
    mutationFn: async (data: MarketData) => {
      const accessToken = window.localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posting/market/create`,
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
      navigate(`detail/${data.id}`);
    },
    onError: (error) => {
      console.error('❌ 글쓰기기 실패:', error);
    }
  });

  const onSubmit = async (data: MarketData) => {
    if (postingMutation.isPaused) return;
    data.images = previews;
    console.log(data);

    try {
      await postingMutation.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteImage = (index: number) => {
    //setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const onSaveImage = (file: File) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // 이미지 파일 배열 업데이트
        // setImgFiles((prevFiles) => {
        //   const updatedFiles = [...prevFiles];
        //   // + 버튼을 누른 순간 null로 자리가 이미 존재
        //   // 따라서 사진을 추가할 자리의 index를 가져가자!
        //   updatedFiles[index] = file;
        //   return updatedFiles;
        // });

        // 미리보기 배열 업데이트
        setPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[updatedPreviews.length] = reader.result as string;
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
      <Wrapper>
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
              {...register('content', { required: 'Please enter a content' })}
            />
          </label>

          <SubmitButton type="submit">
            {postingMutation.isPending ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </Form>
      </Wrapper>
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
