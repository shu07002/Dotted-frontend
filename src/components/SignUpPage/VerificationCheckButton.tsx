import styled from 'styled-components';

interface VerificationCheckButtonProps {
  onClickVerificationCheck: () => void;
  isLoading: boolean;
}

export default function VerificationCheckButton({
  onClickVerificationCheck,
  isLoading
}: VerificationCheckButtonProps) {
  return (
    <Wrapper>
      <VerificationCheckButtonWrapper
        onClick={onClickVerificationCheck}
        disabled={isLoading} // Prevent multiple clicks
      >
        Check Availability
      </VerificationCheckButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  position: absolute;
  top: 50%;
  right: -12.5%;
  transform: translate(-50%, -50%);
`;

const VerificationCheckButtonWrapper = styled.div<{ disabled?: boolean }>`
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  width: 16.7rem;
  border-radius: 5px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray500 : theme.colors.gray700};
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 36px;
`;
