import styled from 'styled-components';
import { GlobalStyles } from './style/GlobalStyles';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import { GlobalThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <GlobalThemeProvider>
      <AppContainer>
        <GlobalStyles />
        <RouterProvider router={Router} />
      </AppContainer>
    </GlobalThemeProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100dvw;
  height: 100dvh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;
