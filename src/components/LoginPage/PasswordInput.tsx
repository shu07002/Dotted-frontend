import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { LoginProps } from './LoginForm';

interface PasswordInputProps {
  eyeOn: boolean;
  register: UseFormRegister<LoginProps>;
}

export default function PasswordInput({ eyeOn, register }: PasswordInputProps) {
  return (
    <PasswordInputWrapper
      placeholder="Password"
      type={eyeOn ? 'text' : 'password'}
      {...register('password', { required: 'Plaese write down your password' })}
    />
  );
}

const PasswordInputWrapper = styled.input`
  padding-left: 2.3rem;
  width: 100%;
  height: 5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.backgroundLayer2};

  color: var(--Gray-Gray_light-gray-400_light, #b1b1b1);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
