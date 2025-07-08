import { House } from 'lucide-react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { SendResetPasswordEmailForm } from '@/components/auth/SendResetPasswordEmailForm';
import { ModeToggle } from '@/components/theme/theme-toggle';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const ResetPassword = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const showResetForm = Boolean(token);

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
            <ModeToggle />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              {showResetForm ? (
                <ResetPasswordForm />
              ) : (
                <SendResetPasswordEmailForm />
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultWrapper>
  );
};

export default ResetPassword;
