import styled from 'styled-components';
import BackIcon from '@/assets/svg/about/notice/back.svg?react';
import { useNavigate } from 'react-router-dom';
export default function NoticeDetailPage() {
  const navigate = useNavigate();
  return (
    <Main>
      <BackIcon onClick={() => navigate(-1)} />
      <Header>
        <h1>{'Server Check Notice'}</h1>
        <span>{'31/01/2025'}</span>
      </Header>
      <Section>
        <p>
          {
            'We will check the server on 2025. 02. 13 02:00 a.m ~ 2025. 02. 13 04:00 a.m.Thank you for your support.  '
          }
        </p>
      </Section>
    </Main>
  );
}

const Main = styled.main`
  margin-top: 10rem;
  position: relative;
  padding: 0 15vw;
  height: 100vh;
  svg {
    position: absolute;
    top: 1rem;
    left: 6vw;
    cursor: pointer;
  }
`;

const Header = styled.header`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  h1 {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 4rem;
    color: ${({ theme }) => theme.colors.gray800};
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
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;
