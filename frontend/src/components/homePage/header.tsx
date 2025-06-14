import laPinceLogo from '@/assets/logo.png';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Suspense } from 'react';
import { ModeToggle } from '@/components/theme/theme-toggle.tsx';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@/services/auth';

const TopMenu = [
  { name: 'Nous contacter', to: '#contact' },
  { name: 'Fonctionnalités', to: '#features' },
];

export default function Header() {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>(['authUser']);
  return (
    <header className="sticky top-5 z-50 flex justify-center container ">
      <div className="min-w-full border rounded-md  w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2.5 px-4 ">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1">
              <img src={laPinceLogo} width={60} className="text-red-500" />
              <span className="text-xl font-bold">La Pince</span>
            </Link>
            <div className="items-center flex gap-6">
              {TopMenu.map((menu, idx) => (
                <a key={idx} className={cn(buttonVariants({ variant: 'ghost' }))} href={menu.to}>
                  {menu.name}
                </a>
              ))}
            </div>
          </div>
          <div className="items-center flex gap-6">
            <div className="flex items-center gap-4">
              {!userData ? (
                <>
                  <Button variant="blue">
                    <Link to="/connexion">Connexion</Link>
                  </Button>
                  <Button variant="blue">
                    <Link to="/inscription">Inscription</Link>
                  </Button>
                </>
              ) : (
                <Button variant="blue">
                  <Link to="/tableau-de-bord">Mon espace</Link>
                </Button>
              )}
            </div>
            <Suspense>
              <ModeToggle />
            </Suspense>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="  block lg:hidden container ">
          <div className="flex items-center items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-1">
                <img src={laPinceLogo} width={60} className="text-red-500" />
                <span className="hidden sm:flex text-xl font-bold">La Pince</span>
              </Link>
            </div>
            <div className="items-center my-4 flex  gap-0">
              {!userData ? (
                <>
                  <Button variant="blue" className="font-semibold text-sm m-2 p-5 justify-end">
                    <Link to="/connexion">Connexion</Link>
                  </Button>
                  <Button variant="blue" className="font-semibold text-sm m-2 p-5 justify-end">
                    <Link to="/inscription">Inscription</Link>
                  </Button>
                </>
              ) : (
                <Button variant="blue" className="font-semibold text-sm m-2 p-5 justify-end">
                  <Link to="/tableau-de-bord">Mon espace</Link>
                </Button>
              )}

              <Sheet>
                <SheetTrigger asChild>
                  <Button className="p-5" variant={'outline'} size={'icon'}>
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex  flex-col overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="items-center flex justify-center align-center ">
                      <div className="flex">
                        <img src={laPinceLogo} width={60} className="text-red-500" />
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  {TopMenu.map((menu, idx) => (
                    <SheetClose key={idx} asChild>
                      <Button
                        variant="blue"
                        asChild
                        key={idx}
                        className="font-semibold text-lg m-2 p-6"
                      >
                        <a href={menu.to}>{menu.name}</a>
                      </Button>
                    </SheetClose>
                  ))}
                  <div className="flex justify-center items-center pt-4">
                    <Suspense fallback={null}>
                      <ModeToggle />
                    </Suspense>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
