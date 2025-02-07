import React from 'react';
import styled from 'styled-components';

export default function EmailInput() {
  return <EmailInputWrapper placeholder="Email(ID)" type="email" />;
}

const EmailInputWrapper = styled.input`
  margin-bottom: 2.1rem;
  padding-left: 2.3rem;
  width: 60.5rem;
  height: 5rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  background: ${({ theme }) => theme.colors.backgroundLayer2};

  color: ${({ theme }) => theme.colors.gray400};
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px; /* 180% */
  letter-spacing: -0.6px;
`;
