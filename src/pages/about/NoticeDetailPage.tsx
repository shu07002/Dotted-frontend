import styled from 'styled-components';
import BackIcon from '@/assets/svg/about/notice/back.svg?react';
import { useNavigate } from 'react-router-dom';
export default function NoticeDetailPage() {
  const navigate = useNavigate();
  return (
    <Main>
      <BackIcon onClick={() => navigate(-1)} />
      <Header>
        <h1>{'📢 [Dotted Beta Period & Verification Notice]'}</h1>
        <span>{'01/03/2025'}</span>
      </Header>
      <Section>
        <p>
          📢 [Dotted Beta Period & Verification Notice]
          <br /> 📅 Beta Period: March 1st – March 21st
          <br /> Dotted is a private community exclusively for verified Sogang
          students. To fully access the Community and Market, you need to verify
          that you are a Sogang University student.
          <br /> 🔓 [Beta Period: Free Access] Until March 22nd, you can freely
          access the Community and Market without verification. <br />
          🔒 [After March 22nd: Verification Required] Starting March 23rd, only
          verified Sogang students will have full access to the Community and
          Market. <br />
          📝 How to Verify?
          <br />
          1.Sign up with your Sogang email to complete registration and student
          verification simultaneously!
          <br />
          2.If you don’t register with a Sogang email, upload a photo of your
          student ID or SAINT portal screenshot (only name & school name
          visible) in mypage → school verification
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
    line-height: 4rem;
    color: ${({ theme }) => theme.colors.gray800};
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
