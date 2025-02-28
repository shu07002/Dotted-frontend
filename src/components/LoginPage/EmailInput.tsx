import { UseFormRegister } from 'react-hook-form';
import styled from 'styled-components';
import { LoginProps } from './LoginForm';

interface EmailInputProps {
  register: UseFormRegister<LoginProps>;
}

export default function EmailInput({ register }: EmailInputProps) {
  return (
    <EmailInputWrapper
      placeholder="Email(ID)"
      type="email"
      {...register('email', { required: 'Plaese write down your email' })}
    />
  );
}

const EmailInputWrapper = styled.input`
  padding-left: 2.3rem;
  width: 100%;
  height: 5rem;

  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.backgroundLayer2};

  color: ${({ theme }) => theme.colors.gray400};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
