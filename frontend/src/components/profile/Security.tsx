/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUpdatePassword } from '@/hooks/use-account';
import { passwordChangeSchema } from '@/schemas/account.schema';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const Security = () => {
  const { mutateAsync: updatePassword } = useUpdatePassword();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: passwordChangeSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updatePassword(value);
        form.reset();
      } catch (err) {
        console.error('Error updating password:', err);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Card className="dark:bg-primary">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary-color" />
            <CardTitle className="text-xl">
              {' '}
              {t('account.header.title')}
            </CardTitle>
          </div>
          <CardDescription> {t('account.header.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="currentPassword"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {t('account.security.form.currentPassword')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 text-xs md:text-sm"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <form.Field
              name="newPassword"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {t('account.security.form.newPassword')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 text-xs md:text-sm"
                    />
                  </div>
                  {field.state.meta.errors.length > 0 && (
                    <span className="text-red-500 text-sm">
                      {field.state.meta.errors[0]?.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {t('account.security.form.confirmNewPassword')}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 text-xs md:text-sm"
                  />
                </div>
                {field.state.meta.errors.length > 0 && (
                  <span className="text-red-500 text-sm">
                    {field.state.meta.errors[0]?.message}
                  </span>
                )}
              </div>
            )}
          />
          <div className="pt-1">
            <form.Subscribe
              selector={(state) => [state.isDirty, state.isSubmitting]}
              children={([isDirty, isSubmitting]) => (
                <Button
                  disabled={!isDirty || isSubmitting}
                  type="submit"
                  size="lg"
                  variant="blue"
                >
                  {t('account.security.form.changePasswordButton')}
                </Button>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
