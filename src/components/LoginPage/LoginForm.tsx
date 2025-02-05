import React from 'react';
import Logo from '../common/Logo';
import AgreeBox from './AgreeBox';
import SignUpWithSogangEmail from './SignUpWithSogangEmail';
import Divider from './Divider';
import SignUpWithOtherEmail from './SignUpWithOtherEmail';
import styled from 'styled-components';

export default function LoginForm() {
  return (
    <LoginFormWrapper>
      <Logo />
      <WelcomeText>Welcome to Dotted</WelcomeText>
      <AgreeBox />
      <SignUpWithSogangEmail />

      <Divider />

      <SignUpWithOtherEmail />
    </LoginFormWrapper>
  );
}

const LoginFormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 17.1rem;
`;

const WelcomeText = styled.h1`
  color: var(--Gray-Gray_light-gray-800_light, #222);
  text-align: center;
  font-family: Inter;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.2rem;
  margin-bottom: 5.7rem;
`;
