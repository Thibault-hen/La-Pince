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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();
	const { open, openMobile, setOpenMobile } = useSidebar();
	const { t } = useTranslation();
	const items = getItems(t);
	return (
		<Sidebar {...props}>
			<SidebarHeader className="flex items-center justify-center p-3">
				{open || openMobile ? (
					<NavLink
						to="/"
						className="flex items-center gap-3 group transition-all duration-300"
					>
						<div className="relative">
							<img
								src={laPinceLogo}
								width={48}
								height={48}
								className="transition-all duration-300 group-hover:drop-shadow-lg"
								alt="Application logo"
							/>
						</div>
						<span className="text-lg font-bold">{t('home.nav.title')}</span>
					</NavLink>
				) : (
					<NavLink
						to="/"
						className="flex items-center justify-center group transition-all duration-300 hover:scale-110"
					>
						<div className="relative">
							<img
								src={laPinceLogo}
								width={40}
								height={40}
								className="transition-all duration-300 group-hover:drop-shadow-lg"
								alt="Application logo"
							/>
						</div>
					</NavLink>
				)}
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
				{open || openMobile ? (
					<div>
						<CurrencySelector />
						<div className="px-4 py-2 text-xs text-muted-foreground mt-4 border-t border-border gap-1 justify-center">
							<div className="flex gap-2 mt-2">
								<p className="mb-1">© 2025 La Pince</p>
								<p className="mb-1">-</p>
								<NavLink to="/terms" className="hover:underline">
									{t('sidebar.legalNotice')}
								</NavLink>
							</div>
						</div>
					</div>
				) : (
					<div></div>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
