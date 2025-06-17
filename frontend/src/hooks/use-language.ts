import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ]

  return {
    changeLanguage,
    currentLanguage,
    languages,
  };
};

