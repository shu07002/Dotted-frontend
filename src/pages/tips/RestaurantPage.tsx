import RestaurantList from '@/components/tips/restaurant/RestaurantList';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const restaurantTabs = [
  'All',
  'Korean',
  'Chinese',
  'Japanese',
  'Western',
  'Others'
];

export default function RestaurantPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  function handleTabClick(tab: string) {
    setSearchParam({ q: tab.toLowerCase() });
  }

  useEffect(() => {
    setSearchParam({ q: 'all' });
  }, []);

  return (
    <Main>
      <HeaderSection>
        <nav>
          {restaurantTabs.map((tab, idx) => (
            <span
              className={
                searchParam.get('q') === tab.toLowerCase() ? 'selected' : ''
              }
              onClick={() => handleTabClick(tab)}
              key={idx}
            >
              {tab}
            </span>
          ))}
        </nav>
        <div>
          <p>
            Dotted has no connection with the company listed in the service.
          </p>
        </div>
      </HeaderSection>
      <RestaurantList />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 18rem 2.6rem 18rem;

  @media (max-width: 1100px) {
    padding-right: 8rem;
    padding-left: 8rem;
  }

  @media (max-width: 900px) {
    padding-right: 5rem;
    padding-left: 5rem;
  }

  @media (max-width: 700px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
  display: flex;
  flex-direction: column;
`;

const HeaderSection = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  > nav {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    padding: 1.6rem 0;
    margin-top: 2.6rem;
    flex-wrap: wrap;

    > span {
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: -0.75px;
      color: ${({ theme }) => theme.colors.gray500};
      padding: 0.7rem 3.2rem;
      border-radius: 2.4rem;
      background-color: ${({ theme }) => theme.colors.gray200};
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.colors.gray300};
      }

      &.selected {
        background-color: ${({ theme }) => theme.colors.purple600};
        color: ${({ theme }) => theme.colors.gray50};
      }
    }
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;

    > p {
      text-align: center;
      font-size: 1.4rem;
      font-weight: 300;
      letter-spacing: -0.42px;
      color: ${({ theme }) => theme.colors.gray400};
    }
  }
`;
