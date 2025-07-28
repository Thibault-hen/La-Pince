import i18n from '@/i18n';

export const getLocale = (): string => {
  switch (i18n.language) {
    case 'fr':
      return 'fr-FR';
    case 'en':
      return 'en-US';
    default:
      return navigator.language || 'fr-FR';
  }
};
