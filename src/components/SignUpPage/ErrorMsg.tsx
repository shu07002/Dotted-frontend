import styled from 'styled-components';
import ErrorMsgSVG from '@/assets/svg/SignUpPage/ErrorMsgSVG.svg?react';

interface ErrorMsgProps {
  msg: string | undefined;
}

export default function ErrorMsg({ msg }: ErrorMsgProps) {
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
      <ErrorText>{msg}</ErrorText>
    </div>
  );
}

const ErrorText = styled.span`
  color: var(--Semantic-Negative-900, #ea3729);
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;
