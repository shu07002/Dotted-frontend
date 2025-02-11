import { marketPost } from '@/components/MarketPage/marketPost';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import { NextArrow, PrevArrow } from '@/components/MainPage/CustomArrow';
import More from '@/assets/svg/CommunityPage/More.svg?react';
import Profile from '@/assets/svg/CommunityPage/Profile.svg?react';
import Scrap from '@/assets/svg/CommunityPage/Scrap.svg?react';
import { useState } from 'react';
import CommentSection from '@/components/CommunityPage/CommentSection';

export default function DetailMarketPage() {
  const { id } = useParams();
  const [post] = marketPost.filter((el) => el.id === Number(id));
  const [isScraped, setIsScraped] = useState(false);

  const onClickScrap = () => {
    setIsScraped(!isScraped);
  };

  console.log(post);

  const setting = {
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,

    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <DetailMarketPageContainer>
      <Wrapper>
        <ItemWrapper>
          <div>
            <ImgCarouselWrapper>
              <StyledSlider {...setting}>
                <SlideContent>
                  <h3>
                    {
                      'asdsadsdas\nasdsadsdas\nasdsadsdas\nasdsadsdas\nasdsadsdas\nasdsadsdas\nasdsadsdas\nasdsadsdas\n'
                    }{' '}
                  </h3>
                </SlideContent>
                <SlideContent>
                  <h3>2</h3>
                </SlideContent>
                <SlideContent>
                  <h3>3</h3>
                </SlideContent>
              </StyledSlider>
            </ImgCarouselWrapper>
          </div>

          <div>
            <Text>
              <Tag
                className={`${post.tag === 'On Sale' ? 'onSale' : 'soldOut'}`}
              >
                {post.tag}
              </Tag>
              <Title>
                {post.title}
                <span>
                  <More />
                </span>
              </Title>
              <Price>{post.price}</Price>
              <Writer>
                <Profile />
                <div>
                  <span>
                    by <span>{post.writer}</span>
                  </span>
                  <span>•</span>
                  <span>{post.createdAt}</span>
                </div>
              </Writer>
            </Text>

            <ScrapButtonWrapper>
              <ScrapButton
                onClick={onClickScrap}
                className={`${isScraped && 'scraped'}`}
              >
                <Scrap /> <span>{post.scrap_count} scraps</span>
              </ScrapButton>
            </ScrapButtonWrapper>
          </div>
        </ItemWrapper>

        <ContentWrapper>Very nice shoes</ContentWrapper>

        <CommentSection post={post} />
      </Wrapper>
    </DetailMarketPageContainer>
  );
}

const DetailMarketPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 5.7rem;
  padding: 0 23rem;
`;

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
    flex: 1; /* 각 자식 div가 동일한 비율로 너비를 차지하게 설정 */
    min-width: 28rem; /* 최소 너비 설정 */
  }
`;

const ImgCarouselWrapper = styled.div`
  background-color: pink;
  width: 100%;
  max-width: 40rem;
  aspect-ratio: 1/1;
  border-radius: 5px;
  position: relative;
`;
const StyledSlider = styled(Slider)`
  position: relative; /* Ensure this is relative */
  height: 100%;
  .slick-slider {
    height: 100%;
    border-radius: 5px;
  }

  .slick-list {
    height: 100%;
    border-radius: 5px;
  }

  .slick-track {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .slick-slide {
    justify-content: center;
    align-items: center;
    height: 100%;
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
    bottom: 0; /* Adjust this value to position the arrow correctly */
    right: 9rem;
    left: auto !important;
    z-index: 100;
  }

  .slick-next {
    top: auto !important;
    border-radius: 100%;
    position: absolute;
    bottom: 0; /* Adjust this value to position the arrow correctly */
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
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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

const ContentWrapper = styled.div`
  padding: 2rem 0;
  width: 100%;
  min-height: 12rem;

  color: ${({ theme }) => theme.colors.gray800};
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.06rem;
`;
