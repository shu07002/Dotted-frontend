import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from '@/components/MainPage/Carousel';
import Tips from '@/components/MainPage/Tips';

export default function MainPage() {
  return (
    <Main>
      <Wrapper>
        <Carousel />

        <Tips />

        <MiniBoardWrapper>
          <MiniCommunity>
            <Title>
              <span>Community</span>
              <span>+ more</span>
            </Title>
            <CommunityList>
              <ul>
                <li>
                  <span>Where is good restarant?</span>
                  <span>3min</span>
                </li>
                <li>
                  <span>Where is good restarant?</span>
                  <span>3min</span>
                </li>
                <li>
                  <span>Where is good restarant?</span>
                  <span>3min</span>
                </li>
                <li>
                  <span>Where is good restarant?</span>
                  <span>3min</span>
                </li>
                <li>
                  <span>Where is good restarant?</span>
                  <span>3min</span>
                </li>
              </ul>
            </CommunityList>
          </MiniCommunity>

          <MiniMarket>
            <Title>
              <span>Market</span>
              <span>+ more</span>
            </Title>
            <MarketList>
              <ul>
                <li>
                  <div>image</div>
                  <div>
                    <span>MEGA coffee coupon</span>
                    <span>24/01/2024</span>
                  </div>
                </li>
                <li>
                  <div>image</div>
                  <div>
                    <span>MEGA coffee coupon</span>
                    <span>24/01/2024</span>
                  </div>
                </li>
                <li>
                  <div>image</div>
                  <div>
                    <span>MEGA coffee coupon</span>
                    <span>24/01/2024</span>
                  </div>
                </li>
              </ul>
            </MarketList>
          </MiniMarket>
        </MiniBoardWrapper>
      </Wrapper>
    </Main>
  );
}

const Main = styled.main`
  padding: 4.8rem 7.7rem 0rem 7.7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 13.9rem;
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 6.5rem;
`;

const MiniBoardWrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 3.6rem;

  @media (max-width: 865px) {
    flex-direction: column;
  }
`;

const MiniCommunity = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2.5rem;
  height: 4.7rem;
  align-items: center;
  > span {
    color: ${({ theme }) => theme.colors.gray700};
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px; /* 87.5% */
    letter-spacing: -1.2px;

    &:last-child {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.gray500};
      font-size: 20px;
      font-weight: 300;
      letter-spacing: -1px;
    }
  }
`;

const MiniMarket = styled.div`
  width: 100%;
`;

const CommunityList = styled.div`
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.backgroundLayer1};
  width: 100%;
  > ul {
    width: 100%;

    > li {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 6.4rem;
      padding: 0 2.5rem;

      &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
      }

      > span {
        color: ${({ theme }) => theme.colors.gray700};
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px; /* 105% */
        letter-spacing: -1px;

        &:last-child {
          color: ${({ theme }) => theme.colors.gray400};
          font-size: 16px;
          font-weight: 400;
          letter-spacing: -0.8px;
        }
      }
    }
  }
`;

const MarketList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > ul {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 2.3rem;
    place-items: center;

    > li {
      max-width: 18.7rem;
      width: 100%;
      aspect-ratio: 0.64;
      display: flex;
      flex-direction: column;

      border-radius: 16px;
      border: 1px solid ${({ theme }) => theme.colors.gray700};
      background: ${({ theme }) => theme.colors.backgroundLayer2};

      > div {
        &:first-child {
          width: 100%;
          height: 60%;
          background-color: skyblue;
          border-radius: 16px 16px 0 0;
        }
        &:nth-child(2) {
          padding: 1rem 1rem 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          > span {
            &:first-child {
              color: ${({ theme }) => theme.colors.gray700};
              font-family: Inter;
              font-size: 20px;
              font-style: normal;
              font-weight: 400;
              line-height: 21px; /* 105% */
              letter-spacing: -1px;
            }

            &:nth-child(2) {
              color: ${({ theme }) => theme.colors.gray400};
              font-family: Inter;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 21px; /* 131.25% */
              letter-spacing: -0.8px;
            }
          }
        }
      }
    }
  }
`;
