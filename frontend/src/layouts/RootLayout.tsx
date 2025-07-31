import { BellRing, Check, CircleX } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useHealth } from '@/hooks/use-health';
import { AuthProvider } from '@/providers/AuthProvider';
import { ServerErrorBanner } from './ServerErrorBanner';

export const RootLayout = () => {
  const { error } = useHealth();

  return (
    <AuthProvider>
      {error && <ServerErrorBanner />}
      <Outlet />
      <Toaster
        icons={{
          success: <Check size={15} className="text-green-500" />,
          error: <CircleX size={15} className="text-red-500" />,
          info: <BellRing size={15} className="text-primary-color" />,
        }}
        duration={6000}
      />
    </AuthProvider>
  );
};
