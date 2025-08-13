import type { TFunction } from 'i18next';
import { Gauge, HandCoins, PiggyBank, Settings, Tags } from 'lucide-react';
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
		icon: Gauge,
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
	const { openMobile, setOpenMobile, isMobile } = useSidebar();
	const { t } = useTranslation();
	const items = getItems(t);

	return (
		<Sidebar {...props} className="dark:border-neutral-700">
			<SidebarHeader
				className={`${isMobile ? 'mb-4 mx-4 border-b' : 'mx-8'} flex group-data-[collapsible=icon]:mx-0 `}
			>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="lg" className="!p-0">
							<NavLink
								to="/"
								className="flex items-center gap-3 px-2 py-1 group"
								tabIndex={0}
							>
								<img
									src={laPinceLogo}
									className="w-12 h-12 rounded-lg transition-transform duration-200 hover:scale-110"
									alt="La Pince logo"
									draggable={false}
								/>
								<span className="text-xl font-semibold tracking-tight transition-colors duration-200">
									La Pince
								</span>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="flex mt-4">
				<SidebarGroup>
					<SidebarMenu className="flex gap-4 lg:gap-4">
						{items.map((item) => {
							const isActive: boolean = item.url === location.pathname;
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={isActive}
										className="px-6 group-data-[collapsible=icon]:!px-4  duration-300 transition-all"
									>
										<NavLink
											to={item.url}
											className="!p-5.5 flex items-center gap-3"
											onClick={() => {
												if (openMobile) {
													setOpenMobile(false);
												}
											}}
										>
											<item.icon className="!w-7 !h-7" strokeWidth={1.3} />
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
