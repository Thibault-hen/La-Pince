import { Helmet } from '@dr.pogodin/react-helmet';
import { useTranslation } from 'react-i18next';

type Props = {
  titleKey: string;
  descriptionKey: string;
};

export const PageMeta = ({ titleKey, descriptionKey }: Props) => {
  const { t, i18n } = useTranslation();

  return (
    <Helmet>
      <title>{t(titleKey)}</title>
      <meta name="description" content={t(descriptionKey)} />
      <html lang={i18n.language} />
    </Helmet>
  );
};
