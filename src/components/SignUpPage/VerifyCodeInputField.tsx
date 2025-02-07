import styled from 'styled-components';
import VerifyCodeStatus from './VerifyCodeStatus';

interface VerifyCodeInputFieldProps {
  isSubmitClicked: boolean;
  onClickSubmit: () => void;
}

export default function VerifyCodeInputField({
  isSubmitClicked,
  onClickSubmit
}: VerifyCodeInputFieldProps) {
  return (
    <VerifyCodeInputFieldWrapper>
      <span>Verify Code</span>
      <div style={{ display: 'flex', gap: '2.1rem' }}>
        <VerifyCodeInput>
          <label htmlFor="email">
            <input name="email" id="email" type="text" />
          </label>
        </VerifyCodeInput>

        <VerifyCodeButtonWrapper
          onClick={onClickSubmit}
          $isSubmitClicked={isSubmitClicked}
        >
          <VerifyCodeText>Submit</VerifyCodeText>
        </VerifyCodeButtonWrapper>
      </div>
      <VerifyCodeStatus isSubmitClicked={isSubmitClicked} />
    </VerifyCodeInputFieldWrapper>
  );
}

const VerifyCodeInputFieldWrapper = styled.div`
  width: 60.5rem;
  margin-bottom: 2.6rem;

  > span {
    color: ${({ theme }) => theme.colors.gray600};
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px; /* 200% */
    letter-spacing: -0.9px;
  }
`;

const VerifyCodeInput = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  > label {
    input {
      padding-left: 2.3rem;
      width: 39.4rem;
      height: 5rem;
      flex-shrink: 0;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      background: ${({ theme }) => theme.colors.gray100};
      font-family: Pretendard;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 36px; /* 180% */
      letter-spacing: -0.6px;
      outline: none;
    }
  }
`;
const VerifyCodeButtonWrapper = styled.div<{ $isSubmitClicked: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 190px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ $isSubmitClicked, theme }) =>
    $isSubmitClicked ? theme.colors.gray700 : theme.colors.purple600};
`;

const VerifyCodeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
