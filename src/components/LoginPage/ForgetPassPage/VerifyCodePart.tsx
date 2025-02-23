import { useState } from 'react';
import styled from 'styled-components';

interface VerifyCodePartProps {
  onChangeStep: () => void;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function VerifyCodePart({
  onChangeStep,
  code,
  setCode
}: VerifyCodePartProps) {
  return (
    <VerifyCodePartWrapper>
      <CodeInput
        placeholder="enter the verify code"
        required={true}
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
      />
      <VerifyButton onClick={onChangeStep}>Verify Email</VerifyButton>
      <ResendButton>Resend Code</ResendButton>
    </VerifyCodePartWrapper>
  );
}

const VerifyCodePartWrapper = styled.div`
  width: 100%;
`;

const CodeInput = styled.input`
  padding-left: 2.3rem;
  margin-bottom: 2.3rem;
  width: 100%;
  height: 5rem;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.gray100};

  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;

const VerifyButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.purple600};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const ResendButton = styled.div`
  cursor: pointer;
  margin-top: 3.8rem;
  color: ${({ theme }) => theme.colors.purple600};
  text-align: center;
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
