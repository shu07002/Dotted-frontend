import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@/assets/svg/SignUpPage/GoogleIconSVG.svg?react';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code', // 🔹 auth_code 방식 사용 (백엔드에서 토큰 요청)
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
        `${import.meta.env.VITE_API_URL}/user/login/google/callback?code=${authCode}`,
        {
          method: 'GET'
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        console.log('🎉 로그인 성공:', data);
        localStorage.setItem('accessToken', data.token);
        //navigate('/dashboard'); // 🔹 로그인 성공 시 대시보드로 이동
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
    <BlackButtonWrapper onClick={() => login()}>
      <GoogleIconStyled />
      <span>Sign up with Google</span>
    </BlackButtonWrapper>
  );
};

export default GoogleLoginButton;

const BlackButtonWrapper = styled.div`
  cursor: pointer;
  width: 386px;
  height: 38px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.gray800};
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.gray50};
    font-size: 15px;
  }
`;

const GoogleIconStyled = styled(GoogleIcon)``;
