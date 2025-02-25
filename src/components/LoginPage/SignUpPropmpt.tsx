import styled from 'styled-components';
import Arrow from '@/assets/svg/SignUpPage/ArrowSVG.svg?react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPropmpt() {
  const navigate = useNavigate();
  return (
    <SignUpPropmpWrapper>
      <Text>Don't have an account?</Text>
      <GoToSignUp onClick={() => navigate('/sign-up')}>
        Sign Up <ArrowStyled />
      </GoToSignUp>
    </SignUpPropmpWrapper>
  );
}

const SignUpPropmpWrapper = styled.div`
  display: flex;
  gap: 2.1rem;
  margin-bottom: 25rem;

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const Text = styled.span`
  color: ${({ theme }) => theme.colors.gray700};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const GoToSignUp = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple600};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.8px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.purple600};
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  @media (max-width: 400px) {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
  }
`;

const ArrowStyled = styled(Arrow)`
  path {
    fill: ${({ theme }) => theme.colors.purple600};
  }
`;
