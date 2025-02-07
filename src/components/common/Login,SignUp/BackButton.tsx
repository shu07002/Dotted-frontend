import styled from 'styled-components';
import BackButtonSVG from '@/assets/svg/SignUpPage/BackButtonSVG.svg?react';
import { useTheme } from '@/context/ThemeContext';

export default function BackButton() {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <BackButtonWrapper>
      <BackButtonComponent onClick={() => console.log('ASdasd')} />
      <button onClick={() => toggleTheme()}>지금은 {themeMode}</button>
    </BackButtonWrapper>
  );
}

const BackButtonWrapper = styled.div`
  padding: 7rem 0 0 10rem;
  position: relative;
`;
const BackButtonComponent = styled(BackButtonSVG)`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;
