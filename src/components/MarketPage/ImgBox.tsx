import React from 'react';
import styled from 'styled-components';
import DraggableImage from './DraggableImage';
import Plus from '@/assets/svg/MarketPage/Plus.svg?react';

interface ImgBoxProps {
  previews: (string | null)[];
  imgFileRef: React.RefObject<HTMLInputElement>;
  handleDeleteImage: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPreviews: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

export default function ImgBox({
  previews,
  imgFileRef,
  handleDeleteImage,
  handleFileChange,
  setPreviews
}: ImgBoxProps) {
  return (
    <ImgBoxContainer>
      <ImgBoxWrapper>
        {previews.map((preview, index) => (
          <DraggableImage
            key={`${preview}-${index}`}
            index={index}
            previews={previews}
            preview={preview}
            imgFileRef={imgFileRef}
            handleDeleteImage={handleDeleteImage}
            handleFileChange={handleFileChange}
            setPreviews={setPreviews}
          />
        ))}
        {previews.length < 5 && (
          <label htmlFor={`file${previews.length}`}>
            <EachImage>
              <span>
                <Plus />
              </span>
              <span>{previews.length}/5</span>
            </EachImage>
            <input
              type="file"
              id={`file${previews.length}`}
              accept="image/*"
              ref={imgFileRef}
              onChange={(e) => handleFileChange(e)}
              style={{ display: 'none' }}
            />
          </label>
        )}
      </ImgBoxWrapper>
      {previews.length > 0 && <Notice>Click an image to delete it.</Notice>}
    </ImgBoxContainer>
  );
}

const Notice = styled.div`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.gray400};

  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.4rem; /* 150% */
  letter-spacing: -0.032rem;
`;

const ImgBoxContainer = styled.div`
  overflow-y: hidden;
`;

const ImgBoxWrapper = styled.div`
  list-style-type: none;
  overflow-y: hidden !important;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  overflow: auto;
  padding-bottom: 2rem;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray400};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.purple600};
    border-radius: 10px;
  }

  /* 스크롤바 핸들 호버 시 */

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.purple600};
  }

  > li {
    position: relative;
    > figure {
      img {
        object-fit: cover;
        width: 15rem;
        height: 15rem;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover img {
          filter: brightness(0.7); /* 이미지만 흐려짐 */
        }
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
      @media (hover: hover) and (pointer: fine) {
        &:hover::after {
          opacity: 1;
        }
      }

      /* X 버튼에 흐림 효과가 적용되지 않도록 */
      @media (hover: hover) and (pointer: fine) {
        &:hover::after {
          filter: none; /* X 버튼은 흐려지지 않음 */
        }
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

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: rgba(217, 217, 217, 0.7);
    }
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
