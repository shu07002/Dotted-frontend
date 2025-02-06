import styled from 'styled-components';

interface SogangSignUpButtonProps {
  onChangeStep: () => void;
  onChangeIsSogangEmail: () => void;
}

export default function SogangSignUpButton({
  onChangeStep,
  onChangeIsSogangEmail
}: SogangSignUpButtonProps) {
  const onClickSignUpButton = () => {
    onChangeStep();
    onChangeIsSogangEmail();
  };
  return (
    <SignUpButtonBox onClick={onClickSignUpButton}>
      <SignUpText>Sign up with Sogang Email</SignUpText>
    </SignUpButtonBox>
  );
}

const SignUpButtonBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 386px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 24px;
  background: linear-gradient(90deg, #44287c 27.87%, #9678d3 98.12%);
`;

const SignUpText = styled.p`
  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.6px;
`;
