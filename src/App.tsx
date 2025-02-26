import styled from 'styled-components';
import { GlobalStyles } from './style/GlobalStyles';
import Router from './Router';
import { RouterProvider } from 'react-router-dom';
import { GlobalThemeProvider } from './context/ThemeContext';
import ReactQueryProvider from './context/ReactQueryProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ReactQueryProvider>
        <GlobalThemeProvider>
          <AppContainer>
            <GlobalStyles />
            <RouterProvider router={Router} />
          </AppContainer>
        </GlobalThemeProvider>
      </ReactQueryProvider>
    </DndProvider>
  );
}

export default App;

const AppContainer = styled.div`
  overflow-x: hidden;

  background-color: ${({ theme }) => theme.colors.backgroundLayer2};
`;
