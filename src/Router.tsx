import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import HeaderLayout from './components/common/header/HeaderLayout';
import FAQPage from './pages/tips/FAQPage';
import RestaurantPage from './pages/tips/RestaurantPage';
import HospitalPage from './pages/tips/HospitalPage';
import ClubsPage from './pages/tips/ClubsPage';
import CulturePage from './pages/tips/CulturePage';
import SogangMapPage from './pages/tips/SogangMapPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

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
      {
        path: 'tips/sogang-map',
        element: <SogangMapPage />
      },
      {
        path: 'tips/restaurant',
        element: <RestaurantPage />
      },
      {
        path: 'tips/hospital',
        element: <HospitalPage />
      },
      {
        path: 'tips/faq',
        element: <FAQPage />
      },
      {
        path: 'tips/clubs',
        element: <ClubsPage />
      },
      {
        path: 'tips/culture',
        element: <CulturePage />
      }
    ]
  },

  {
    path: 'sign-up',
    element: <SignUpPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  }
]);

export default Router;
