import styled from 'styled-components';
import Recomended from './Recomended';
import MainText from './MainText';
import SogangSignUpButton from './SogangSignUpButton';
import CreateEmailButton from './CreateEmailButton';

interface SignUpWithSogangEmailProps {
  onChangeStep: () => void;
  onChangeIsSogangEmail: () => void;
}

export default function SignUpWithSogangEmail({
  onChangeStep,
  onChangeIsSogangEmail
}: SignUpWithSogangEmailProps) {
  return (
    <SogangEmailWrapper>
      <Recomended />

      <MainText />

      <ButtonBoxWrapper>
        <SogangSignUpButton
          onChangeStep={onChangeStep}
          onChangeIsSogangEmail={onChangeIsSogangEmail}
        />
        <CreateEmailButton />
      </ButtonBoxWrapper>
    </SogangEmailWrapper>
  );
}
const SogangEmailWrapper = styled.div`
  margin-top: 2.9rem;
  margin-bottom: 5.7rem;
  position: relative;
  width: 66rem;
  height: 23.3rem;
  flex-shrink: 0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.63);
  backdrop-filter: blur(6.449999809265137px);
`;

const ButtonBoxWrapper = styled.div`
  display: flex;
  gap: 1.9rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
