import CultureList from '@/components/tips/culture/CultureList';
import styled from 'styled-components';

export default function CulturePage() {
  return (
    <Main>
      <Header>
        <div>
          <h1>Culture</h1>
          <p>Introduce Korean Culture</p>
        </div>
        <div>
          <select name="" id="">
            <option value="">All</option>
            <option value="">Title</option>
            <option value="">Content</option>
          </select>
          <input type="text" placeholder="Search" />
        </div>
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

const Header = styled.header``;
