import { HeaderModalAnimation } from '@/animations/framer-motion/HeaderModalAnimation';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ProfileModal() {
  const navigate = useNavigate();

  return (
    <ModalBox {...HeaderModalAnimation}>
      <List>
        <li onClick={() => navigate('/mypage/profile')}>My Page</li>
        <li>Log out</li>
      </List>
    </ModalBox>
  );
}

const ModalBox = styled(motion.div)`
  width: 18rem;
  height: 12rem;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
  border-radius: 1rem;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.11);
  z-index: 1000;
`;

const List = styled.ul`
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 0.5px;
  background-color: ${({ theme }) => theme.colors.gray300};
  overflow: hidden;

  > li {
    background-color: ${({ theme }) => theme.colors.backgroundLayer2};
    color: ${({ theme }) => theme.colors.gray700};
    padding: 0 2.1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.1rem;
    letter-spacing: -0.16px;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
    }
  }
`;
