import { useMutation } from '@tanstack/react-query';

// API 응답 타입
interface PasswordResetResponse {
  status: number;
  success: boolean;
  message?: string;
}

// API 에러 타입
interface ApiError {
  message: string;
}

const sendPasswordResetEmail = async (
  email: string
): Promise<PasswordResetResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/user/password-reset/email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }
  );

  const status = response.status; // ✅ HTTP 상태 코드 저장

  if (!response.ok) {
    const errorData = (await response.json()) as ApiError;
    throw new Error(
      errorData.message || `Request failed with status ${status}`
    );
  }

  const data = (await response.json()) as Omit<PasswordResetResponse, 'status'>;
  return { status, ...data }; // ✅ 상태 코드 포함해서 반환
};

// ✅ `onSuccess`를 옵션으로 받도록 설정
export const usePasswordResetEmail = (
  onSuccess?: (data: PasswordResetResponse) => void
) => {
  return useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess // ✅ 요청이 성공하면 실행
  });
};
