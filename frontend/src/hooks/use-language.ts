import { useTranslation } from 'react-i18next';
import enFlag from '@/assets/flags/en.svg';
import frFlag from '@/assets/flags/fr.svg';

type Languages = {
  code: string;
  name: string;
  flag: string;
};

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'fr', name: 'Français', flag: frFlag },
    { code: 'en', name: 'English', flag: enFlag },
  ] as Languages[];

  return {
    changeLanguage,
    currentLanguage,
    languages,
  };
};
