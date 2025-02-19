import AgreeBox from './AgreeBox';
import SignUpWithSogangEmail from './SignUpWithSogangEmail';
import Divider from '../common/Login,SignUp/Divider';
import SignUpWithOtherEmail from './SignUpWithOtherEmail';
import styled from 'styled-components';
import Greeting from '../common/Login,SignUp/Greeting';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
      <Greeting text="Welcome to Dotted" />
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
      <GoogleOAuthProvider
        clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}
      >
        <SignUpWithOtherEmail onChangeStep={onChangeStep} />
      </GoogleOAuthProvider>
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
