import CultureList from '@/components/tips/culture/CultureList';
import styled from 'styled-components';
import SearchIcon from '@/assets/svg/tips/culture/search.svg?react';

export default function CulturePage() {
  return (
    <Main>
      <Header>
        <HeaderTitleBox>
          <h1>Culture</h1>
          <p>Introduce Korean Culture</p>
        </HeaderTitleBox>
        <HeaderInputBox>
          <select name="searchType" id="searchType">
            <option value="all">All</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
          </select>
          <input type="text" placeholder="Search" />
          <SearchIcon />
        </HeaderInputBox>
      </Header>
      <CultureList />
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  padding: 5rem 12.6rem 2.6rem 12.6rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    padding: 5rem 2.6rem 2.6rem 2.6rem;
  }
`;

const Header = styled.header`
  padding: 3.7rem 0 4.7rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderTitleBox = styled.div`
  h1 {
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 3.6rem;
    letter-spacing: -1.8px;
    color: ${({ theme }) => theme.colors.gray800};
  }

  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 3.6rem;
    letter-spacing: -0.48px;
    color: ${({ theme }) => theme.colors.gray500};
  }
`;
const HeaderInputBox = styled.div`
  width: 30vw;
  height: 4rem;
  display: flex;
  background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  border-radius: 5px;
  position: relative;
  padding: 0.9rem 0;
  @media (max-width: 700px) {
    width: 50vw;
  }
  @media (max-width: 500px) {
    width: 80vw;
  }
  select {
    width: 7.5rem;
    height: 100%;
    padding: 0 1.2rem;
    border: none;
    border-right: 1px solid ${({ theme }) => theme.colors.gray600};
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 4rem;
    letter-spacing: -0.48px;

    &:focus {
      outline: none;
    }
  }

  input {
    width: 100%;
    height: 100%;
    padding: 0 1.2rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 4rem;

    &:focus {
      outline: none;
    }
  }

  svg {
    position: absolute;
    right: 1.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;
