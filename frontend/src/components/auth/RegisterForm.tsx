import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import laPinceLogo from '@/assets/logo.webp';
import { NavLink } from 'react-router-dom';
import { useRegister } from '@/hooks/use-auth';
import { useForm } from '@tanstack/react-form';
import { registerSchema } from '@/schemas/auth.schemas';
import { Loader } from '../ui/loader';
import { Lock, Mail, User } from 'lucide-react';

export function RegisterForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { mutateAsync: register, error } = useRegister();

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
        <h1 className="text-2xl font-semibold text-left">Inscription</h1>
        <form.Field
          name="name"
          children={(field) => (
            <div className="relative grid gap-3">
              <div>
                <Label htmlFor={field.name}>Nom</Label>
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
                <span className="text-red-500 text-sm">{field.state.meta.errors[0]?.message}</span>
              )}
            </div>
          )}
        />
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
        <form.Field
          name="confirmPassword"
          children={(field) => (
            <div className="relative grid gap-3">
              <div className="flex items-center">
                <Label htmlFor={field.name}>Confirmer mot de passe</Label>
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
                <span className="text-red-500 text-sm">{field.state.meta.errors[0]?.message}</span>
              )}
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.isSubmitting]}
          children={([isSubmiting]) => (
            <Button type="submit" variant="blue" className="py-4">
              {isSubmiting ? <Loader /> : "S'inscrire"}
            </Button>
          )}
        />
        {error && form.state.isFormValid && (
          <span className="text-sm text-red-500 text-center">
            Cette adresse email est déjà utilisé
          </span>
        )}
      </div>
      <div className="text-center text-sm">
        <p>Vous avez déjà un compte ?</p>
        <NavLink to="/connexion" className="underline underline-offset-4 text-primary-color">
          Connectez-vous
        </NavLink>
      </div>
    </form>
  );
}
