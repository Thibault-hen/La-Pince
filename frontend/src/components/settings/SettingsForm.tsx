import { Settings } from 'lucide-react';
import { Profile } from '../profile/Profile';
import { Security } from '../profile/Security';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/stores/authStore';

export const SettingsForm = () => {
  const user = useAtomValue(userAtom);
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-color/10 border border-primary-color/20 rounded-lg">
          <Settings className="h-5 w-5 text-primary-color" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('account.header.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('account.header.subtitle')}</p>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="dark:bg-primary border rounded-xl">
          <Profile user={user} />
        </div>
        <Security />
      </div>
    </>
  );
};
