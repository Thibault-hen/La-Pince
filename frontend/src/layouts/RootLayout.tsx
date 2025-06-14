import { Outlet } from 'react-router-dom';
import { AuthProvider } from '@/providers/AuthProvider';

export const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
