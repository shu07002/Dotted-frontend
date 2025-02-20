import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import GoogleIcon from '@/assets/svg/SignUpPage/GoogleIconSVG.svg?react';

const GoogleLoginButton = ({
  onChangeStep,
  isChecked
}: {
  onChangeStep: (step?: number) => void;
  isChecked: boolean;
}) => {
  const onClickLogin = () => {
    if (!isChecked) {
      alert('Please agree to the terms and conditions. ');
      return;
    }
    login();
  };

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      console.log('✅ 로그인 성공:', tokenResponse);
      sendTokenToBackend(tokenResponse.code);
    },
    onError: () => {
      console.log('❌ 로그인 실패');
    }
  });

  const sendTokenToBackend = async (authCode: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/user/login/google`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json' // ✅ JSON 요청 헤더 추가
          }
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log('🎉 로그인 성공:', data);
        localStorage.setItem('accessToken', data.token);
        onChangeStep(2);
      } else if (response.status === 404) {
        console.log('⚠️ 회원가입 필요:', data);
        //navigate('/signup', {state: { email: data.email, social_id: data.social_id }});
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('❌ 백엔드 인증 실패:', error);
    }
  };

  return (
    <BlackButtonWrapper onClick={onClickLogin}>
      <GoogleIconStyled />
      <span>Sign up with Google</span>
    </BlackButtonWrapper>
  );
};

export default GoogleLoginButton;

const BlackButtonWrapper = styled.div`
  cursor: pointer;
  width: 38.6rem;
  height: 3.8rem;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.gray800};
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    width: 176px;
    color: ${({ theme }) => theme.colors.gray50};
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: -0.45px;
  }
`;

const GoogleIconStyled = styled(GoogleIcon)``;
