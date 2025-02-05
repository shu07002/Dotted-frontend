import React from 'react';
import styled from 'styled-components';
import GoogleIcon from '@/assets/svg/LoginPage/GoogleIconSVG.svg?react';
import AppleIcon from '@/assets/svg/LoginPage/AppleIconSVG.svg?react';
import Email from '@/assets/svg/LoginPage/EmailSVG.svg?react';

export default function SignUpWithOtherEmail() {
  return (
    <SignUpWithOtherEmailWrapper>
      <BlackButtonWrapper>
        <GoogleIcon />
        <span>Sign up with Google</span>
      </BlackButtonWrapper>

      <BlackButtonWrapper>
        <AppleIcon />
        <span>Sign up with Apple</span>
      </BlackButtonWrapper>

      <GrayButtonWrapper>
        <Email />
        <span>Sign up with Email</span>
      </GrayButtonWrapper>
    </SignUpWithOtherEmailWrapper>
  );
}

const SignUpWithOtherEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

const BlackButtonWrapper = styled.div`
  cursor: pointer;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--Gray-Gray_light-gray-800_light, #222);
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 176px;
    color: var(--Gray-Gray_light-gray-50_light, #fff);
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.45px;
  }
`;
const GrayButtonWrapper = styled.div`
  cursor: pointer;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: var(--Background-Background_light-Base_light, #e6e6e6);
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 154px;
    color: var(--Gray-Gray_light-gray-800_light, #222);
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.45px;
  }
`;
