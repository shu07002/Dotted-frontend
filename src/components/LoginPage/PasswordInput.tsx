import React from 'react';
import styled from 'styled-components';

export default function PasswordInput() {
  return <PasswordInputWrapper placeholder="Password" />;
}

const PasswordInputWrapper = styled.input`
  margin-bottom: 3.1rem;
  padding-left: 2.3rem;
  width: 60.5rem;
  height: 5rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.backgroundLayer2};

  color: var(--Gray-Gray_light-gray-400_light, #b1b1b1);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
