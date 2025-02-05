import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

const Router = createBrowserRouter([
  {
    path: '/',
    // errorElement:
    // element:
    children: [
      {
        path: '',
        element: <MainPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  }
]);

export default Router;
