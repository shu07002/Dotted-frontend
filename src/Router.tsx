import { createBrowserRouter, Outlet } from 'react-router-dom';
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
import Footer from './components/common/Footer';
import Google from './pages/Google';
import SignUpGoogle from './components/SignUpPage/SignUpGoogle';

const Router = createBrowserRouter([
  {
    path: '/',
    // errorElement:
    element: (
      <ProtectedRoute>
        <HeaderLayout />
        <Outlet />
        {/*📌HeaderLayout안에 Outlet이 있는 것보다 밖에 있는게 더 직관적인거 같아서 밖으로 뺐습니다!*/}
        <Footer />
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
      },
      {
        path: 'tips/culture/:cultureId',
        element: <CultureDetailPage />
      },
      {
        path: 'community',
        children: [
          { path: '', element: <CommunityPage /> },
          { path: 'write', element: <WriteCommunityPage /> },
          { path: 'detail/:id', element: <DetailCommunityPage /> }
        ]
      }
    ]
  },

  {
    path: 'sign-up',
    children: [
      { path: '', element: <SignUpPage /> },
      { path: 'google', element: <SignUpGoogle /> }
    ]
  },
  {
    path: 'login',
    children: [
      { path: '', element: <LoginPage /> },
      { path: 'forgetpass', element: <ForgetPassPage /> },
      { path: 'google/callback', element: <Google /> }
    ]
  },
  {
    path: 'user/login/google/callback',
    element: <Google />
  }
]);

export default Router;
