import { forwardRef } from 'react';
import styled from 'styled-components';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
}

// ✅ forwardRef를 사용하여 ref를 받을 수 있도록 수정
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, placeholder, ...rest }, ref) => {
    return (
      <InputWrapper
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);

export default Input;

const InputWrapper = styled.input`
  padding-left: 2.3rem;
  display: flex;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.gray400};
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: -0.6px;
`;
