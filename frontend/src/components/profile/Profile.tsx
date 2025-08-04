/** biome-ignore-all lint/correctness/noChildrenProp: TanStack Form uses children prop pattern */
import { useForm } from '@tanstack/react-form';
import { Bell, Mail, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUpdateUserProfile } from '@/hooks/use-account';
import { userAccountSchema } from '@/schemas/account.schema';
import type { UserAccount } from '@/types/account';
import { currencies } from '../currency/CurrencySelector';
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

interface ProfileProps {
  user: UserAccount | null;
}

export const Profile = ({ user }: ProfileProps) => {
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const { t } = useTranslation();

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      currency: user?.currency || 'EUR',
      alert: user?.alert || false,
    },
    validators: {
      onSubmit: userAccountSchema,
    },
    onSubmit: async ({ value }) => {
      await updateUserProfile(value);
      form.reset();
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
      <Card className="dark:bg-primary border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-color/10 border border-primary-color/20 rounded-lg">
                <User className="h-4 w-4 text-primary-color" />
              </div>
              <CardTitle className="text-base md:text-lg">
                {t('account.profile.title')}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-xs md:text-sm">
            {t('account.profile.description')}
          </CardDescription>
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
              <div className="space-y-2 lg:max-w-1/3">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {t('account.profile.form.favoriteCurrency')}
                </Label>
                <Select
                  required
                  onValueChange={field.handleChange}
                  defaultValue={field.state.value}
                >
                  <SelectTrigger className="w-full h-12 border-border/50 hover:border-secondary-color transition-all duration-300 focus:border-secondary-color disabled:opacity-50 disabled:cursor-not-allowed">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-xl border-2 border-border/50">
                    <SelectGroup>
                      <SelectLabel>{t('currency.select')}</SelectLabel>
                      {currencies?.map((currency, idx) => (
                        <SelectItem
                          key={currencies[idx].code}
                          value={currency.code}
                          className="group cursor-pointer p-2 hover:bg-gradient-to-r transition-all duration-300 hover:shadow-md border-b border-border/20 last:border-b-0 focus:bg-primary-color/20"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="relative">
                              <div className="w-10 h-7 border-1 bg-secondary-color/10 border-secondary-color/20 rounded-lg flex items-center justify-center transition-all duration-300">
                                <span className="text-secondary-color font-bold text-sm drop-shadow-sm">
                                  {currency.symbol}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="font-bold text-foreground transition-colors duration-300">
                                {currency.code}
                              </span>
                              <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 truncate">
                                {currency.name}
                              </span>
                            </div>
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
                  className="data-[state=checked]:bg-primary-color cursor-pointer"
                />
              </div>
            )}
          />
          <div className="">
            <form.Subscribe
              selector={(state) => [state.isDirty, state.isSubmitting]}
              children={([isDirty, isSubmitting]) => (
                <Button
                  disabled={!isDirty || isSubmitting}
                  type="submit"
                  size="lg"
                  variant="blue"
                  className="w-full sm:w-auto"
                >
                  {t('account.profile.form.saveButton')}
                </Button>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
