/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */

import { useForm } from '@tanstack/react-form';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { resetPasswordSchema } from '@/schemas/auth.schemas';
import { authService } from '@/services/auth';

type ResetPasswordFormMessages = {
  messages: {
    successMessage: string;
    errorMessage: string;
  };
};

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [resetMessage, setResetMessage] =
    useState<ResetPasswordFormMessages | null>(null);

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
        const response = await authService.resetPassword({
          token,
          newPassword: value.newPassword,
        });
        setResetMessage({
          messages: {
            successMessage: t(response.message),
            errorMessage: '',
          },
        });
        setTimeout(() => navigate('/login'), 2500);
      } catch {
        setResetMessage({
          messages: {
            successMessage: '',
            errorMessage: t('user.resetPassword.error.default'),
          },
        });
      }
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col gap-6 bg-primary rounded-md border p-6 sm:p-16 max-w-md mx-auto',
        className,
      )}
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <h1 className="text-2xl font-semibold text-center">
        {t('user.resetPassword.title')}
      </h1>

      <div className="grid gap-4">
        <form.Field
          name="newPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <Label htmlFor={field.name}>
                {t('user.resetPassword.newPassword')}
              </Label>
              <Lock className="absolute left-3 top-9 h-4 w-4 text-muted-foreground" />
              <Input
                id={field.name}
                type="password"
                className="pl-10"
                value={field.state.value}
                required
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(
                    field.state.meta.errors[0]?.message ||
                      'default.error.message',
                  )}
                </span>
              )}
            </div>
          )}
        />

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <Label htmlFor={field.name}>
                {t('user.resetPassword.confirmPassword')}
              </Label>
              <Lock className="absolute left-3 top-9 h-4 w-4 text-muted-foreground" />
              <Input
                id={field.name}
                type="password"
                className="pl-10"
                value={field.state.value}
                required
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors.length > 0 && (
                <span className="text-red-500 text-sm">
                  {t(
                    field.state.meta.errors[0]?.message ||
                      'default.error.message',
                  )}
                </span>
              )}
            </div>
          )}
        />
      </div>

      <form.Subscribe
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button type="submit" variant="blue" className="py-4">
            {isSubmitting ? <Loader /> : t('user.resetPassword.resetButton')}
          </Button>
        )}
      />

      {resetMessage?.messages.errorMessage && (
        <span className="text-red-500 text-sm text-center">
          {resetMessage.messages.errorMessage}
        </span>
      )}
      {resetMessage?.messages.successMessage && (
        <span className="text-green-600 text-sm text-center">
          {resetMessage.messages.successMessage}
        </span>
      )}
    </form>
  );
}
