import { useState } from 'react';
import styled from 'styled-components';
import EmailInputField from './EmailInputField';
import VerifyCodeInputField from './VerifyCodeInputField';
import NextButton from './NextButton';
import { SignUpFormData } from '@/types/signUpFormData';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

interface EmailVerificationProps {
  isSogangEmail: boolean;
  onChangeStep: () => void;
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
  setValue: UseFormSetValue<SignUpFormData>;
}

export default function EmailVerification({
  isSogangEmail,
  onChangeStep,
  register,
  watch,
  setValue
}: EmailVerificationProps) {
  const [isSendCodeClicked, setIsSendCodeClicked] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [token, setToken] = useState('');

  const sendCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        }
      );
      if (!response.ok) throw new Error('Failed to send verification code');
      return response.json();
    },
    onSuccess: (data) => {
      setToken(data.token); // 응답 데이터 저장
      //setIsSendCodeClicked(true); // 인증 코드 입력 필드 표시
      console.log('Verification code sent successfully!');
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    }
  });

  const onClickSendCodeButton = () => {
    const emailValue = watch('email');
    const emailDomain = '@sogang.ac.kr';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === '') {
      alert('Please write down your email address');
      return;
    }

    if (!emailRegex.test(emailValue) && !isSogangEmail)
      alert('Please enter a valid email address.');

    const finalEmail = isSogangEmail
      ? `${emailValue}${emailDomain}`
      : emailValue;

    sendCodeMutation.mutate(finalEmail);
  };

  const onClickSubmit = () => {
    //setIsSubmitClicked(true);
    console.log(watch('email'));
  };
  return (
    <EmailVerificationWrapper>
      <EmailInputField
        isSogangEmail={isSogangEmail}
        isSendCodeClicked={isSendCodeClicked}
        onClickSendCodeButton={onClickSendCodeButton}
        register={register}
      />

      {isSendCodeClicked && (
        <VerifyCodeInputField
          isSubmitClicked={isSubmitClicked}
          onClickSubmit={onClickSubmit}
        />
      )}

      {isSubmitClicked && <NextButton onChangeStep={onChangeStep} />}
    </EmailVerificationWrapper>
  );
}

const EmailVerificationWrapper = styled.section`
  margin-top: 3.2rem;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    color: var(--Gray-Gray_light-gray-800_light, #222);
    text-align: center;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }
`;
