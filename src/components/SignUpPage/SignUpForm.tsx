import Logo from '../common/Logo';
import AgreeBox from './AgreeBox';
import SignUpWithSogangEmail from './SignUpWithSogangEmail';
import Divider from './Divider';
import SignUpWithOtherEmail from './SignUpWithOtherEmail';
import styled from 'styled-components';

interface SignUpFormProps {
  onChangeStep: () => void;
  onChangeIsSogangEmail: () => void;
  onChangeCheckedTos: () => void;
  onChangeCheckedPP: () => void;
  isCheckedTOS: boolean;
  isCheckedPP: boolean;
}

export default function SignUpForm({
  onChangeStep,
  onChangeIsSogangEmail,
  onChangeCheckedTos,
  onChangeCheckedPP,
  isCheckedTOS,
  isCheckedPP
}: SignUpFormProps) {
  return (
    <SignUpFormWrapper>
      <Logo />
      <WelcomeText>Welcome to Dotted</WelcomeText>
      <AgreeBox
        onChangeCheckedTos={onChangeCheckedTos}
        onChangeCheckedPP={onChangeCheckedPP}
        isCheckedTOS={isCheckedTOS}
        isCheckedPP={isCheckedPP}
      />
      <SignUpWithSogangEmail
        onChangeStep={onChangeStep}
        onChangeIsSogangEmail={onChangeIsSogangEmail}
      />

      <Divider />

      <SignUpWithOtherEmail onChangeStep={onChangeStep} />
    </SignUpFormWrapper>
  );
}

const SignUpFormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 17.1rem;
`;

const WelcomeText = styled.h1`
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
  font-family: Inter;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.2rem;
  margin-bottom: 5.7rem;
`;
