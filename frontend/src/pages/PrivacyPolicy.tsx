import { useTranslation } from 'react-i18next';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { PageMeta } from '@/components/PageMeta';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
        <div className="w-full flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-1 flex-col py-12 px-12 md:px-32 lg:px-64">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-muted-foreground mb-4 text-sm md:text-base">
              {t('privacy.introduction')}
            </p>

            <section>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    {t('privacy.section1.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section1.content')}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    {t('privacy.section2.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section2.content')}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {t('privacy.section3.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section3.content')}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    {t('privacy.section4.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section4.content')}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    {t('privacy.section5.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section5.content')}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    {t('privacy.section6.title')}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{t('privacy.section6.content')}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </main>
          <Footer />
        </div>
      </DefaultWrapper>
    </>
  );
};

export default PrivacyPolicy;
