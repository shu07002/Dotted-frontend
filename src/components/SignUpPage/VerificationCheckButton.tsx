import styled from 'styled-components';

export default function VerificationCheckButton() {
  return (
    <VerificationCheckButtonWrapper>
      Verification Check
    </VerificationCheckButtonWrapper>
  );
}

const VerificationCheckButtonWrapper = styled.div`
  cursor: pointer;
  width: 16.7rem;
  position: absolute;
  top: 50%;
  right: -12.5%;

  transform: translate(-50%, -50%);

  border-radius: 5px;
  background: ${({ theme }) => theme.colors.gray700};

  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 225% */
  letter-spacing: -0.48px;
`;
