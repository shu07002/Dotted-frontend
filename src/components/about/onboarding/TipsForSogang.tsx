import styled from 'styled-components';
import MapIcon from '@/assets/svg/about/onboarding/map.svg?react';
import CultureIcon from '@/assets/svg/about/onboarding/culture.svg?react';
import RestaurantIcon from '@/assets/svg/about/onboarding/restaurant.svg?react';
import HospitalIcon from '@/assets/svg/about/onboarding/hospital.svg?react';
import FAQIcon from '@/assets/svg/about/onboarding/faq.svg?react';
import ClubIcon from '@/assets/svg/about/onboarding/club.svg?react';
export default function TipsForSogang() {
  return (
    <Section>
      <h1>Tips for Sogang</h1>
      <p>Get all the essential campus info you need</p>
      <UpperTipsContainer>
        <SogangMap data-aos="fade-up">
          <TipsBox>
            <MapIcon />
            <div style={{ width: 'calc(100% - 17rem)' }}>
              <h2>Sogang Map</h2>
              <p>
                Locate buildings, study spaces, cafeterias and key campus
                facilities.
              </p>
            </div>
            <span>
              <img
                src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
                alt=""
              />
            </span>
          </TipsBox>
        </SogangMap>
        <Restaurant data-aos="fade-up">
          <TipsBox>
            <RestaurantIcon />
            <div style={{ width: 'calc(100% - 11rem)' }}>
              <h2>Restaurant</h2>
              <p>Discover the best places to eat near Sogang.</p>
            </div>
            <span style={{ width: '70%' }}>
              <img
                src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
                alt=""
              />
            </span>
          </TipsBox>
        </Restaurant>
        <Culture data-aos="fade-up">
          <TipsBox>
            <CultureIcon />
            <div style={{ width: 'calc(100% - 14rem)' }}>
              <h2>Culture</h2>
              <p>
                Learn about Korean and Sogang culutre -drinking games, campus
                traditions, and student slang.
              </p>
            </div>
            <span>
              <img
                src="https://i.pinimg.com/736x/02/25/07/0225070cf8ec553ded8a37e5cba74a23.jpg"
                alt=""
              />
            </span>
          </TipsBox>
        </Culture>
      </UpperTipsContainer>
      <EtcTipsContainer>
        <EtcBox style={{ justifyContent: 'flex-start' }}>
          <span>
            <HospitalIcon />
          </span>
          <div>
            <h2>Health</h2>
            <p>Find nearby hospitals</p>
          </div>
        </EtcBox>
        <EtcBox style={{ justifyContent: 'center' }}>
          <span>
            <FAQIcon />
          </span>
          <div>
            <h2>FAQ</h2>
            <p>Get quick answers to common questions</p>
          </div>
        </EtcBox>
        <EtcBox style={{ justifyContent: 'flex-end' }}>
          <span>
            <ClubIcon />
          </span>
          <div>
            <h2>Clubs</h2>
            <p>Explore student and organizations</p>
          </div>
        </EtcBox>
      </EtcTipsContainer>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 9.6rem 0;
  overflow-x: hidden;

  > p {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: 2rem;
    font-weight: 600;
    line-height: 3.6rem; /* 150% */
    letter-spacing: -0.72px;
  }

  > h1 {
    color: ${({ theme }) => theme.colors.gray700};
    text-align: center;
    font-size: 4.8rem;
    font-weight: 700;
    line-height: 6.3rem; /* 131.25% */
    letter-spacing: -2.4px;
    margin-bottom: 1rem;
  }
`;

const UpperTipsContainer = styled.div`
  margin-top: 8rem;
  width: 100vw;
  height: 100vh;
  padding: 0 6.5rem;
  display: grid;
  grid-template-columns: 12fr 64fr 55fr;
  grid-template-rows: 16fr 26fr 25.7fr 16fr;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const SogangMap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 1rem;
  grid-column: 1 / 3;
  grid-row: 1 / 3;

  svg {
    width: 9rem;
    height: 9rem;
  }
`;

const Restaurant = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 1rem;
  grid-column: 3 / 4;
  grid-row: 2 / 4;

  svg {
    width: 5rem;
    height: 5rem;
  }
`;

const Culture = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 1rem;
  grid-column: 2 / 3;
  grid-row: 3 / 5;
  svg {
    width: 8rem;
    height: 8rem;
  }
`;

const TipsBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  position: relative;

  > svg {
    position: absolute;
    top: 4rem;
    left: 4rem;
  }

  > div {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    padding: 5rem 4rem 0 0;
    width: calc(100% - 14rem);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h2 {
      font-size: 3.2rem;
      font-weight: 600;
      line-height: 3.6rem;
      letter-spacing: -1.2px;
      color: ${({ theme }) => theme.colors.purple600};
    }
    p {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.4rem;
      letter-spacing: -0.5px;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
  > span {
    background-color: antiquewhite;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 50%;
    border-radius: 0.5rem;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const EtcTipsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: 8rem;
  gap: 7rem;
  padding: 0 20rem;
`;

const EtcBox = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;

  > span {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.purple100};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 2rem;
    h2 {
      font-size: 3.2rem;
      font-weight: 600;
      line-height: 3.6rem;
      letter-spacing: -1.2px;
      color: ${({ theme }) => theme.colors.purple600};
    }
    p {
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 2.4rem;
      letter-spacing: -0.5px;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;
