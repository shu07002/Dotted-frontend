import styled from 'styled-components';
import GoogleIcon from '@/assets/svg/SignUpPage/GoogleIconSVG.svg?react';
import AppleIcon from '@/assets/svg/SignUpPage/AppleIconSVG.svg?react';
import Email from '@/assets/svg/SignUpPage/EmailSVG.svg?react';

interface SignUpWithOtherEmailProps {
  onChangeStep: () => void;
}

export default function SignUpWithOtherEmail({
  onChangeStep
}: SignUpWithOtherEmailProps) {
  return (
    <SignUpWithOtherEmailWrapper>
      <BlackButtonWrapper>
        <GoogleIconStyled />
        <span>Sign up with Google</span>
      </BlackButtonWrapper>

      <BlackButtonWrapper>
        <AppleIconStyled />
        <span>Sign up with Apple</span>
      </BlackButtonWrapper>

      <GrayButtonWrapper onClick={onChangeStep}>
        <EmailIconStyled />
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
const GrayButtonWrapper = styled.div`
  cursor: pointer;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.backgroundBase};
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 154px;
    color: ${({ theme }) => theme.colors.gray800};
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

const EmailIconStyled = styled(Email)`
  path {
    fill: ${({ theme }) => theme.colors.gray900};
  }
`;
