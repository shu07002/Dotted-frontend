import styled from 'styled-components';

import SogangMap from '@/assets/svg/MainPage/SogangMap.svg?react';
import Restaurant from '@/assets/svg/MainPage/Restaurant.svg?react';
import Hospital from '@/assets/svg/MainPage/Hospital.svg?react';
import FAQ from '@/assets/svg/MainPage/FAQ.svg?react';
import Clubs from '@/assets/svg/MainPage/Clubs.svg?react';
import Culture from '@/assets/svg/MainPage/Culture.svg?react';

export default function Tips() {
  return (
    <TipsWrapper>
      <Title>Tips for Sogang</Title>
      <Contents>
        <Item>
          <SogangMap />
          <span>Sogang Map</span>
        </Item>
        <Item>
          <Restaurant />
          <span>Restaurant</span>
        </Item>
        <Item>
          <Hospital />
          <span>Hospital</span>
        </Item>
        <Item>
          <FAQ />
          <span>FAQ</span>
        </Item>
        <Item>
          <Clubs />
          <span>Clubs Map</span>
        </Item>
        <Item>
          <Culture />
          <span>Culture</span>
        </Item>
      </Contents>
    </TipsWrapper>
  );
}

const TipsWrapper = styled.section`
  margin-bottom: 9.2rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -1.2px;
  margin-bottom: 4.2rem;
`;

const Contents = styled.nav`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(10rem, 1fr)
  ); /*  유동적인 열 설정 */
  justify-content: center;
  gap: 3.8rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /*  화면이 줄어들면 3개씩 */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /*  더 줄어들면 2개씩 */
  }
`;

const Item = styled.div`
  cursor: pointer;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: 21px; /* 131.25% */
    letter-spacing: -0.8px;
  }
`;
