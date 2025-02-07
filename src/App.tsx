import styled from 'styled-components';
import { GlobalStyles } from './style/GlobalStyles';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import { GlobalThemeProvider } from './context/ThemeContext';
import ReactQueryProvider from './context/ReactQueryProvider';

function App() {
  return (
    <ReactQueryProvider>
      <GlobalThemeProvider>
        <AppContainer>
          <GlobalStyles />
          <RouterProvider router={Router} />
        </AppContainer>
      </GlobalThemeProvider>
    </ReactQueryProvider>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;
