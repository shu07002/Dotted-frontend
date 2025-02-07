import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import HeaderLayout from './components/common/header/HeaderLayout';
import FAQPage from './pages/tips/FAQPage';

const Router = createBrowserRouter([
  {
    path: '/',
    // errorElement:
    element: (
      <ProtectedRoute>
        <HeaderLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <MainPage />
      },

      { path: 'tips/faq', element: <FAQPage /> }
    ]
  },
  {
    path: 'sign-up',
    element: <SignUpPage />
  }
]);

export default Router;
