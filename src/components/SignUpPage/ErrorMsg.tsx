import React from 'react';
import styled from 'styled-components';
import ErrorMsgSVG from '@/assets/svg/SignUpPage/ErrorMsgSVG.svg?react';

export default function ErrorMsg() {
  return (
    <div
      style={{
        marginLeft: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <ErrorMsgSVG />
      <ErrorText>Password does not match</ErrorText>
    </div>
  );
}

const ErrorText = styled.span`
  color: var(--Semantic-Negative-900, #ea3729);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;
