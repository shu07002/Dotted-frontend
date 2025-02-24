import styled from 'styled-components';
import HeaderNav from './header-items/HeaderNav';
import AlarmButton from './header-items/AlarmButton';
import ProfileButton from './header-items/ProfileButton';
import LanguageButton from './header-items/LanguageButton';
import { useEffect, useState } from 'react';
import SubHeader from './SubHeader';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { isTokenExpired, refreshAccessToken } from '@/utils/auth';

export interface NotiList {
  id: number;
  notification_type: string;
  actor: number;
  content: string;
  related_id: number;
  created_at: string;
  is_read: boolean;
  redirect_url: {
    redirect_url: string;
    method: string;
    token_required: string;
  };
}

export interface AllInfoNotification {
  unread_count: number;
  list: NotiList[];
}

export default function Header({ scrollY }: { scrollY: number }) {
  const navigate = useNavigate();
  const [hoveredTab, setHoveredTab] = useState<string>('');
  const [notice, setNotice] = useState<AllInfoNotification | null>(null);
  const isLogined = () => {
    if (localStorage.getItem('accessToken')) return true;
    else return false;
  };

  // ...

  useEffect(() => {
    const setupSSE = async () => {
      let accessToken = localStorage.getItem('accessToken');
      if (isTokenExpired(accessToken)) {
        try {
          await refreshAccessToken();
          accessToken = localStorage.getItem('accessToken');
        } catch (error) {
          console.error('토큰 갱신 실패:', error);
          return;
        }
      }

      const EventSourceConstructor = EventSourcePolyfill || NativeEventSource;
      const evtSource = new EventSourceConstructor(
        `${import.meta.env.VITE_API_DOMAIN}/notification/stream`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true
        }
      );

      evtSource.onmessage = (event) => {
        try {
          const newEvent = JSON.parse(event.data);
          setNotice((prev) => {
            if (prev === null) return newEvent;
            return { ...prev, list: [newEvent.list[0], ...prev.list] };
          });
        } catch (err) {
          console.error('이벤트 데이터 파싱 에러:', err);
        }
      };

      evtSource.onerror = async (err) => {
        console.error('SSE 에러:', err);
        evtSource.close();
        // 일정 시간 후 재연결 시도
        setTimeout(setupSSE, 1000);
      };

      return () => {
        evtSource.close();
        console.log('SSE 연결 종료');
      };
    };

    setupSSE();
  }, []);

  return (
    <HeaderContainer onMouseLeave={() => setHoveredTab('')}>
      <UpWrapper $scrollY={scrollY}>
        <LeftSection>
          <Logo onClick={() => navigate('/')}>
            <img src="/logo.svg" alt="logo" />
            <span>Dotted</span>
          </Logo>
          <HeaderNav setHoveredTab={setHoveredTab} />
        </LeftSection>
        <RightSection onMouseEnter={() => setHoveredTab('')}>
          {isLogined() ? (
            <>
              <AlarmButton notice={notice} />
              <ProfileButton />
              <LanguageButton />
            </>
          ) : (
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          )}
        </RightSection>
      </UpWrapper>
      <SubHeader hoveredTab={hoveredTab} />
    </HeaderContainer>
  );
}

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.colors.purple600};
  padding: 0.7rem 1.5rem;
  border-radius: 2.4rem;
  color: ${({ theme }) => theme.colors.gray50};
  text-align: center;
  font-family: Inter;
  font-size: 2.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.07rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple450};
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const UpWrapper = styled.div<{ $scrollY: number }>`
  width: 100vw;
  height: 8rem;
  /* background-color: ${({ theme, $scrollY }) =>
    $scrollY > 0
      ? theme.colors.backgroundLayer2
      : theme.colors.backgroundLayer2}; */
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  color: ${({ theme }) => theme.colors.gray700};
  display: flex;
  justify-content: space-between;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8rem;
  height: 100%;
  width: 50%;
  margin-left: 9.1rem;
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  height: 100%;
  margin-right: 9.1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 2.1rem;
  letter-spacing: -2.16px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  > img {
    width: 3.5rem;
    height: 3.5rem;
    flex-shrink: 0;
  }
`;
