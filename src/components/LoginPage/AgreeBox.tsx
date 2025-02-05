import React from 'react';
import styled from 'styled-components';
import AgreeItem from './AgreeItem';

export default function AgreeBox() {
  return (
    <AgreeBoxContainer>
      <AgreeItem text="Agree to Dotted’s Terms of Service" link="/" />
      <AgreeItem text="Acknowledge Dotted’s privacy policy" link="/" />
    </AgreeBoxContainer>
  );
}

const AgreeBoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
`;
