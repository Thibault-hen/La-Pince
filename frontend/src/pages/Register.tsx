import { RegisterForm } from '@/components/auth/RegisterForm';
import { ModeToggle } from '@/components/theme/theme-toggle';
import { House } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import preview1 from '@/assets/preview1.png';
import preview2 from '@/assets/preview2.png';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

export const Register = () => {
  const location = useLocation();

  return (
    <DefaultWrapper key={location.pathname}>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex gap-2 justify-start">
            <NavLink
              to="/"
              className="flex items-center gap-2 border dark:bg-primary rounded-md p-2 text-sm hover:bg-secondary-color dark:hover:bg-secondary-color transition-colors duration-300 tracking-wide"
            >
              <House size={18} />
            </NavLink>
            <ModeToggle />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <RegisterForm />
            </div>
          </div>
        </div>
        <div className="bg-primary border-l border-l-secondary-color hidden lg:block min-h-screen">
          <div className="relative w-full h-full">
            <img
              src={preview1}
              width={400}
              className="absolute top-[40%] left-[40%] -translate-x-1/2 -translate-y-1/2"
              alt="Apperçu Application"
            />
            <img
              src={preview2}
              width={400}
              className="absolute top-[50%] left-[65%] -translate-x-1/2 -translate-y-1/2"
              alt="Apperçu Application"
            />
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};
