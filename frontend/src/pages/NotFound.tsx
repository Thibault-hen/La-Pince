import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.webp';
import { Button } from '@/components/ui/button';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <DefaultWrapper key={location.pathname}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 flex justify-center">
            <img src={laPinceLogo} alt="La Pince" className="w-24 h-24" />
          </div>

          <div className="mb-8 relative">
            <div className="text-6xl font-bold text-primary-color">404</div>
          </div>

          <div className="mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-color mb-4">
              {t('home.notFound.title')}
            </h1>
            <p className="text-lg max-w-md mx-auto leading-relaxed">
              {t('home.notFound.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button variant="blue" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4" />
              {t('home.notFound.backToHome')}
            </Button>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

export default NotFound;
