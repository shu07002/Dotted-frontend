interface IRequestInit {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
}

class Network {
  // 토큰 재발급 여부
  private isRefreshing = false;
  // 재발급 요청에 대한 Promise 객체
  private refreshTokenPromise: Promise<{ accessToken: string }> | null = null;

  // 실제 토큰은 인스턴스 프로퍼티로 관리하지 않음
  private accessToken = localStorage.getItem('accessToken');
  private refreshToken = localStorage.getItem('refreshToken');

  async request(requestInit: IRequestInit) {
    try {
      const { url, ...requestOptions } = requestInit;

      const response = await fetch(url, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      if (response.ok) return response;

      if (response.status === 401) {
        return this.handleExpiredAccessToken(requestInit);
      }

      throw new Error(response.statusText);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // 토큰 만료 시 토큰 재발급 후 기존 요청 재시도
  private async handleExpiredAccessToken(requestInit: IRequestInit) {
    try {
      const { url, ...requestOptions } = requestInit;

      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenPromise = this.getReIssuedAccessToken();

        const { accessToken: reIssuedAccessToken } =
          await this.refreshTokenPromise;
        this.accessToken = reIssuedAccessToken;

        this.isRefreshing = false;
      } else if (this.refreshTokenPromise) {
        await this.refreshTokenPromise;
      }

      // ✅ 새 Access Token을 적용한 후 원래 요청을 다시 시도
      const retryResponse = await fetch(url, {
        ...requestOptions,
        headers: {
          ...requestOptions.headers,
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      if (!retryResponse.ok) throw new Error(retryResponse.statusText);

      return retryResponse;
    } catch (error: any) {
      console.error('Token refresh failed, logging out...', error);
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new Error(error.message);
    }
  }

  // Refresh Token을 이용해 새로운 Access Token 발급
  private async getReIssuedAccessToken() {
    try {
      const response = await fetch('/user/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: this.refreshToken })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json(); // { accessToken: 'new-token' }

      // ✅ 새 Access Token을 저장 (localStorage & this.accessToken)
      localStorage.setItem('accessToken', data.accessToken);
      this.accessToken = data.accessToken;

      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new Network();
