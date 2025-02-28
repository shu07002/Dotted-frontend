import styled from 'styled-components';
import UnVerified from '@/assets/svg/SignUpPage/UnverifiedSVG.svg?react';
import Verified from '@/assets/svg/SignUpPage/VerifiedSVG.svg?react';

interface VerifyCodeStatusProps {
  isSubmitClicked: boolean;
}

export default function VerifyCodeStatus({
  isSubmitClicked
}: VerifyCodeStatusProps) {
  const verifyText = isSubmitClicked ? 'completed' : 'uncompleted';
  return (
    <VerifyCodeStatusWrapper $isSubmitClicked={isSubmitClicked}>
      {isSubmitClicked ? <Verified /> : <UnVerified />}
      <span>{verifyText}</span>
    </VerifyCodeStatusWrapper>
  );
}

const VerifyCodeStatusWrapper = styled.div<{ $isSubmitClicked: boolean }>`
  width: 60.5rem;
  display: flex;
  gap: 0.9rem;
  align-items: center;

  > span {
    color: ${({ $isSubmitClicked, theme }) =>
      $isSubmitClicked ? theme.colors.purple600 : theme.colors.gray600};
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 36px; /* 200% */
    letter-spacing: -0.9px;
  }
`;
