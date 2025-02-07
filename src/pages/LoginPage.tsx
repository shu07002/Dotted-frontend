import BackButton from '@/components/common/Login,SignUp/BackButton';
import Greeting from '@/components/common/Login,SignUp/Greeting';
import PageLayout from '@/components/common/Login,SignUp/PageLayout';
import LoginForm from '@/components/LoginPage/LoginForm';
import React from 'react';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageWrapper>
      <PageLayout />
      <BackButton />

      <LoginForm />
    </LoginPageWrapper>
  );
}

const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;
