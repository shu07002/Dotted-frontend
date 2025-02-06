import React from 'react';
import styled from 'styled-components';
import AgreeItem from './AgreeItem';

interface AgreeBoxProps {
  onChangeCheckedTos: () => void;
  onChangeCheckedPP: () => void;
  isCheckedTOS: boolean;
  isCheckedPP: boolean;
}

export default function AgreeBox({
  onChangeCheckedTos,
  onChangeCheckedPP,
  isCheckedTOS,
  isCheckedPP
}: AgreeBoxProps) {
  return (
    <AgreeBoxContainer>
      <AgreeItem
        text="Agree to Dotted’s Terms of Service"
        link="/"
        onChangeChecked={onChangeCheckedTos}
        ischecked={isCheckedTOS}
      />
      <AgreeItem
        text="Acknowledge Dotted’s privacy policy"
        link="/"
        onChangeChecked={onChangeCheckedPP}
        ischecked={isCheckedPP}
      />
    </AgreeBoxContainer>
  );
}

const AgreeBoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.9rem;
`;
