import styled from 'styled-components';
import Trashcan from '@/assets/svg/Notification/Trashcan.svg?react';
import Bell from '@/assets/svg/Notification/Bell.svg?react';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { isTokenExpired, refreshAccessToken } from '@/utils/auth';
import { formatRelativeTime } from '@/utils/formatTime';

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

export default function NotificatoinPage() {
  const [notice, setNotice] = useState<AllInfoNotification | null>(null);

  useEffect(() => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;
    const EventSourceConstructor = EventSourcePolyfill || NativeEventSource;
    const headers = { Authorization: `Bearer ${accessToken}` };

    console.log(`${import.meta.env.VITE_API_DOMAIN}/api/notification/stream`);
    const evtSource = new EventSourceConstructor(
      `${import.meta.env.VITE_API_DOMAIN}/api/notification/stream`,
      { headers: headers, withCredentials: true }
    );

    const runSSE = async () => {
      // 토큰이 없는 경우 연결하지 않음

      // 토큰 만료 여부 체크, 만료되었다면 갱신 시도
      if (isTokenExpired(accessToken)) {
        try {
          await refreshAccessToken();
          accessToken = localStorage.getItem('accessToken');
        } catch (error) {
          console.error('토큰 갱신 실패:', error);
          return;
        }
      }

      console.log('SSE 연결됨:', evtSource);

      evtSource.onmessage = (event) => {
        try {
          console.log('Event received:', event);
          const newEvent = JSON.parse(event.data);
          setNotice((prev) => {
            if (prev === null) return newEvent;

            // 기존 리스트와 새 데이터 합치기
            const updatedList = [newEvent.list[0], ...prev.list];

            // id 기준 중복 제거
            const uniqueList = Array.from(
              new Map(updatedList.map((item) => [item.id, item])).values()
            );

            return { ...prev, list: uniqueList };
          });
        } catch (err) {
          console.error('이벤트 데이터 파싱 에러:', err);
        }
      };

      evtSource.onerror = async (err) => {
        console.error('SSE 에러:', err);
        evtSource.close();
        // 1초 후 재연결 시도
        setTimeout(runSSE, 1000);
      };

      return () => {
        evtSource.close();
        console.log('SSE 연결 종료');
      };
    };

    runSSE();

    return () => {
      evtSource.close();
      console.log('SSE 연결 종료');
    };
  }, []);

  useEffect(() => {
    console.log(notice);
  }, [notice]);

  return (
    <NotificationPageContainer>
      <Wrapper>
        <Title>
          <Bell />
          Notification
        </Title>
        <ActionButton>
          <ReadAll>Read all</ReadAll>
          <DeleteAll>Delete all</DeleteAll>
        </ActionButton>
        <NotificationListWrapper>
          <ul>
            {notice?.list.map((item, idx) => {
              return (
                <EachNotice key={idx} $isRead={item.is_read}>
                  <LeftDiv>
                    <From>{item.notification_type}</From>
                    <Content>{item.content}</Content>
                  </LeftDiv>
                  <RightDiv>
                    <DeleteButton>
                      <div>
                        <Trashcan />
                      </div>
                    </DeleteButton>
                    <Date>{formatRelativeTime(item.created_at)}</Date>
                  </RightDiv>
                </EachNotice>
              );
            })}
          </ul>
        </NotificationListWrapper>
      </Wrapper>
    </NotificationPageContainer>
  );
}

const ActionButton = styled.div`
  margin: 0.3rem 0 2.1rem 0;

  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 1rem;
  gap: 1rem;
`;

const ReadAll = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple600};
  text-align: center;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.6rem; /* 225% */
  letter-spacing: -0.048rem;
`;

const DeleteAll = styled.button`
  cursor: pointer;
  color: var(--Semantic-Negative-900, #ea3729);
  text-align: center;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.6rem;
  letter-spacing: -0.048rem;
`;

const NotificationPageContainer = styled.div`
  margin-top: 2.5rem;
  width: 100%;
  padding: 0 24.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 0 10rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 3.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 3.6rem;
  letter-spacing: -0.18rem;
`;

const NotificationListWrapper = styled.div`
  > ul {
    &:last-child {
      border-bottom: 1px solid ${({ theme }) => theme.colors.gray400};
    }
  }
`;

const EachNotice = styled.li<{ $isRead: boolean }>`
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme, $isRead }) =>
    $isRead ? theme.colors.backgroundLayer2 : theme.colors.purple100};
  border-top: 1px solid ${({ theme }) => theme.colors.gray400};
`;

const LeftDiv = styled.div``;

const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const From = styled.div`
  color: ${({ theme }) => theme.colors.purple600};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.6rem;
  letter-spacing: -0.08rem;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.6rem;
  letter-spacing: -0.12rem;
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: end;

  > div {
    cursor: pointer;
    padding: 0.5rem;

    &:hover {
      border-radius: 100%;
      background-color: ${({ theme }) => theme.colors.backgroundBase};
      > svg > g > path {
        stroke: ${({ theme }) => theme.colors.gray600};
      }
    }
  }
`;

const Date = styled.div`
  color: ${({ theme }) => theme.colors.gray400};
  text-align: right;
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.6rem;
  letter-spacing: -0.08rem;
`;
