import BackButton from '@/components/LoginPage/BackButton';
import LoginForm from '@/components/LoginPage/LoginForm';
import LoginPageLayout from '@/components/LoginPage/LoginPageLayout';

//TODO
//로그인 폼에서 체크 박스 상태 관리하기
//버튼 클릭 링크 세팅

export default function LoginPage() {
  return (
    <div>
      <LoginPageLayout />

      <BackButton />

      <LoginForm />
    </div>
  );
}
