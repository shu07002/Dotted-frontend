import styled from 'styled-components';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HeaderLayout() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // console.log(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <Wrapper>
      <Header scrollY={scrollY} />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: yellow;
  padding-top: 8rem;
`;
