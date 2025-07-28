import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

type Props = {
  titleKey: string;
  descriptionKey: string;
};

export const PageMeta = ({ titleKey, descriptionKey }: Props) => {
  const { t, i18n } = useTranslation();

  // Uncomment the following lines if you want to log the title and description in mode dev
  // console.log(t('home.meta.title'));
  // console.log(t('home.meta.description'));
  // console.log(i18n.language);

  return (
    <Helmet>
      <title>{t(titleKey)}</title>
      <meta name="description" content={t(descriptionKey)} />
      <html lang={i18n.language} />
    </Helmet>
  );
};
