import React, { useState } from 'react';
import styled from 'styled-components';

interface SendCodeButtonProps {
  isSendCodeClicked: boolean;
  onClickSendCodeButton: () => void;
}

export default function SendCodeButton({
  isSendCodeClicked,
  onClickSendCodeButton
}: SendCodeButtonProps) {
  return (
    <SendCodeButtonWrapper
      onClick={onClickSendCodeButton}
      $isSendCodeClicked={isSendCodeClicked}
    >
      <SendCodeButtonText>
        {isSendCodeClicked ? 'Send Code Again' : 'Send Code'}
      </SendCodeButtonText>
    </SendCodeButtonWrapper>
  );
}

const SendCodeButtonWrapper = styled.div<{ $isSendCodeClicked: boolean }>`
  cursor: pointer;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2.3rem;
  width: 60.5rem;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(
    ${(props) =>
      props.$isSendCodeClicked
        ? '--Gray-Gray_light-gray-700_light, #464646'
        : '--Purple-Purple_light-purple-600_light, #9678d3'}
  );
  > span {
    color: var(--Gray-Gray_light-gray-50_light, #fff);
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 180% */
    letter-spacing: -1px;
  }
`;

const SendCodeButtonText = styled.div`
  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
