import styled from 'styled-components';
import VerifyCodeStatus from './VerifyCodeStatus';

interface VerifyCodeInputFieldProps {
  isSubmitClicked: boolean;
  onClickSubmit: () => void;
  code: string;
  onChangeCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VerifyCodeInputField({
  isSubmitClicked,
  onClickSubmit,
  code,
  onChangeCode
}: VerifyCodeInputFieldProps) {
  return (
    <VerifyCodeInputFieldWrapper>
      <span>Verify Code</span>
      <div style={{ display: 'flex', gap: '2.1rem' }}>
        <VerifyCodeInput>
          <label htmlFor="code">
            <input
              name="code"
              id="code"
              type="text"
              value={code}
              onChange={onChangeCode}
            />
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
  width: 100%;
  max-width: 60.5rem;
  margin-bottom: 2.6rem;

  > span {
    color: ${({ theme }) => theme.colors.gray600};
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
  width: 100%;
  > label {
    width: 100%;
    input {
      padding-left: 2.3rem;
      width: 100%;
      height: 5rem;
      flex-shrink: 0;
      border-radius: 5px;
      border: 1px solid ${({ theme }) => theme.colors.gray300};
      background: ${({ theme }) => theme.colors.gray100};

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
  cursor: ${(props) => (props.$isSubmitClicked ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19rem;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  background: ${({ $isSubmitClicked, theme }) =>
    $isSubmitClicked ? theme.colors.gray700 : theme.colors.purple600};

  @media (max-width: 450px) {
    width: 15rem;
  }
`;

const VerifyCodeText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;

  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
