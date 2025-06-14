import { type ReactNode } from 'react';
import { MainLoader } from '@/components/ui/MainLoader';
import { useAuthUser } from '@/hooks/use-auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="dark:bg-primary min-h-screen ">
        <MainLoader />
      </div>
    );
  }

  return <>{children}</>;
};
