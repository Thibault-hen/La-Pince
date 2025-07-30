import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { LanguageSelector } from '@/components/lang/LanguageSelector';
import NotificationButton from '@/components/notification/NotificationButton';
import { ProfileButton } from '@/components/profile/ProfileButton';
import { ModeToggle } from '@/components/theme/theme-toggle';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { CurrencyProvider } from '@/context/currency-context';
import { userAtom } from '@/stores/authStore';

export const AppLayout = () => {
  const user = useAtomValue(userAtom);
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR';
  return (
    <CurrencyProvider>
      <SidebarProvider>
        <aside aria-label="navigation">
          <AppSidebar collapsible="icon" />
        </aside>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b dark:border-neutral-700 bg-primary">
            <div className="w-full flex items-center gap-2 px-3 justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color" />
              </div>
              <div className="flex gap-2 items-center justify-between w-full">
                <div>
                  <h2 className="text-xs font-bold text-foreground md:text-sm lg:text-lg">
                    {t('header.greeting', { name: user?.name })}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString(locale, {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <NotificationButton />
                  <LanguageSelector />
                  <ModeToggle />
                  <ProfileButton />
                </div>
              </div>
            </div>
          </header>
          <main className="">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </CurrencyProvider>
  );
};
