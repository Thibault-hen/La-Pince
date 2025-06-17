import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import laPinceLogo from '@/assets/logo.webp';
import { NavLink, useLocation } from 'react-router-dom';
import { useLogin } from '@/hooks/use-auth';
import { useForm } from '@tanstack/react-form';
import { loginSchema } from '@/schemas/auth.schemas';
import { Loader } from '../ui/loader';
import { useEffect, useState } from 'react';
import { Lock, Mail } from 'lucide-react';

type createdAccountMessages = {
  messages: {
    successMessage: string;
    email: string;
  };
};

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { mutateAsync: login, error } = useLogin();
  const location = useLocation();
  const [createdAccountMessage, setCreatedAccountMessage] = useState<createdAccountMessages | null>(
    location.state || null
  );

  useEffect(() => {
    if (createdAccountMessage) {
      window.history.replaceState({}, document.title);
    }
  }, [createdAccountMessage]);

  const form = useForm({
    defaultValues: {
      email: createdAccountMessage?.messages.email || '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    async onSubmit({ value }) {
      await login(value);
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
        setCreatedAccountMessage(null);
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={laPinceLogo} width={100} alt="Application logo" />
      </div>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold text-left">Connexion</h1>
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
                <span className="text-red-500 text-sm">{field.state.meta.errors[0]?.message}</span>
              )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div className="relative grid gap-3">
              <div className="flex items-center">
                <Label htmlFor={field.name}>Mot de passe</Label>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
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
                <span className="text-red-500 text-sm">{field.state.meta.errors[0]?.message}</span>
              )}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmiting]) => (
            <Button type="submit" variant="blue" className="py-4">
              {isSubmiting ? <Loader /> : 'Connexion'}
            </Button>
          )}
        />
        {error && form.state.isFormValid && (
          <span className="text-red-500 text-sm text-center">Email out mot de passe incorrect</span>
        )}
        {createdAccountMessage?.messages.successMessage && (
          <>
            <span className="text-green-700 text-sm text-center">
              {createdAccountMessage?.messages.successMessage}
            </span>
          </>
        )}
      </div>
      <div className="text-center text-sm">
        <p>Vous n'avez pas encore de compte ?</p>
        <NavLink to="/inscription" className="underline underline-offset-4 text-primary-color">
          Inscrivez-vous gratuitement
        </NavLink>
      </div>
    </form>
  );
}
