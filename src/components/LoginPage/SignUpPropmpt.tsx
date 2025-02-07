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
`;

const Text = styled.span`
  color: var(--Gray-Gray_light-gray-700_light, #464646);
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
`;

const ArrowStyled = styled(Arrow)`
  path {
    fill: ${({ theme }) => theme.colors.purple600};
  }
`;
