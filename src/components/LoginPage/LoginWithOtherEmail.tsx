import styled from 'styled-components';
import GoogleIcon from '@/assets/svg/SignUpPage/GoogleIconSVG.svg?react';
import AppleIcon from '@/assets/svg/SignUpPage/AppleIconSVG.svg?react';

export default function LoginWithOtherEmail() {
  return (
    <LoginWithOtherEmailWrapper>
      <BlackButtonWrapper>
        <GoogleIconStyled />
        <span>Continue with Google</span>
      </BlackButtonWrapper>

      <BlackButtonWrapper>
        <AppleIconStyled />
        <span>Continue with Apple</span>
      </BlackButtonWrapper>
    </LoginWithOtherEmailWrapper>
  );
}

const LoginWithOtherEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 4.8rem;
`;

const BlackButtonWrapper = styled.div`
  cursor: pointer;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.gray800};
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 176px;
    color: ${({ theme }) => theme.colors.gray50};
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.45px;
  }
`;

const GoogleIconStyled = styled(GoogleIcon)``;

const AppleIconStyled = styled(AppleIcon)`
  path {
    fill: ${({ theme }) => theme.colors.gray50};
  }
`;
