import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import laPinceLogo from '@/assets/logo.webp'
import { NavLink } from 'react-router-dom'

export function LoginForm({ className, ...props }: React.ComponentProps<'form'>) {
  return (
    <form
      className={cn(
        'flex flex-col gap-6 dark:bg-primary rounded-md border p-6 sm:p-16 shadow',
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={laPinceLogo} width={100} alt="Application logo" />
      </div>
      <div className="grid gap-6">
        <h1 className="text-2xl font-semibold text-left">Se connecter</h1>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="lapince@oclock.io" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mot de passe</Label>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          <Input id="password" type="password" required placeholder="********" />
        </div>
        <Button type="submit" variant="blue">
          Connexion
        </Button>
      </div>
      <div className="text-center text-sm">
        <p>Vous n'avez pas encore de compte ?</p>
        <NavLink to="/register" className="underline underline-offset-4 text-primary-color">
          Inscrivez-vous gratuitement
        </NavLink>
      </div>
    </form>
  )
}
