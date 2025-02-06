import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';

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
        path: 'sign-up',
        element: <SignUpPage />
      }
    ]
  }
]);

export default Router;
