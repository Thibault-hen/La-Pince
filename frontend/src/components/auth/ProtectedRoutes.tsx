import { useAuthUser } from '@/hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const { authUser, status } = useAuthUser();
  console.log('user', authUser);
  if (status === 'pending') return null;

  if (!authUser) return <Navigate to="/connexion" replace />;

  return <Outlet />;
};
