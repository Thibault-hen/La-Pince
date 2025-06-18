import { Bell, DollarSign, Mail, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { useForm } from '@tanstack/react-form';
import { useUpdateUserProfile } from '@/hooks/use-account';
import type { UserAccount } from '@/types/account';
import { userAccountSchema } from '@/schemas/account.schema';
import { use } from 'react';
import { useTranslation } from 'react-i18next';
import { currencies } from '../currency/CurrencySelector';

interface ProfileProps {
  userData: UserAccount | undefined;
}

export const Profile = ({ userData }: ProfileProps) => {
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: userData?.name || '',
      email: userData?.email || '',
      currency: userData?.currency || 'EUR',
      alert: userData?.alert || false,
    },
    validators: {
      onSubmit: userAccountSchema,
    },
    onSubmit: async ({ value }) => {
      await updateUserProfile(value);
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
      <Card className="bg-transparent border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary-color" />
              <CardTitle className="text-xl">{t('account.profile.title')}</CardTitle>
            </div>
          </div>
          <CardDescription>{t('account.profile.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {t('account.profile.form.name')}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      className="pl-10 text-xs md:text-sm"
                      required
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
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {t('account.profile.form.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="lapince@oclock.io"
                      className="pl-10 text-xs md:text-sm"
                      required
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
            name="currency"
            children={(field) => (
              <div className="space-y-2 max-w-1/4">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {t('account.profile.form.favoriteCurrency')}
                </Label>

                <Select
                  required
                  onValueChange={field.handleChange}
                  defaultValue={field.state.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Selectionne ta monnaie</SelectLabel>
                      {currencies?.map((currency, idx) => (
                        <SelectItem key={idx} value={currency.code} className="flex cursor-pointer">
                          <div className="flex max-w-16 min-w-[45px]">
                            <span className="p-2 bg-secondary-color border border-secondary-color/40 px-1.5 py-0.5 rounded-md">
                              {currency.symbol}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{currency.code}</span>
                            <span className="font-bold text-muted-foreground text-xs">
                              {currency.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <form.Field
            name="alert"
            children={(field) => (
              <div className="flex w-full lg:max-w-1/2 items-center justify-between p-4 rounded-lg bg-secondary-color/5 border border-secondary-color/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary-color/20 rounded-lg">
                    <Bell className="h-4 w-4 text-secondary-color" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm md:text-base">
                      {t('account.profile.form.alert')}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {t('account.profile.form.alertDescription')}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={field.handleChange}
                  className="data-[state=checked]:bg-primary-color"
                />
              </div>
            )}
          />
          <div className="">
            <Button type="submit" size="lg" variant="blue">
              {t('account.profile.form.saveButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
