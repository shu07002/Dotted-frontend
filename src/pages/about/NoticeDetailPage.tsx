import styled from 'styled-components';
import BackIcon from '@/assets/svg/about/notice/back.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoticeList } from '@/components/about/notice/NoticeList';
export default function NoticeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const noticeData = NoticeList.find((notice) => notice.id === Number(id));
  return (
    <Main>
      <BackIcon onClick={() => navigate(-1)} />
      <Header>
        <h1>{noticeData?.title}</h1>
        <span>{noticeData?.created_at}</span>
      </Header>
      <Section>{noticeData?.content()}</Section>
    </Main>
  );
}

const Main = styled.main`
  margin: 10rem 0;
  position: relative;
  padding: 0 15vw;
  svg {
    position: absolute;
    top: 1rem;
    left: 6vw;
    cursor: pointer;
  }
  @media (max-width: 900px) {
    padding: 0 5vw 0 10vw;
    svg {
      left: 3vw;
    }
  }
`;

const Header = styled.header`
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
    color: ${({ theme }) => theme.colors.gray800};
    @media (max-width: 900px) {
      font-size: 2.4rem;
    }
  }

  span {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const Section = styled.section`
  p {
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 3rem;
    color: ${({ theme }) => theme.colors.gray800};
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
