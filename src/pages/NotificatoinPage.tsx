import styled from 'styled-components';
import Trashcan from '@/assets/svg/Notification/Trashcan.svg?react';
import Bell from '@/assets/svg/Notification/Bell.svg?react';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

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
    const RunSSE = () => {
      if (!localStorage.getItem('accessToken')) return;
      const EventSource = EventSourcePolyfill || NativeEventSource;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      };
      const evtSource = new EventSource(
        `${import.meta.env.VITE_API_URL}/notification/stream`,
        { headers: headers, withCredentials: true }
      );
      console.log('열려라 참깨!');
      console.log('참깨빵 준비 중, 순살 고기 준비 중:', evtSource);

      evtSource.onmessage = function (event) {
        try {
          console.log('Event received:', event);
          const newEvent = JSON.parse(event.data);
          console.log(newEvent);
          setNotice((prev) => {
            if (prev === null) return newEvent;

            // 기존 리스트 + 새 데이터 리스트 합치기
            const updatedList = [newEvent.list[0], ...prev.list];

            // 🔥 id 기준으로 중복 제거
            const uniqueList = Array.from(
              new Map(updatedList.map((item) => [item.id, item])).values()
            );

            return { ...prev, list: uniqueList };
          });
        } catch (err) {
          console.error('Error parsing event data:', err);
        }
      };

      evtSource.onerror = async (err) => {
        console.error('evtSource failed:', err);
        evtSource.close();
        setTimeout(RunSSE, 1000);
      };

      return () => {
        evtSource.close();
        console.log('닫혀라 참깨!!!!');
      };
    };

    return RunSSE();
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
                    <Date>{item.created_at}</Date>
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
  line-height: 3.6rem; /* 225% */
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
  line-height: 3.6rem; /* 225% */
  letter-spacing: -0.08rem;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Pretendard;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 3.6rem; /* 150% */
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
  line-height: 3.6rem; /* 225% */
  letter-spacing: -0.08rem;
`;
