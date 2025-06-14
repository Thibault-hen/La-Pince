import { useQueryClient } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '@/services/auth';

export const ProtectedRoutes = () => {
  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData<User>(['authUser']);

  const isError = queryClient.getQueryState(['authUser'])?.error;

  if (!authUser || isError) return <Navigate to="/connexion" replace />;

  return <Outlet />;
};
