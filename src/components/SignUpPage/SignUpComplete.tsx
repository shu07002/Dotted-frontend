import styled from 'styled-components';
import ArrowSVG from '@/assets/svg/SignUpPage/ArrowSVG.svg?react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function SignUpComplete() {
  const navigate = useNavigate();

  return (
    <SignUpCompleteContainer>
      <Wrapper>
        <ImgWrapper>
          <img
            src="src/assets/gif/SignUpPage/logo-motion.gif"
            alt="Logo Animation"
          />
        </ImgWrapper>

        <Text>Sign Up Complete !</Text>

        <ToLoginButton onClick={() => navigate('/login')}>
          Go to Log In
          <ArrowSVG />
        </ToLoginButton>
      </Wrapper>
    </SignUpCompleteContainer>
  );
}

const SignUpCompleteContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 60.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 7.5rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3.5rem;
  img {
    width: 16.4rem;
  }
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.gray700};
  margin-bottom: 8.3rem;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px; /* 150% */
  letter-spacing: -1.2px;
`;

const ToLoginButton = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: 5rem;
  color: ${({ theme }) => theme.colors.gray50};
  margin-bottom: 11.3rem;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;

  border: none;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.purple600};
`;
