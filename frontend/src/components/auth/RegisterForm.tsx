/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { AxiosError } from 'axios';
import { Lock, Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.webp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { registerSchema } from '@/schemas/auth.schemas';
import { Loader } from '../ui/loader';

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const { mutateAsync: register, error } = useRegister();
  const { t } = useTranslation();

  const getErrorMessage = (error: unknown): string | null => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        return t('register.errorMessages.emailExists');
      }
      if (error.response?.status === 429) {
        return t('register.errorMessages.tooManyAttempts');
      }
    }
    return t('register.errorMessages.error');
  };

  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: registerSchema,
    },
    async onSubmit({ value }) {
      await register(value);
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col gap-6 dark:bg-background rounded-md border p-6 sm:p-16 shadow',
        className,
      )}
      {...props}
      onSubmit={async (e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={laPinceLogo} width={100} alt="Application logo" />
      </div>
      <div className="grid gap-6">
        <h1 className="text-xl md:text-2xl font-semibold text-center md:text-left">
          {t('register.title')}
        </h1>
        <form.Field
          name="name"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>{t('register.form.name')}</Label>
              </div>
              <User className="absolute left-3 top-9 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                id={field.name}
                value={field.state.value}
                type="text"
                placeholder="La grosse pince à O'Clock"
                required
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(field.state.meta.errors[0]?.message || '')}
                </span>
              )}
            </div>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>{t('register.form.email')}</Label>
              </div>
              <Mail className="absolute left-3 top-9 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                id={field.name}
                value={field.state.value}
                type="email"
                placeholder="lapince@oclock.io"
                required
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(field.state.meta.errors[0]?.message || '')}
                </span>
              )}
            </div>
          )}
        />
        <form.Field
          name="password"
          children={(field) => (
            <div className="relative grid gap-3">
              <Label htmlFor={field.name}>{t('register.form.password')}</Label>

              <Lock className="absolute left-3 top-10 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                id={field.name}
                value={field.state.value}
                type="password"
                placeholder="********"
                required
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(field.state.meta.errors[0]?.message || '')}
                </span>
              )}
            </div>
          )}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <div className="flex items-center">
                <Label htmlFor={field.name}>
                  {t('register.form.confirmPassword')}
                </Label>
              </div>
              <Lock className="absolute left-3 top-9 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                id={field.name}
                value={field.state.value}
                type="password"
                placeholder="********"
                required
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(field.state.meta.errors[0]?.message || '')}
                </span>
              )}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmiting]) => (
            <Button type="submit" variant="blue" className="py-4">
              {isSubmiting ? <Loader /> : t('register.form.registerButton')}
            </Button>
          )}
        />
        {error && (
          <span className="text-sm text-red-500 text-center">
            {getErrorMessage(error)}
          </span>
        )}
      </div>
      <div className="text-center text-sm">
        <p>{t('register.form.alreadyHaveAccount')}</p>
        <NavLink
          to="/login"
          className="underline underline-offset-4 text-primary-color"
        >
          {t('register.form.loginLink')}
        </NavLink>
      </div>
    </form>
  );
}
