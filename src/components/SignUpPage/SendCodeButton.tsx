import styled from 'styled-components';

interface SendCodeButtonProps {
  loading: boolean;
  isSendCodeClicked: boolean;
  isSubmitClicked: boolean;
  onClickSendCodeButton: () => void;
}

export default function SendCodeButton({
  loading,
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
        {isSendCodeClicked
          ? 'Send Code Again'
          : loading
            ? 'Sending...'
            : 'Send Code'}
      </SendCodeButtonText>
    </SendCodeButtonWrapper>
  );
}

const SendCodeButtonWrapper = styled.div<{
  $isSendCodeClicked: boolean;
  $isSubmitClicked: boolean;
}>`
  cursor: ${(props) => (props.$isSubmitClicked ? 'not-allowed' : 'pointer')};
  margin-top: 2.6rem;
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

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
