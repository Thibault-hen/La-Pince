import { useTranslation } from 'react-i18next';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { PageMeta } from '@/components/PageMeta';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        titleKey="privacy.meta.title"
        descriptionKey="privacy.meta.description"
      />
      <DefaultWrapper>
        <div className="w-full place-items-center ">
          <Header />
          <main>
            <div className="container mx-auto px-4 pt-16 pb-8">
              <h1 className="text-3xl font-bold mb-4">{t('privacy.title')}</h1>
              <p className="text-gray-300 mb-4">{t('privacy.introduction')}</p>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section1.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section1.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section2.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section2.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section3.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section3.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section4.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section4.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section5.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section5.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('privacy.section6.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('privacy.section6.content')}
                </p>
              </section>
            </div>
          </main>
          <Footer />
        </div>
      </DefaultWrapper>
    </>
  );
};

export default PrivacyPolicy;
