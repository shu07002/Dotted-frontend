import styled from 'styled-components';
import AlramIcon from '@/assets/icons/header/alarm.svg?react';
import { AllInfoNotification } from '../Header';
import { useNavigate } from 'react-router-dom';

interface AlarmButtonProps {
  notice: AllInfoNotification | null;
}

export default function AlarmButton({ notice }: AlarmButtonProps) {
  const navigate = useNavigate();
  return (
    <AlarmBox
      onClick={() => navigate('/notification', { state: { notice: notice } })}
    >
      <AlramIcon />
      {notice && <p></p>}
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
