import BackButton from '@/components/SignUpPage/BackButton';
import SignUpForm from '@/components/SignUpPage/SignUpForm';
import PageLayout from '@/components/SignUpPage/PageLayout';
import { useState } from 'react';
import EmailVerification from '@/components/SignUpPage/EmailVerification';
import styled from 'styled-components';
import PersonalInformation from '@/components/SignUpPage/PersonalInformation';
import StudentVerification from '@/components/SignUpPage/StudentVerification';
import AccessRestrictedModal from '@/components/SignUpPage/AccessRestrictedModal';

//TODO
//로그인 폼에서 체크 박스 상태 관리하기
//버튼 클릭 링크 세팅

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [isSogangEmail, setIsSogangEmail] = useState(false);
  const [isCheckedTOS, setisCheckedTOS] = useState(false);
  const [isCheckedPP, setisCheckedPP] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(true);

  const onChangeStep = () => {
    if (isCheckedTOS && isCheckedPP) setStep((prevStep) => prevStep + 1);
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

  return (
    <div>
      {step === 1 && <PageLayout />}

      <BackButton />

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
          isSogangEmail={isSogangEmail}
          onChangeStep={onChangeStep}
        />
      )}

      {step === 3 && <PersonalInformation onChangeStep={onChangeStep} />}

      {step === 4 && (
        <>
          {isModalOpen && (
            <AccessRestrictedModal
              onClickLater={onClickLater}
              onClickNow={onClickNow}
            />
          )}
          <StudentVerification onChangeStep={onChangeStep} />
        </>
      )}
    </div>
  );
}

const SignUpTitle = styled.p`
  color: var(--Gray-Gray_light-gray-800_light, #222);
  text-align: center;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -2px;
  margin-bottom: 2.6rem;
`;
