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
import MarketPage from './pages/market/MarketPage';
import WriteMarketPage from './pages/market/WriteMarketPage';
import DetailMarketPage from './pages/market/DetailMarketPage';
import NotificatoinPage from './pages/NotificatoinPage';
import OnboardingPage from './pages/about/OnboardingPage';
import NoticePage from './pages/about/NoticePage';
import EditProfilePage from './pages/mypage/EditProfilePage';
import MyPageLayout from './components/mypage/MyPageLayout';
import VerificationPage from './pages/mypage/VerificationPage';
import MyPostsPage from './pages/mypage/MyPostsPage';
import MyCommentsPage from './pages/mypage/MyCommentsPage';
import MyScrapsPage from './pages/mypage/MyScrapsPage';
import NoticeDetailPage from './pages/about/NoticeDetailPage';

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
          { path: 'detail/:id', element: <DetailCommunityPage /> },
          { path: 'detail/:id/edit', element: <WriteCommunityPage /> }
        ]
      },
      {
        path: 'market',
        children: [
          {
            path: '',
            element: <MarketPage />
          },
          {
            path: 'write',
            element: <WriteMarketPage />
          },
          { path: 'detail/:id', element: <DetailMarketPage /> },
          { path: 'detail/:id/edit', element: <WriteMarketPage /> }
        ]
      },
      {
        path: 'notification',
        element: <NotificatoinPage />
      },
      {
        path: 'about',
        children: [
          { path: 'onboarding', element: <OnboardingPage /> },
          { path: 'notice', element: <NoticePage /> },
          { path: 'notice/:id', element: <NoticeDetailPage /> }
        ]
      },
      {
        path: 'mypage',
        element: <MyPageLayout />,
        children: [
          {
            path: 'profile',
            element: <EditProfilePage />
          },
          {
            path: 'verification',
            element: <VerificationPage />
          },
          {
            path: 'posts',
            element: <MyPostsPage />
          },
          {
            path: 'comments',
            element: <MyCommentsPage />
          },
          {
            path: 'scraps',
            element: <MyScrapsPage />
          }
        ]
      },
      {
        path: 'mypage',
        element: <MyPageLayout />,
        children: [
          {
            path: 'profile',
            element: <EditProfilePage />
          },
          {
            path: 'verification',
            element: <VerificationPage />
          },
          {
            path: 'posts',
            element: <MyPostsPage />
          },
          {
            path: 'comments',
            element: <MyCommentsPage />
          },
          {
            path: 'scraps',
            element: <MyScrapsPage />
          }
        ]
      }
    ]
  },

  {
    path: 'sign-up',
    children: [{ path: '', element: <SignUpPage /> }]
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
