import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Plus from '@/assets/svg/MarketPage/Plus.svg?react';

interface data {
  title: string;
  price: string;
  image: string[];
  content: string;
}

export default function WriteMarketPage() {
  const { register, handleSubmit } = useForm<data>();
  const [previews, setPreviews] = useState<(string | null)[]>([null]);
  const [imgFiles, setImgFiles] = useState<(File | null)[]>([null]);
  const imgFileRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<data> = (data) => {
    alert(JSON.stringify(data));
  };

  const addNewImageSlot = () => {
    setImgFiles((prevFiles) => [...prevFiles, null]);
    setPreviews((prevPreviews) => [...prevPreviews, '']);
  };

  const handleDeleteImage = (index: number) => {
    setImgFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const onSaveImage = (index: number, file: File) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // 이미지 파일 배열 업데이트
        setImgFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          // + 버튼을 누른 순간 null로 자리가 이미 존재
          // 따라서 사진을 추가할 자리의 index를 가져가자!
          updatedFiles[index] = file;
          return updatedFiles;
        });

        // 미리보기 배열 업데이트
        setPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = reader.result as string;
          return updatedPreviews;
        });

        addNewImageSlot();
      };
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      onSaveImage(index, file);
      console.log(index, file);
      event.target.value = '';
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
            <ImgBoxWrapper>
              <ImgBox>
                {previews.map((preview, index) => (
                  <div key={index}>
                    {preview ? (
                      <figure onClick={() => handleDeleteImage(index)}>
                        <img src={preview} alt={`preview-${index}`} />
                      </figure>
                    ) : previews.length < 6 ? (
                      <label htmlFor={`file-${index}`}>
                        <EachImage>
                          <span>
                            <Plus />
                          </span>
                          <span>{previews.length - 1}/5</span>
                        </EachImage>
                      </label>
                    ) : null}
                    <input
                      type="file"
                      accept="image/*"
                      id={`file-${index}`}
                      ref={imgFileRef}
                      onChange={(e) => handleFileChange(e, index)}
                      style={{ display: 'none' }}
                    />
                  </div>
                ))}
              </ImgBox>
            </ImgBoxWrapper>
          </label>

          <label htmlFor="content">
            <span>Content</span>
            <textarea
              placeholder="Please write content"
              id="content"
              {...register('content', { required: 'Please enter a content' })}
            />
          </label>

          <SubmitButton type="submit">submit</SubmitButton>
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

const ImgBoxWrapper = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const ImgBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 시 */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(178, 31, 124, 0.7);
  }

  > div {
    position: relative;
    > figure {
      img {
        object-fit: cover;
        width: 15rem;
        height: 15rem;
      }

      &:hover img {
        filter: brightness(0.7); /* 이미지만 흐려짐 */
      }

      &::after {
        content: 'X'; /* 표시할 텍스트 */
        color: white;
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.6); /* 반투명 배경 */
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0; /* 기본 숨김 */
        transition: opacity 0.3s ease; /* 부드러운 전환 효과 */
        z-index: 1; /* X 버튼이 이미지 위에 오도록 설정 */
      }

      /* 호버 시 X 표시 나타나기 */
      &:hover::after {
        opacity: 1;
      }

      /* X 버튼에 흐림 효과가 적용되지 않도록 */
      &:hover::after {
        filter: none; /* X 버튼은 흐려지지 않음 */
      }
    }
  }
`;

const EachImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.gray400};
  background: ${({ theme }) => theme.colors.backgroundLayer1};

  &:hover {
    background: rgba(217, 217, 217, 0.7);
  }
  width: 15rem;
  height: 15rem;
  margin-bottom: 0.5rem;

  > span {
    &:first-child {
      font-size: 7rem;
    }
    color: ${({ theme }) => theme.colors.gray400};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.4rem; /* 150% */
    letter-spacing: -0.032rem;
  }
`;
