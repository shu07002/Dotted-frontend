// auth.ts

/**
 * Refresh Token을 이용해 새 accessToken, refreshToken을 발급받는 함수
 */
export async function refreshAccessToken(): Promise<void> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_DOMAIN}/user/refresh`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: refreshToken })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  // 서버에서 내려주는 필드명에 맞게 수정
  localStorage.setItem('accessToken', data.access);
}

/**
 * 인증이 필요한 요청을 보낼 때 사용되는 함수
 * - 요청 전 Authorization 헤더에 accessToken 추가
 * - 401 응답 시 refreshAccessToken() 호출 후 재요청
 */
export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  let accessToken = localStorage.getItem('accessToken');

  let finalOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      // Content-Type이 이미 있다면 그대로 사용
      'Content-Type':
        (options.headers as Record<string, string>)?.['Content-Type'] ||
        'application/json'
    }
  };

  let response = await fetch(url, finalOptions);

  if (response.status === 401) {
    try {
      // 토큰 재발급 시도
      await refreshAccessToken();
      accessToken = localStorage.getItem('accessToken');

      finalOptions = {
        ...finalOptions,
        headers: {
          ...finalOptions.headers,
          Authorization: `Bearer ${accessToken}`
        }
      };

      response = await fetch(url, finalOptions);
    } catch (error) {
      // 재발급 실패 시 추가 처리 (예: 로그아웃)
      throw new Error('Token refresh failed, please login again.');
    }
  }

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json() as Promise<T>;
}
