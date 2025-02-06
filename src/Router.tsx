import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import HeaderLayout from './components/common/HeaderLayout';

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
      }
    ]
  }
]);

export default Router;
