import styled from 'styled-components';

interface SendCodeButtonProps {
  isSendCodeClicked: boolean;
  isSubmitClicked: boolean;
  onClickSendCodeButton: () => void;
}

export default function SendCodeButton({
  isSendCodeClicked,
  isSubmitClicked,
  onClickSendCodeButton
}: SendCodeButtonProps) {
  return (
    <SendCodeButtonWrapper
      onClick={onClickSendCodeButton}
      $isSendCodeClicked={isSendCodeClicked}
      $isSubmitClicked={isSubmitClicked}
    >
      <SendCodeButtonText>
        {isSendCodeClicked ? 'Send Code Again' : 'Send Code'}
      </SendCodeButtonText>
    </SendCodeButtonWrapper>
  );
}

const SendCodeButtonWrapper = styled.div<{
  $isSendCodeClicked: boolean;
  $isSubmitClicked: boolean;
}>`
  cursor: ${(props) => (props.$isSubmitClicked ? 'not-allowed' : 'pointer')};
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 2.3rem;
  width: 60.5rem;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ $isSendCodeClicked, theme }) =>
    $isSendCodeClicked ? theme.colors.gray700 : theme.colors.purple600};

  > span {
    color: ${({ theme }) => theme.colors.gray50};
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
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
