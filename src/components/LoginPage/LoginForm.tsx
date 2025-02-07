import React from 'react';
import styled from 'styled-components';
import Greeting from '../common/Login,SignUp/Greeting';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import Divider from '../common/Login,SignUp/Divider';
import LoginWithOtherEmail from './LoginWithOtherEmail';
import SignUpPropmp from './SignUpPropmp';

export default function LoginForm() {
  return (
    <LoginFormWrapper>
      <Greeting text="Login to Dotted" />
      <EmailInput />
      <PasswordInput />
      <OptionBox>
        <div>
          <StyledCheckBox /> <span>Remember me</span>
        </div>
        <ForgetPassword>forget password?</ForgetPassword>
      </OptionBox>

      <LoginButton>Login</LoginButton>

      <Divider />

      <LoginWithOtherEmail />

      <SignUpPropmp />
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

const OptionBox = styled.div`
  display: flex;
  position: relative;
  gap: 5.1rem;
  margin-bottom: 2.9rem;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;

    > span {
      color: ${({ theme }) => theme.colors.gray800};
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.8px;
    }
  }
`;

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })`
  accent-color: ${({ theme }) => theme.colors.purple600};
`;

const ForgetPassword = styled.div`
  color: ${({ theme }) => theme.colors.purple600};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.8px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

const LoginButton = styled.button`
  width: 38.6rem;
  height: 3.8rem;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.purple1050};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
  margin-bottom: 3.7rem;
`;
