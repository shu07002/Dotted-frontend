import RestaurantList from '@/components/restaurant/RestaurantList';
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
  function handleTabClick() {
    // Do something
  }

  return (
    <Main>
      <HeaderSection>
        <nav>
          {restaurantTabs.map((tab, idx) => (
            <span onClick={() => handleTabClick()} key={idx}>
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
