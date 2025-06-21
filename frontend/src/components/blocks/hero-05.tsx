import heroImage from '@/assets/home-page/hero_img1.png';
import { useTranslation } from 'react-i18next';

export default function Hero05() {
  const { t } = useTranslation();
  return (
    <section className="pb-20 pt-30 p-4 md:pb-32 md:pt-28">
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Left Content */}
          <div className="relative flex flex-col items-center justify-center gap-6 text-center lg:text-left">
            <h1 className="bg-gradient-to-r from-primary-color via-secondary-color to-primary-color inline-block bg-clip-text text-transparent font-bold md:text-left text-4xl md:text-6xl tracking-tighter bg">
              {t('home.hero.title')}
              <div className="relative inline-flex">
                <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-primary"></span>
                <span className="relative"></span>
              </div>
            </h1>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-color/20 via-primary-color/40 to-primary-color/20 rounded-full blur-3xl"></div>
            </div>
            <p className="mt-4 text-center md:text-left text-base md:text-xl">
              {t('home.hero.description')}
            </p>
          </div>

          {/* Right Image */}
          <div className="h-full md:p-3.5">
            <div className="relative h-full overflow-hidden grid place-items-center">
              <img alt="Application La Pince" src={heroImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
