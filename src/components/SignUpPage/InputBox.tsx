import React, { ReactNode } from 'react';
import styled from 'styled-components';

export default function InputBox({ children }: { children: ReactNode }) {
  return <InputWrapper>{children}</InputWrapper>;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  margin-bottom: 1.7rem;
  flex-shrink: 0;
  width: 100%;
`;
