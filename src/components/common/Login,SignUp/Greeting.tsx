import Logo from '../Logo';
import styled from 'styled-components';

interface GreetingProps {
  text: string;
}

export default function Greeting({ text }: GreetingProps) {
  return (
    <>
      <Logo />
      <WelcomeText>{text}</WelcomeText>
    </>
  );
}

const WelcomeText = styled.h1`
  color: ${({ theme }) => theme.colors.gray900};
  text-align: center;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.2rem;
  margin-bottom: 5.7rem;
`;
