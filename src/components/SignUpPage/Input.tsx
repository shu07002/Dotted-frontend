import styled from 'styled-components';

interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
}

export default function Input({ name, type, placeholder }: InputProps) {
  return <InputWrapper name={name} type={type} placeholder={placeholder} />;
}

const InputWrapper = styled.input`
  padding-left: 2.3rem;
  display: flex;
  width: 100%;

  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid var(--Gray-Gray_light-gray-300_light, #d5d5d5);
  background: var(--Gray-Gray_light-gray-100_light, #f8f8f8);

  color: var(--Gray-Gray_light-gray-400_light, #b1b1b1);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
