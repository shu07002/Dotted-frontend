import BackButton from '@/components/common/Login,SignUp/BackButton';
import ForgetPassForm from '@/components/LoginPage/ForgetPassPage/ForgetPassForm';
import React from 'react';
import styled from 'styled-components';

export default function ForgetPassPage() {
  return (
    <ForgetPassPageWrapper>
      <BackButton />

      <ForgetPassForm />
    </ForgetPassPageWrapper>
  );
}

const ForgetPassPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;
