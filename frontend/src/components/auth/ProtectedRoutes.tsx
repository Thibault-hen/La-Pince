import { useAtomValue } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';
import { authLoadingAtom, isAuthenticatedAtom } from '@/stores/authStore';

export const ProtectedRoutes = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isAuthLoading = useAtomValue(authLoadingAtom);

  if (isAuthLoading) return null;

  if (!isAuthenticated) return <Navigate to="/connexion" replace />;

  return <Outlet />;
};
