import { LoginForm } from '@/components/auth/LoginForm';
import preview from '@/assets/home-page/hero_img1.png';
import { House } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { ModeToggle } from '@/components/theme/theme-toggle';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';
import { LanguageSelector } from '@/components/lang/LanguageSelector';

export const Login = () => {
  const location = useLocation();

  return (
    <DefaultWrapper key={location.pathname}>
      <div className="grid min-h-svh xl:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex gap-2 justify-start">
            <NavLink
              to="/"
              className="flex items-center gap-2 border dark:bg-primary rounded-md p-2 text-sm hover:bg-secondary-color dark:hover:bg-secondary-color transition-colors duration-300 tracking-wide"
            >
              <House size={18} />
            </NavLink>
            <LanguageSelector />
            <ModeToggle />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="border-l border-l-primary-color hidden xl:block min-h-screen">
          <div className="relative w-full h-full grid place-items-center">
            <img src={preview} width={480} alt="Application La Pince" />
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};
