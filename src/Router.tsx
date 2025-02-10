import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import HeaderLayout from './components/common/header/HeaderLayout';
import FAQPage from './pages/tips/FAQPage';
import RestaurantPage from './pages/tips/RestaurantPage';
import HospitalPage from './pages/tips/HospitalPage';
import ClubsPage from './pages/tips/ClubsPage';
import CulturePage from './pages/tips/culture/CulturePage';
import SogangMapPage from './pages/tips/SogangMapPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ForgetPassPage from './pages/ForgetPassPage';
import CultureDetailPage from './pages/tips/culture/CultureDetailPage';
import CommunityPage from './pages/community/CommunityPage';
import WriteCommunityPage from './pages/community/WriteCommunityPage';
import DetailCommunityPage from './pages/community/DetailCommunityPage';
import EditProfilePage from './pages/mypage/EditProfilePage';
import MyPageLayout from './components/mypage/MyPageLayout';

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
        path: 'tips',
        children: [
          {
            path: 'sogang-map',
            element: <SogangMapPage />
          },
          {
            path: 'restaurant',
            element: <RestaurantPage />
          },
          {
            path: 'hospital',
            element: <HospitalPage />
          },
          {
            path: 'faq',
            element: <FAQPage />
          },
          {
            path: 'clubs',
            element: <ClubsPage />
          },
          {
            path: 'culture',
            element: <CulturePage />
          },
          {
            path: 'culture/:cultureId',
            element: <CultureDetailPage />
          }
        ]
      },
      {
        path: 'community',
        children: [
          { path: '', element: <CommunityPage /> },
          { path: 'write', element: <WriteCommunityPage /> },
          { path: 'detail/:id', element: <DetailCommunityPage /> }
        ]
      },
      {
        path: 'mypage',
        element: <MyPageLayout />,
        children: [
          {
            path: 'profile',
            element: <EditProfilePage />
          }
        ]
      }
    ]
  },

  {
    path: 'sign-up',
    element: <SignUpPage />
  },
  {
    path: 'login',
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'forgetpass', element: <ForgetPassPage /> }
    ]
  }
]);

export default Router;
