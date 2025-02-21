import { MarketPostDetail } from '@/pages/market/DetailMarketPage';
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { NextArrow, PrevArrow } from '@/components/MainPage/CustomArrow';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Scrap from '@/assets/svg/CommunityPage/Scrap.svg?react';

const setting = {
  infinite: true,
  speed: 750,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,

  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />
};

interface MarketPostingProps {
  post: MarketPostDetail;
  isScraped: boolean;
  onClickScrap: () => void;
}

export default function MarketPosting({
  post,
  isScraped,
  onClickScrap
}: MarketPostingProps) {
  const [localScrapCount, setLocalScrapCount] = useState(post.scrap_count);
  const [localScrapped, setLocalScrapped] = useState(post.is_scrapped);

  const handleScrapClick = () => {
    if (localScrapped) {
      setLocalScrapCount((prev) => prev - 1);
    } else {
      setLocalScrapCount((prev) => prev + 1);
    }
    setLocalScrapped((prev) => !prev);
    onClickScrap();
  };
  return (
    <ItemWrapper>
      <div>
        <ImgCarouselWrapper>
          <StyledSlider {...setting}>
            {post.images.map((image, idx) => (
              <SlideContent key={idx}>
                <ImageWrapper>
                  <img src={image.image_url} />
                </ImageWrapper>
              </SlideContent>
            ))}
          </StyledSlider>
        </ImgCarouselWrapper>
      </div>

      <div>
        <Text>
          <Tag
            className={`${post.status === 'FOR_SALE' ? 'onSale' : 'soldOut'}`}
          >
            {post.status === 'FOR_SALE'
              ? 'For Sale'
              : post.status === 'SOLD_OUT'
                ? 'Sold Out'
                : 'Reserved'}
          </Tag>
          <Title>
            {post.title}
            <span>
              <More />
            </span>
          </Title>
          <Price>₩ {post.price}</Price>
          <Writer>
            <Profile />
            <div>
              <span>
                by <span>{post.writer_nickname}</span>
              </span>
              <span>•</span>
              <span>{post.created_at}</span>
            </div>
          </Writer>
        </Text>

        <ScrapButtonWrapper>
          <ScrapButton
            onClick={handleScrapClick}
            className={`${isScraped && 'scraped'}`}
          >
            <Scrap /> <span>{localScrapCount} scraps</span>
          </ScrapButton>
        </ScrapButtonWrapper>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: start;
  width: 100%;

  padding-bottom: 2.1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  > div {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    min-width: 28rem; /* 최소 너비 설정 */

    &:nth-child(2) {
      width: 100%;
    }
  }
`;

const ImgCarouselWrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  max-width: 40rem;
  aspect-ratio: 1/1;
  border-radius: 5px;
  position: relative;
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 100%; /* ✅ 높이를 명확히 설정 */

  .slick-slider {
    width: 100%;
    height: 100%;
  }

  .slick-list {
    width: 100%;
    height: 100%;
    overflow: hidden; /* ✅ 슬라이드가 한 개씩 나오도록 제한 */
  }

  .slick-track {
    width: 100% !important;
    display: flex;
    height: 100%;
  }

  .slick-slide {
    aspect-ratio: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-arrow {
    width: 4rem;
    height: 4rem;
    position: absolute;
  }

  .slick-prev {
    border-radius: 100%;
    position: absolute;
    top: auto !important;
    bottom: 0;
    right: 9rem;
    left: auto !important;
    z-index: 100;
  }

  .slick-next {
    top: auto !important;
    border-radius: 100%;
    position: absolute;
    bottom: 0;
    right: 3rem;
    z-index: 100;
  }

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  .slick-prev:focus,
  .slick-next:focus {
    color: white;
  }
`;

const SlideContent = styled.div`
  width: 100%; /* ✅ 부모 요소에 맞게 설정 */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  width: 100%;
`;
const Tag = styled.div`
  display: inline-flex;
  padding: 0.3rem 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.07rem;
  border-radius: 1.6rem;
  align-items: center;
  justify-content: center;
  height: 2.2rem;

  &.onSale {
    background: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme }) => theme.colors.gray50};
  }

  &.soldOut {
    background: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray500};
    font-weight: 600;
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.gray800};
  font-family: Pretendard;
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 128.571% */
  letter-spacing: -0.112rem;

  > span {
    text-align: center;
    width: 2rem;
    cursor: pointer;
  }
`;
const Price = styled.div`
  color: ${({ theme }) => theme.colors.gray800};
  font-family: Pretendard;
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem; /* 112.5% */
  letter-spacing: -0.128rem;
  margin-bottom: 1.7rem;
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  color: ${({ theme }) => theme.colors.gray500};
  font-family: Inter;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.07rem;

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    > span {
      display: flex;
      align-items: center;
      gap: 1rem;
      > span {
        font-weight: 600;
      }
    }
  }
  padding-bottom: 1.7rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const ScrapButtonWrapper = styled.div``;

const ScrapButton = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  border-radius: 2.4rem;
  background: ${({ theme }) => theme.colors.backgroundLayer1};
  border: none;

  display: inline-flex;
  align-items: center;
  gap: 1rem;

  > span {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-family: Inter;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.08rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.purple100};
  }

  &.scraped {
    background: ${({ theme }) => theme.colors.purple100};
    > svg > g > path {
      fill: ${({ theme }) => theme.colors.purple600};
      stroke: ${({ theme }) => theme.colors.purple600};
    }

    > span {
      color: ${({ theme }) => theme.colors.purple600};
      font-weight: 500;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 5px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 비율을 유지하면서 꽉 채움 */

    transition: transform 0.2s ease-in-out;
    transform-origin: center; /* 중심을 기준으로 확대 */ /* 부모와 동일한 border-radius 적용 */
    &:hover {
      transform: scale(1.1);
    }
  }
`;
