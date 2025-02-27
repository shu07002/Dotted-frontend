import styled from 'styled-components';
import Header from './Header';
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8rem;
  position: relative;
  padding-right: 2rem;
`;
