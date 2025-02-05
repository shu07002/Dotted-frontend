import React from 'react';
import LogoSVG from '@/assets/svg/common/Logo.svg?react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <LogoWrapper>
      <LogoSVG />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
