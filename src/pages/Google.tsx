import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Google = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processGoogle = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code'); // ✅ Google에서 받은 인증 코드

      if (code) {
        console.log('✅ Google OAuth 코드 확인:', code);

        try {
          // 백엔드의 Google OAuth 처리 엔드포인트로 인증 코드 전달
          const response = await fetch(
            `${import.meta.env.VITE_API_DOMAIN}/user/login/google/callback?code=${code}`,
            {
              method: 'GET', // 백엔드는 보통 POST 요청을 기대함
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          const data = await response.json();

          if (data.message === 'login success') {
            console.log('🎉 로그인 성공:', data);
            localStorage.setItem('access_token', data.token.access_token);
            localStorage.setItem('refresh_token', data.token.refresh_token);
            navigate('/'); // 로그인 성공 후 홈으로 이동
          } else if (data.message === 'signup_required') {
            console.log('회원가입 필요:', data);
            navigate('/sign-up', {
              state: {
                email: data.email,
                name: data.name,
                social_id: data.social_id,
                login_type: data.login_type
              }
            });
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          console.error('❌ 백엔드 인증 실패:', error);
          navigate('/error'); // 오류 발생 시 에러 페이지로 이동
        }
      } else {
        console.error('❌ Google OAuth 코드 없음');
        navigate('/login'); // 코드가 없으면 로그인 페이지로 이동
      }
    };

    processGoogle();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Google 로그인 처리 중...</p>
    </div>
  );
};

export default Google;
