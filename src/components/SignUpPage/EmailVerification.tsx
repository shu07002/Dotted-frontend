import { useState } from 'react';
import styled from 'styled-components';
import EmailInputField from './EmailInputField';
import VerifyCodeInputField from './VerifyCodeInputField';
import NextButton from './NextButton';

interface EmailVerificationProps {
  isSogangEmail: boolean;
  onChangeStep: () => void;
}

export default function EmailVerification({
  isSogangEmail,
  onChangeStep
}: EmailVerificationProps) {
  const [isSendCodeClicked, setIsSendCodeClicked] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);

  const onClickSendCodeButton = () => {
    setIsSendCodeClicked(true);
  };

  const onClickSubmit = () => {
    setIsSubmitClicked(true);
  };
  return (
    <EmailVerificationWrapper>
      <EmailInputField
        isSogangEmail={isSogangEmail}
        isSendCodeClicked={isSendCodeClicked}
        onClickSendCodeButton={onClickSendCodeButton}
      />

      {isSendCodeClicked && (
        <VerifyCodeInputField
          isSubmitClicked={isSubmitClicked}
          onClickSubmit={onClickSubmit}
        />
      )}

      {isSubmitClicked && <NextButton onChangeStep={onChangeStep} />}
    </EmailVerificationWrapper>
  );
}

const EmailVerificationWrapper = styled.section`
  margin-top: 3.2rem;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    color: ${({ theme }) => theme.colors.gray800};
    text-align: center;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }
`;
