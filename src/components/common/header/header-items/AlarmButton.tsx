import styled from 'styled-components';
import AlramIcon from '@/assets/icons/header/alarm.svg?react';

export default function AlarmButton() {
  return (
    <AlarmBox>
      <AlramIcon />
      <p></p>
    </AlarmBox>
  );
}

const AlarmBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  padding: 1rem;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  }

  > svg {
    width: 2.4rem;
    height: 2.4rem;

    path {
      fill: ${({ theme }) => theme.colors.gray700};
    }
  }

  > p {
    width: 9px;
    height: 9px;
    position: absolute;
    top: 0.9rem;
    right: 0.7rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.purple600};
    border: 2px solid ${({ theme }) => theme.colors.backgroundLayer2};
  }
`;
