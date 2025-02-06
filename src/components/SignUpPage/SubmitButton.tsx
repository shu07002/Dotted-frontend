import React from 'react';
import styled from 'styled-components';

interface SubmitButtonProps {
  onChangeStep: () => void;
}

export default function SubmitButton({ onChangeStep }: SubmitButtonProps) {
  return (
    <SubmitButtonWrapper onClick={onChangeStep}>Submit</SubmitButtonWrapper>
  );
}

const SubmitButtonWrapper = styled.button`
  cursor: pointer;
  margin-top: 2.6rem;
  margin-bottom: 15.5rem;
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: none;
  background: var(--Purple-Purple_light-purple-600_light, #9678d3);
  color: var(--Gray-Gray_light-gray-50_light, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 180% */
  letter-spacing: -1px;
`;
