import { DefaultWrapper } from "@/layouts/DefaultWrapper";
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { useTranslation } from 'react-i18next';

const Tos = () => {
  const { t } = useTranslation();

  return (
    <DefaultWrapper>
      <div className="w-full place-items-center ">
        <Header />
        <main>
          <div className="container mx-auto px-4 pt-16 pb-8">
            <h1 className="text-3xl font-bold mb-4">{t('tos.title')}</h1>
            <p className="text-gray-300 mb-4">
              {t('tos.introduction')}
            </p>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section1.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section1.content')}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section2.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section2.content')}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section3.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section3.content')}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section4.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section4.content')}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section5.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section5.content')}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t('tos.section6.title')}</h2>
              <p className="text-gray-300 mb-4">
                {t('tos.section6.content')}
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </DefaultWrapper>
  );
};

export default Tos;
