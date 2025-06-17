import { AppSidebar } from '@/components/app-sidebar';
import { ProfileButton } from '@/components/profile/ProfileButton';
import { ModeToggle } from '@/components/theme/theme-toggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import {} from 'react';
import { DefaultWrapper } from './DefaultWrapper';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@/services/auth';

export const AppLayout = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<User>(['authUser']);
  return (
    <SidebarProvider>
      <aside aria-label="navigation">
        <AppSidebar collapsible="icon" />
      </aside>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="w-full flex items-center gap-2 px-3 justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color" />
            </div>
            <div className="flex gap-2 items-center justify-between w-full">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Salut, {userData?.user.name} 👋
                </h2>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ModeToggle />
                <ProfileButton />
              </div>
            </div>
          </div>
        </header>
        <DefaultWrapper key={location.pathname}>
          <main className="3xl:py-4 3xl:px-26 space-y-6 p-6">
            <Outlet />
          </main>
        </DefaultWrapper>
      </SidebarInset>
    </SidebarProvider>
  );
};
