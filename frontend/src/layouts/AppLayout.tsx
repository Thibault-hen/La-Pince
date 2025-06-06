import { AppSidebar } from '@/components/app-sidebar'
import { ProfileButton } from '@/components/profile/ProfileButton'
import { ModeToggle } from '@/components/theme/theme-toggle'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <aside aria-label="navigation">
        <AppSidebar collapsible="icon" />
      </aside>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="w-full flex items-center gap-2 px-3 justify-between">
            <div>
              <SidebarTrigger className="cursor-pointer hover:bg-secondary-color dark:hover:bg-secondary-color" />
            </div>
            <div className="flex gap-2">
              <ModeToggle />
              <ProfileButton />
            </div>
          </div>
        </header>
        <main className="p-4">
          <Outlet />
          <div className="flex flex-1 flex-col gap-4 mt-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-primary -aspect-video rounded-xl border" />
              <div className="bg-primary aspect-video rounded-xl border" />
              <div className="bg-primary aspect-video rounded-xl border" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
