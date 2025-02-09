import CultureList from '@/components/tips/culture/CultureList';
import styled from 'styled-components';
import SearchIcon from '@/assets/svg/tips/culture/search.svg?react';
import { HeaderInputBox } from '@/components/common/SearchBox';

export default function CulturePage() {
  return (
    <Main>
      <Header>
        <HeaderTitleBox>
          <h1>Culture</h1>
          <p>Introduce Korean Culture</p>
        </HeaderTitleBox>
        <HeaderInputBox $width="43rem">
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
`;

const Header = styled.header`
  padding: 3.7rem 0 4.7rem 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
