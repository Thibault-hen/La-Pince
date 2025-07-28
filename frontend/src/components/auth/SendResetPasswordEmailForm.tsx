/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import laPinceLogo from '@/assets/logo.webp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { sendResetEmailSchema } from '@/schemas/auth.schemas';
import { authService } from '@/services/auth';
import { Loader } from '../ui/loader';

type SendResetEmailMessages = {
  messages: {
    successMessage: string;
    errorMessage: string;
  };
};

export function SendResetPasswordEmailForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [sendEmailMessage, setSendEmailMessage] =
    useState<SendResetEmailMessages | null>(null);
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: sendResetEmailSchema,
    },
    async onSubmit({ value }) {
      try {
        const response = await authService.sendResetEmail(value);
        setSendEmailMessage({
          messages: {
            successMessage: response.message,
            errorMessage: '',
          },
        });
      } catch {
        setSendEmailMessage({
          messages: {
            successMessage: '',
            errorMessage: 'user.resetPassword.error.default',
          },
        });
      }
    },
  });

  return (
    <form
      className={cn(
        'flex flex-col gap-6 dark:bg-primary rounded-md border p-6 sm:p-16 shadow',
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
        <h1 className="text-2xl font-semibold text-left">
          {t('user.sendResetPassword.title')}
        </h1>
        <form.Field
          name="email"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>Email</Label>
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
                  {t(
                    field.state.meta.errors[0]?.message ||
                      'default.error.message',
                  )}
                </span>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmitting]) => (
            <Button type="submit" variant="blue" className="py-4">
              {isSubmitting ? <Loader /> : t('user.sendResetPassword.title')}
            </Button>
          )}
        />
        {sendEmailMessage?.messages.errorMessage && (
          <span className="text-red-500 text-sm text-center">
            {t(sendEmailMessage.messages.errorMessage)}
          </span>
        )}
        {sendEmailMessage?.messages.successMessage && (
          <span className="text-green-700 text-sm text-center">
            {sendEmailMessage.messages.successMessage}
          </span>
        )}
      </div>
    </form>
  );
}
