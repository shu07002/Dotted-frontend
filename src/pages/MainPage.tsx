import { useTheme } from '@/context/ThemeContext';
import styled from 'styled-components';

export default function MainPage() {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <Main>
      <button onClick={() => toggleTheme()}>지금은 {themeMode}</button>
    </Main>
  );
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.purple1000};
  button {
    width: 100px;
    height: 50px;
    background-color: ${({ theme }) => theme.colors.purple450};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;
