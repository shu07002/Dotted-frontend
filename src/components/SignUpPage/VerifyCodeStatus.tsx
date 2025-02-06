import React from 'react';
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
    color: var(
      ${(props) =>
        props.$isSubmitClicked
          ? '--Purple-Purple_light-purple-600_light, #9678D3'
          : '--Gray-Gray_light-gray-600_light, #6c6c6c'}
    );
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 300;
    line-height: 36px; /* 200% */
    letter-spacing: -0.9px;
  }
`;
