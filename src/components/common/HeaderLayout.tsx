import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function HeaderLayout() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
