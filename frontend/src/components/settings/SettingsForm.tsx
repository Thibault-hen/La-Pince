import { Settings  } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import type { User as UserType } from '@/services/auth';
import { Profile } from '../profile/Profile';
import { Security } from '../profile/Security';

export const SettingsForm = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserType>(['authUser']);

  return (
    <>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Settings className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Paramètres du compte</h1>
          <p className="text-sm text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="dark:bg-primary border rounded-xl">
          <Profile userData={userData?.user} />
        </div>
        <Security />
      </div>
    </>
  );
};
