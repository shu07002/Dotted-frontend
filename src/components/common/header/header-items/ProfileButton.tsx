import ProfileIcon from '@/assets/icons/header/profile.svg?react';
import DownIcon from '@/assets/icons/header/down.svg?react';
import styled from 'styled-components';
import { useEffect } from 'react';

export default function ProfileButton() {
  useEffect(() => {}, []);

  return (
    <ProfileBox>
      <ProfileIcon />
      <span>{'STAR88'}</span>
      <DownIcon />
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  cursor: pointer;
  padding: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLayer1};
  }

  > svg {
    &:first-child {
      width: 2.7rem;
      height: 2.7rem;
    }

    &:last-child {
      width: 1.8rem;
      height: 0.9rem;
      path {
        stroke: ${({ theme }) => theme.colors.gray700};
      }
    }
  }

  > span {
    margin-left: 1.2rem;
    margin-right: 0.3rem;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    letter-spacing: -0.16px;
  }
`;
