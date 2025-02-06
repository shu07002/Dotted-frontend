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
<<<<<<< HEAD
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
=======
  width: 100dvw;
  height: 100dvh;
  overflow-x: hidden;
>>>>>>> f5e0efe0daa0c801f519edd7269e303792e27149
`;
