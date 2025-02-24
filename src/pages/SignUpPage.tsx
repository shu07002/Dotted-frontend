import BackButton from '@/components/common/Login,SignUp/BackButton';
import SignUpForm from '@/components/SignUpPage/SignUpForm';
import PageLayout from '@/components/common/Login,SignUp/PageLayout';
import { useEffect, useState } from 'react';
import EmailVerification from '@/components/SignUpPage/EmailVerification';
import styled from 'styled-components';
import PersonalInformation from '@/components/SignUpPage/PersonalInformation';
import StudentVerification from '@/components/SignUpPage/StudentVerification';
import AccessRestrictedModal from '@/components/SignUpPage/AccessRestrictedModal';
import { useForm } from 'react-hook-form';
import { SignUpFormData } from '@/types/signUpFormData';
import { useMutation } from '@tanstack/react-query';
import SignUpComplete from '@/components/SignUpPage/SignUpComplete';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    overflowY: 'hidden' as 'auto' | 'hidden' | 'scroll' | 'visible' | undefined,
    backgroundColor: 'var(--Modal-Background)'
  }
};

//🤖TODO
// 닉네임 중복체크 후 변경 못하도록 ✅
// 회원가입 데이터 확인 후 요청 ✅
// 소셜 회원가입 연결
// 서강 메일 가입 코스 확인
// 입력 예외 처리
// 학생증 사진 인증 페이지 모달로 분리 ✅

export default function SignUpPage() {
  const { state } = useLocation();
  const [step, setStep] = useState(1);
  const [isSogangEmail, setIsSogangEmail] = useState(false);
  const [isCheckedTOS, setisCheckedTOS] = useState(false); // false
  const [isCheckedPP, setisCheckedPP] = useState(false); // false
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isChecked = isCheckedTOS && isCheckedPP;

  const { register, handleSubmit, watch, setValue } = useForm<SignUpFormData>();

  useEffect(() => {
    if (state) {
      console.log(state);
      setisCheckedPP(true);
      setisCheckedTOS(true);
      setValue('email', state.email);
      setValue('login_type', state.login_type);
      setValue('name', state.name);
      setValue('social_id', state.social_id);
      setValue('password', state.social_id);
      setStep(3);
    }
  }, []);

  if (isModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  if (step === 4 && !isSogangEmail) setIsModalOpen(true);

  const signUpMutation = useMutation({
    mutationFn: async (userData: SignUpFormData) => {
      const { passwordCheck, ...dataToSend } = userData;

      if (!dataToSend.email.includes('@'))
        dataToSend.email = `${dataToSend.email}@sogang.ac.kr`;

      //console.log(dataToSend);

      console.log(dataToSend);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          method: 'POST', // ✅ POST 요청으로 변경
          headers: {
            'Content-Type': 'application/json' // ✅ JSON 요청 헤더 추가
          },
          body: JSON.stringify(dataToSend) // ✅ body에 userData 전송
        }
      );

      if (!response.ok) throw new Error('Failed to sign up');

      onChangeStep();
      return response.json();
    },
    onSuccess: (data) => {
      console.log('🎉 회원가입 성공:', data);
      window.history.replaceState(null, '', '/login');
      // ☑️ 회원가입 성공 후 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error('❌ 회원가입 실패:', error);
    }
  });

  const onChangeStep = (step: number = 1) => {
    if (isChecked) setStep((prevStep) => prevStep + step);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClickLater = () => {
    closeModal();
    onChangeStep();
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
  };

  const onClickNow = () => {
    closeModal();
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
          loginType={state.login_type}
        />
      )}

      {step === 4 && !isSogangEmail && (
        <>
          <StyledModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="example"
          >
            <AccessRestrictedModal
              onClickLater={onClickLater}
              onClickNow={onClickNow}
            />
          </StyledModal>
          <StudentVerification onChangeStep={onChangeStep} watch={watch} />
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

const StyledModal = styled(Modal)``;
