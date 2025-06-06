import laPinceLogo from '@/assets/logo1.png'
import { Home, HandCoins, PiggyBank, Settings, Sidebar } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { SidebarContent, SidebarHeader, SidebarGroupLabel, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "../ui/sidebar"

const items = [
    {
        title: 'Tableau de bord',
        url: '/',
        icon: Home,
    },
    {
        title: 'Dépenses',
        url: '/expenses',
        icon: HandCoins,
    },
    {
        title: 'Budgets',
        url: '/budgets',
        icon: PiggyBank,
    },
    {
        title: 'Paramètres',
        url: '/settings',
        icon: Settings,
    },
]


export function AppSidebar() {
    const location = useLocation()
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader className="flex flex-row items-center border-b p-4 ga justify-center tracking-wide">
                    <img src={laPinceLogo} height={10} width={60} />
                    <SidebarGroupLabel className="tracking-wider font-bold text-xl">
                        La Pince
                    </SidebarGroupLabel>
                </SidebarHeader>
                <SidebarGroup className="p-0 m-0">
                    <SidebarGroupContent className="p-2">
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive: boolean = item.url === location.pathname
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className="my-1 p-5 dark:hover:text-white transition duration-150 hover:text-black dark:hover:bg-secondary2 hover:bg-primary"
                                            isActive={isActive}
                                        >
                                            <NavLink to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border gap-1 justify-center">
                    <div className="flex gap-2 mt-2">
                        <p className="mb-1">© 2025 La Pince</p>
                        <p className="mb-1">-</p>
                        <NavLink to="/legal" className="hover:underline">
                            Mentions légales
                        </NavLink>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}