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
import ArrowDown from '@/assets/svg/tips/faq/arrow.svg?react';

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
  const [isOpen, setIsOpen] = useState(false);

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
        `${import.meta.env.VITE_API_DOMAIN}/api/notification/stream`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true
        }
      );

      //console.log('SSE 연결됨:', evtSource);

      evtSource.onmessage = (event) => {
        try {
          const newEvent = JSON.parse(event.data);
          console.log(newEvent);
          setNotice((prev) => {
            if (prev === null) return newEvent;
            return { ...prev, list: [newEvent.list[0], ...prev.list] };
          });
        } catch (err) {
          console.error('이벤트 데이터 파싱 에러:', err);
        }
      };

      evtSource.onerror = async () => {
        //console.error('SSE 에러:', err);
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
          <HeaderNavWrapper>
            <HeaderNav setHoveredTab={setHoveredTab} />
          </HeaderNavWrapper>
          <ArrowWrapper onClick={() => setIsOpen((prev) => !prev)}>
            <ArrowDown />
          </ArrowWrapper>
        </LeftSection>
        <RightSection onMouseEnter={() => setHoveredTab('')}>
          {isLogined() ? (
            <>
              <AlarmButton notice={notice} />
              <ProfileButton />
              {/* <LanguageButton /> */}
            </>
          ) : (
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          )}
        </RightSection>
      </UpWrapper>
      {isOpen && (
        <MobileNav>
          <HeaderNav setHoveredTab={setHoveredTab} />
        </MobileNav>
      )}
      <SubHeader hoveredTab={hoveredTab} />
    </HeaderContainer>
  );
}

const HeaderNavWrapper = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

const MobileNav = styled.nav`
  width: 100%;
  padding: 0 7.7rem;

  display: none;
  @media (max-width: 900px) {
    display: block;
  }

  @media (max-width: 700px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`;

const ArrowWrapper = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 920px) {
    display: block;
  }
`;

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
  padding: 0 7.7rem;

  @media (max-width: 700px) {
    padding-right: 2rem;
    padding-left: 2rem;
  }
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const UpWrapper = styled.div<{ $scrollY: number }>`
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
`;

const RightSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  height: 100%;
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
