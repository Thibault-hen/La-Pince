import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { fr } from './locales/fr/translation';
import { en } from './locales/en/translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
  });

export default i18n;
