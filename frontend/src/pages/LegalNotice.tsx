import { useTranslation } from 'react-i18next';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { PageMeta } from '@/components/PageMeta';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const LegalNotice = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta
        titleKey="legal.meta.title"
        descriptionKey="legal.meta.description"
      />
      <DefaultWrapper>
        <div className="w-full place-items-center ">
          <Header />
          <main>
            <div className="container mx-auto px-4 pt-16 pb-8">
              <h1 className="text-3xl font-bold mb-4">{t('legal.title')}</h1>
              <p className="text-gray-300 mb-4">{t('legal.introduction')}</p>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('legal.section1.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('legal.section1.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('legal.section2.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('legal.section2.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('legal.section3.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('legal.section3.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('legal.section4.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('legal.section4.content')}
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold mb-2">
                  {t('legal.section5.title')}
                </h2>
                <p className="text-gray-300 mb-4">
                  {t('legal.section5.content')}
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

export default LegalNotice;
