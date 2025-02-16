import BackButton from '@/components/common/Login,SignUp/BackButton';
import SignUpForm from '@/components/SignUpPage/SignUpForm';
import PageLayout from '@/components/common/Login,SignUp/PageLayout';
import { useRef, useState } from 'react';
import EmailVerification from '@/components/SignUpPage/EmailVerification';
import styled from 'styled-components';
import PersonalInformation from '@/components/SignUpPage/PersonalInformation';
import StudentVerification from '@/components/SignUpPage/StudentVerification';
import AccessRestrictedModal from '@/components/SignUpPage/AccessRestrictedModal';
import { useForm } from 'react-hook-form';
import { SignUpFormData } from '@/types/signUpFormData';
import { useMutation } from '@tanstack/react-query';
import SignUpComplete from '@/components/SignUpPage/SignUpComplete';

export default function SignUpPage() {
  const [step, setStep] = useState(4);
  const [isSogangEmail, setIsSogangEmail] = useState(false);
  const [isCheckedTOS, setisCheckedTOS] = useState(false);
  const [isCheckedPP, setisCheckedPP] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userId, setUserId] = useState(-1);

  //🤖TODO
  // 닉네임 중복체크 후 변경 못하도록
  // 회원가입 데이터 확인 후 요청

  const { register, handleSubmit, watch, setValue } = useForm<SignUpFormData>();

  const signUpMutation = useMutation({
    mutationFn: async (userData: SignUpFormData) => {
      const { passwordCheck, ...dataToSend } = userData;

      if (!dataToSend.email.includes('@'))
        dataToSend.email = `${dataToSend.email}@sogang.ac.kr`;

      console.log(dataToSend);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        }
      );
      if (!response.ok) throw new Error('Failed to sign up');

      onChangeStep();
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 회원가입 성공:', data);
      setUserId(data.id);

      // ☑️☑️☑️회원가입 성공 시 회원가입 성공 페이지로 이동동
    },
    onError: (error) => {
      console.error('❌ 회원가입 실패:', error);
    }
  });

  const onChangeStep = () => {
    if (isCheckedTOS && isCheckedPP) setStep((prevStep) => prevStep + 1);
    else alert('Please agree to the terms and conditions. ');
  };

  const onChangeIsSogangEmail = () => {
    setIsSogangEmail(true);
  };

  const onChangeCheckedTos = () => {
    setisCheckedTOS(!isCheckedTOS);
  };
  const onChangeCheckedPP = () => {
    setisCheckedPP(!isCheckedPP);
  };

  const onClickLater = () => {
    setIsModalOpen(false);
    onChangeStep();
  };

  const onClickNow = () => {
    setIsModalOpen(false);
  };

  const onSubmitSignUp = (data: SignUpFormData) => {
    signUpMutation.mutate(data);
  };

  return (
    <SignUpPageWrapper onSubmit={handleSubmit(onSubmitSignUp)}>
      {step === 1 && <PageLayout />}

      {!((step === 4 && isSogangEmail) || step === 5) && <BackButton />}

      {step === 1 && (
        <SignUpForm
          onChangeStep={onChangeStep}
          onChangeIsSogangEmail={onChangeIsSogangEmail}
          onChangeCheckedTos={onChangeCheckedTos}
          onChangeCheckedPP={onChangeCheckedPP}
          isCheckedTOS={isCheckedTOS}
          isCheckedPP={isCheckedPP}
        />
      )}

      {step >= 2 && step <= 3 && <SignUpTitle>Sign Up</SignUpTitle>}

      {step === 2 && (
        <EmailVerification
          setValue={setValue}
          isSogangEmail={isSogangEmail}
          onChangeStep={onChangeStep}
          register={register}
          watch={watch}
        />
      )}

      {step === 3 && (
        <PersonalInformation
          isSogangEmail={isSogangEmail}
          register={register}
          watch={watch}
          setValue={setValue}
        />
      )}

      {step === 4 && !isSogangEmail && (
        <>
          {isModalOpen && (
            <AccessRestrictedModal
              onClickLater={onClickLater}
              onClickNow={onClickNow}
            />
          )}
          <StudentVerification userId={userId} onChangeStep={onChangeStep} />
        </>
      )}

      {((step === 4 && isSogangEmail) || step === 5) && <SignUpComplete />}
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.form`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;

const SignUpTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray800};
  text-align: center;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -2px;
  margin-bottom: 2.6rem;
`;
