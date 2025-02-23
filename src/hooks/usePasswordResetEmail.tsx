import { useMutation, UseMutationResult } from '@tanstack/react-query';

// API 응답 타입 정의
interface PasswordResetResponse {
  success: boolean;
  message?: string;
}

// API 에러 타입 정의
interface ApiError {
  message: string;
}

const sendPasswordResetEmail = async (
  email: string
): Promise<PasswordResetResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/password-reset/email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    }
  );

  if (!response.ok) {
    const errorData = (await response.json()) as ApiError;
    throw new Error(errorData.message || 'Failed to send reset email');
  }

  console.log(response);

  return response.json();
};

export const usePasswordResetEmail = (): UseMutationResult<
  PasswordResetResponse,
  Error,
  string
> => {
  return useMutation({
    mutationFn: (email: string) => sendPasswordResetEmail(email)
  });
};
