import React from 'react';
import styled from 'styled-components';
import BackButtonSVG from '@/assets/svg/LoginPage/BackButtonSVG.svg?react';

export default function BackButton() {
  return (
    <BackButtonWrapper>
      <BackButtonComponent onClick={() => console.log('ASdasd')} />
    </BackButtonWrapper>
  );
}

const BackButtonWrapper = styled.div`
  padding: 7rem 0 0 10rem;
  position: relative;
`;
const BackButtonComponent = styled(BackButtonSVG)`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
