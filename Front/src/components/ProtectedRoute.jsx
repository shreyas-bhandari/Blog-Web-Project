import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('blog_token');

  if (!token) {
    return <Navigate to="/blog/Login" replace />;
  }

  // Any authenticated user can access child routes (like the Dashboard)
  return <Outlet />;
}
