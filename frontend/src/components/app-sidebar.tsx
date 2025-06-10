import * as React from 'react'
import { HandCoins, Home, PiggyBank, Settings, Tags } from 'lucide-react'
import laPinceLogo from '@/assets/logo.webp'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavLink, useLocation } from 'react-router-dom'

const items = [
  {
    title: 'Tableau de bord',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Budgets',
    url: '/dashboard/budgets',
    icon: PiggyBank,
  },
  {
    title: 'Dépenses',
    url: '/dashboard/expenses',
    icon: HandCoins,
  },
  {
    title: 'Catégories',
    url: '/dashboard/categories',
    icon: Tags,
  },
  {
    title: 'Paramètres',
    url: '/dashboard/settings',
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation()
  const { open, openMobile } = useSidebar()
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex">
        {open || openMobile ? (
          <div className="flex items-center justify-center">
            <img src={laPinceLogo} width={60} alt="Application logo" />
            <NavLink to="/" className="flex text-xl tracking-wide font-bold">
              La Pince
            </NavLink>
          </div>
        ) : (
          <img src={laPinceLogo} width={60} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const isActive: boolean = item.url === location.pathname
              return (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="py-5 px-6 duration-200 transition-all"
                  >
                    <NavLink to={item.url} className="p-1">
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {open || openMobile ? (
          <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border gap-1 justify-center">
            <div className="flex gap-2 mt-2">
              <p className="mb-1">© 2025 La Pince</p>
              <p className="mb-1">-</p>
              <NavLink to="/terms" className="hover:underline">
                Mentions légales
              </NavLink>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
