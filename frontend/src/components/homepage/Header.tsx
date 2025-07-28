import { useAtomValue } from 'jotai';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.png';
import { ModeToggle } from '@/components/theme/theme-toggle.tsx';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { userAtom } from '@/stores/authStore';
import { LanguageSelector } from '../lang/LanguageSelector';

const TopMenu = [
  { name: 'home.nav.contact', to: '#contact' },
  { name: 'home.nav.features', to: '#features' },
];

export default function Header() {
  const { t } = useTranslation();
  const user = useAtomValue(userAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gradient background with blur effect */}
      <div className="absolute inset-0 bg-white dark:bg-primary border-b border-border/50" />

      {/* Main container */}
      <div className="relative px-4 lg:px-8 xl:px-12 2xl:px-24">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <img src={laPinceLogo} width={48} height={48} alt="Logo" />
            </div>
            <span className="hidden sm:flex md:text-xl lg:text-2xl font-bold">
              {t('home.nav.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {TopMenu.map((menu) => (
                <a
                  key={menu.name}
                  href={menu.to}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300',
                    'hover:text-primary-color',
                    'before:absolute before:inset-x-0 before:bottom-0 before:h-0.5',
                    'before:bg-gradient-to-r before:from-primary-color before:to-secondary-color',
                    'before:scale-x-0 before:transition-transform before:duration-300',
                    'hover:before:scale-x-100',
                  )}
                >
                  {t(menu.name)}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <Button variant="blue" asChild>
                    <Link to="/login">{t('home.nav.login')}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/register">{t('home.nav.register')}</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="blue">
                  <Link to="/dashboard">{t('home.nav.dashboard')}</Link>
                </Button>
              )}
            </div>

            {/* Theme & Language Controls */}
            <div className="flex items-center gap-2 pl-6 border-l border-border/50">
              <LanguageSelector />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Mobile Auth Buttons */}
            <div className="flex items-center gap-2">
              {!user ? (
                <>
                  <Button variant="blue" asChild>
                    <Link to="/login">{t('home.nav.login')}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/register">{t('home.nav.register')}</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="blue">
                  <Link to="/dashboard">{t('home.nav.dashboard')}</Link>
                </Button>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shadow-none dark:bg-primary cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color border transition-all duration-300"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl border-l border-border/50"
              >
                <SheetHeader className="pb-6">
                  <SheetTitle className="flex items-center justify-center gap-3">
                    <div className="relative">
                      <img
                        src={laPinceLogo}
                        width={48}
                        height={48}
                        alt="Logo"
                      />
                    </div>
                    <span className="text-xl font-bold">
                      {t('home.nav.title')}
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-3 py-6">
                  {TopMenu.map((menu) => (
                    <SheetClose key={menu.name} asChild>
                      <a
                        href={menu.to}
                        className="flex items-center justify-center py-4 px-6 text-lg font-medium hover:text-secondary-color transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        {t(menu.name)}
                      </a>
                    </SheetClose>
                  ))}
                </div>

                {/* Mobile Theme & Language Controls */}
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-border/50">
                  <LanguageSelector />
                  <ModeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
