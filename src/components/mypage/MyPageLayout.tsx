import { Outlet } from 'react-router-dom';

export default function MyPageLayout() {
  return (
    <div>
      <h1>MyPage Layout</h1>
      <Outlet />
    </div>
  );
}
