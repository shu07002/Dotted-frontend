import styled from 'styled-components';
import { SignUpFormData } from '@/types/signUpFormData';
<<<<<<< HEAD
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
=======
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
>>>>>>> 87e68f8d298216d49a4de9f35014829417f25a5c

interface EmailVerificationProps {
  isSogangEmail: boolean;
  onChangeStep: () => void;
  register: UseFormRegister<SignUpFormData>;
  watch: UseFormWatch<SignUpFormData>;
}

<<<<<<< HEAD
export default function EmailVerification(
  {
    // isSogangEmail,
    // onChangeStep,
    // register,
    // watch,
    // setValue
  }: EmailVerificationProps
) {
  // const [isSendCodeClicked, setIsSendCodeClicked] = useState(false);
  // const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  // const [token, setToken] = useState('');

  // const sendCodeMutation = useMutation({
  //   mutationFn: async (email: string) => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/user/email`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ email })
  //       }
  //     );
  //     if (!response.ok) throw new Error('Failed to send verification code');
  //     return response.json();
  //   },
  //   onSuccess: () => {
  //     // setToken(data.token); // 응답 데이터 저장
  //     //setIsSendCodeClicked(true); // 인증 코드 입력 필드 표시
  //     console.log('Verification code sent successfully!');
  //   },
  //   onError: (error) => {
  //     console.log(`Error: ${error.message}`);
  //   }
  // });

  // const onClickSendCodeButton = () => {
  //   const emailValue = watch('email');
  //   const emailDomain = '@sogang.ac.kr';
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
=======
export default function EmailVerification({
  isSogangEmail,
  onChangeStep,
  register,
  watch
}: EmailVerificationProps) {
  const [isSendCodeClicked, setIsSendCodeClicked] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');

  // ✅ 백엔드에 이메일 보내서 코드 받아오기
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
      // 인증 코드 입력 필드 표시
      console.log('Verification code sent successfully!');
    },
    onError: (error) => {
      console.log(`Error: ${error.message}`);
    }
  });

  // ✅ 인증 코드 검증 요청 (백엔드로 token과 code 전송)
  const verifyCodeMutation = useMutation({
    mutationFn: async ({ code, token }: { code: string; token: string }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: token, verification_code: code }) // code와 token을 백엔드로 전송
        }
      );
      if (!response.ok) throw new Error('Invalid verification code');
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitClicked(true); // 인증 성공 시 Next 버튼 표시
      alert('Email verified successfully!');
    },
    onError: (error) => {
      alert(`Verification failed: ${error.message}`);
    }
  });

  // ✅ 서강대/일반 이메일 확인 후 인증코드 요청하기기
  const onClickSendCodeButton = () => {
    if (isSubmitClicked) return;
    const emailValue = watch('email');
    const emailDomain = '@sogang.ac.kr';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
>>>>>>> 87e68f8d298216d49a4de9f35014829417f25a5c

  //   if (emailValue === '') {
  //     alert('Please write down your email address');
  //     return;
  //   }

  //   if (!emailRegex.test(emailValue) && !isSogangEmail)
  //     alert('Please enter a valid email address.');

<<<<<<< HEAD
  //   const finalEmail = isSogangEmail
  //     ? `${emailValue}${emailDomain}`
  //     : emailValue;

  //   sendCodeMutation.mutate(finalEmail);
  // };

  // const onClickSubmit = () => {
  //   //setIsSubmitClicked(true);
  //   console.log(watch('email'));
  // };
=======
    const finalEmail = isSogangEmail
      ? `${emailValue}${emailDomain}`
      : emailValue;
    setIsSendCodeClicked(true);
    sendCodeMutation.mutate(finalEmail);
  };

  const onClickSubmit = () => {
    if (isSubmitClicked) return;
    if (!code) {
      alert('Please enter the verification code.');
      return;
    }
    verifyCodeMutation.mutate({ code, token });
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
>>>>>>> 87e68f8d298216d49a4de9f35014829417f25a5c
  return (
    <EmailVerificationWrapper>
      {/* <EmailInputField
        isSogangEmail={isSogangEmail}
        isSendCodeClicked={isSendCodeClicked}
        isSubmitClicked={isSubmitClicked}
        onClickSendCodeButton={onClickSendCodeButton}
        register={register}
      />

      {isSendCodeClicked && (
        <VerifyCodeInputField
          isSubmitClicked={isSubmitClicked}
          onClickSubmit={onClickSubmit}
          code={code}
          onChangeCode={onChangeCode}
        />
      )}

      {isSubmitClicked && <NextButton onChangeStep={onChangeStep} />} */}
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
    color: ${({ theme }) => theme.colors.gray800};
    text-align: center;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -2px;
  }
`;
