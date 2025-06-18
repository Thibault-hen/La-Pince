import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import laPinceLogo from '@/assets/logo.webp';
import { useForm } from '@tanstack/react-form';
import { resetPasswordSchema } from '@/schemas/auth.schemas';
import { Loader } from '../ui/loader';
import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { authService } from '@/services/auth';
import { useTranslation } from 'react-i18next';

type ResetPasswordMessages = {
  messages: {
    successMessage: string;
    errorMessage: string;
  };
};

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
  const [resetPasswordMessage, setResetPasswordMessage] = useState<ResetPasswordMessages | null>(
    null
  );

  const { t } = useTranslation();
  useEffect(() => {
    if (resetPasswordMessage) {
      window.history.replaceState({}, document.title);
    }
  }, [resetPasswordMessage]);

  const form = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    async onSubmit({ value }) {
      try {
        const response = await authService.resetPassword({ newPassword: value.newPassword, token: window.location.pathname.split('/').pop() || '' });

      } catch (error) {
      }
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col gap-6 dark:bg-primary rounded-md border p-6 sm:p-16 shadow',
        className
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
        <h1 className="text-2xl font-semibold text-left">{t('user.resetPassword.title')}</h1>
        <form.Field
          name="newPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>{t('user.resetPassword.newPassword')}</Label>
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
                <span className="text-red-500 text-sm">{t(field.state.meta.errors[0]!.message)}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>{t('user.resetPassword.confirmPassword')}</Label>
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
                <span className="text-red-500 text-sm">{t(field.state.meta.errors[0]!.message)}</span>
              )}

            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button type="submit" variant="blue" className="py-4">
              {isSubmitting ? <Loader /> : t('user.resetPassword.resetButton')}
            </Button>
          )}
        />
        {resetPasswordMessage?.messages.errorMessage && (
          <span className="text-red-500 text-sm text-center">
            {t(resetPasswordMessage.messages.errorMessage)}
          </span>
        )}
        {resetPasswordMessage?.messages.successMessage && (
          <span className="text-green-700 text-sm text-center">
            {t(resetPasswordMessage.messages.successMessage)}
          </span>
        )}
      </div>
    </form>
  );
}

