import type { TFunction } from 'i18next';
import { HandCoins, Home, PiggyBank, Settings, Tags } from 'lucide-react';
import type * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.webp';
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
} from '@/components/ui/sidebar';
import { CurrencySelector } from './currency/CurrencySelector';

const getItems = (t: TFunction) => [
	{
		title: t('sidebar.dashboard'),
		url: '/dashboard',
		icon: Home,
	},
	{
		title: t('sidebar.budgets'),
		url: '/dashboard/budgets',
		icon: PiggyBank,
	},
	{
		title: t('sidebar.expenses'),
		url: '/dashboard/expenses',
		icon: HandCoins,
	},
	{
		title: t('sidebar.categories'),
		url: '/dashboard/categories',
		icon: Tags,
	},
	{
		title: t('sidebar.settings'),
		url: '/dashboard/settings',
		icon: Settings,
	},
];

export const AppSidebar = ({
	...props
}: React.ComponentProps<typeof Sidebar>) => {
	const location = useLocation();
	const { openMobile, setOpenMobile } = useSidebar();
	const { t } = useTranslation();
	const items = getItems(t);

	return (
		<Sidebar {...props} className="group">
			<SidebarHeader className="p-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							size="lg"
							className="group-data-[state=collapsed]:mx-2 mx-4 my-3"
						>
							<NavLink
								to="/"
								className="items-center gap-3 transition-all duration-300 max-w-fit"
							>
								<div className="relative flex-shrink-0">
									<img
										src={laPinceLogo}
										className="transition-all duration-300 w-12 h-12 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
										alt="Application logo"
									/>
								</div>
								<span className="text-lg font-bold">{t('home.nav.title')}</span>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						{items.map((item) => {
							const isActive: boolean = item.url === location.pathname;
							return (
								<SidebarMenuItem key={item.title} className="my-1">
									<SidebarMenuButton
										asChild
										isActive={isActive}
										className="py-5 px-6 duration-300 transition-all"
									>
										<NavLink
											to={item.url}
											className="p-1"
											onClick={() => {
												if (openMobile) {
													setOpenMobile(false);
												}
											}}
										>
											<item.icon />
											<span>{item.title}</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<div className="group-data-[collapsible=icon]:hidden flex flex-col gap-4">
					<CurrencySelector />
					<div className="px-4 py-3 text-xs text-muted-foreground border-t border-border">
						<div className="flex items-center justify-center gap-2">
							<span>© 2025 La Pince</span>
							<span className="text-muted-foreground/50">•</span>
							<NavLink
								to="/legal-notice"
								className="hover:underline hover:text-foreground transition-colors duration-200"
							>
								{t('sidebar.legalNotice')}
							</NavLink>
						</div>
					</div>
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
};
