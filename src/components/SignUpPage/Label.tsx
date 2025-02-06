import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LabelProps {
  children: ReactNode;
  name: string;
}

export default function Label({ children, name }: LabelProps) {
  return <LabelWrapper htmlFor={name}>{children}</LabelWrapper>;
}

const LabelWrapper = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
  color: var(--Gray-Gray_light-gray-600_light, #6c6c6c);
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 200% */
  letter-spacing: -0.9px;
`;
