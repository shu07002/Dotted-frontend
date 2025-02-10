import ProfileIcon from '@/assets/icons/header/profile.svg?react';
import DownIcon from '@/assets/icons/header/down.svg?react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import ProfileModal from '../header-modal/ProfileModal';
import { AnimatePresence } from 'framer-motion';

export default function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  function handleClick() {
    setIsModalOpen(!isModalOpen);
  }

  function handleClickOutside(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  return (
    <ProfileBox ref={modalRef} onClick={handleClick}>
      <ProfileIcon />
      <span>{'STAR88'}</span>
      <DownIcon />
      <AnimatePresence>
        {isModalOpen && (
          <ModalWrapper>
            <ProfileModal />
          </ModalWrapper>
        )}
      </AnimatePresence>
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
  position: relative;

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
        stroke: ${({ theme }) => theme.colors.gray700}!important;
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

const ModalWrapper = styled.div`
  position: absolute;
  top: 6rem;
  right: 0;
`;
