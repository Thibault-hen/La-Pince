import { useTranslation } from 'react-i18next';

export const ServerErrorBanner = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 bg-gradient-to-r from-red-500/5 via-red-500/20 to-red-500/50 border-b border-red-500 text-sm text-center p-1 w-full">
      <span className="dark:text-white text-red-500 font-bold dark:font-normal">
        {t('home.banner.serverError')}
      </span>
    </div>
  );
};
