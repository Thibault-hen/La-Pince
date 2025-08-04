import { useAtomValue } from 'jotai';
import {
	LogIn,
	LogOut,
	Menu,
	PanelsTopLeft,
	UserRoundPlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.png';
import { ModeToggle } from '@/components/theme/theme-toggle.tsx';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useLogout } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { userAtom } from '@/stores/authStore';
import { LanguageSelector } from '../lang/LanguageSelector';

const TopMenu = [
	{ name: 'home.nav.contact', to: '/#contact' },
	{ name: 'home.nav.features', to: '/#features' },
];

export default function Header() {
	const { t } = useTranslation();
	const user = useAtomValue(userAtom);
	const [isOpen, setIsOpen] = useState(false);
	const { mutateAsync: logout } = useLogout();

	const handleLogout = async () => {
		logout();
	};

	useEffect(() => {
		if (location.hash) {
			const element = document.querySelector(location.hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});

	return (
		<header className="sticky top-0 z-50 w-full">
			<div className="absolute inset-0 bg-white dark:bg-primary border-b border-neutral-500/40" />
			{/* Main container */}
			<div className="relative px-4 lg:px-8 xl:px-12 2xl:px-24">
				<nav className="flex items-center justify-between h-16 lg:h-20">
					{/* Logo Section */}
					<Link to="/" className="flex items-center gap-3">
						<div className="relative">
							<img src={laPinceLogo} width={48} height={48} alt="Logo" />
						</div>
						<span className="md:text-lg lg:text-2xl font-bold">
							{t('home.nav.title')}
						</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
						{/* Navigation Links */}
						<div className="flex items-center gap-2">
							{TopMenu.map((menu) => (
								<a
									key={menu.name}
									href={menu.to}
									className={cn(
										'relative px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300',
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
										<Link to="/login">
											<LogIn />
											{t('home.nav.login')}
										</Link>
									</Button>
									<Button asChild variant="outline">
										<Link to="/register">
											<UserRoundPlus />
											{t('home.nav.register')}
										</Link>
									</Button>
								</>
							) : (
								<>
									<Button asChild variant="blue">
										<Link to="/dashboard">
											<PanelsTopLeft />
											{t('home.nav.dashboard')}
										</Link>
									</Button>
									<Button variant="blue" onClick={async () => handleLogout()}>
										<LogOut />
									</Button>
								</>
							)}
						</div>

						{/* Theme & Language Controls */}
						<div className="flex items-center gap-2 pl-6 border-l border-border/50">
							<LanguageSelector />
							<ModeToggle />
						</div>
					</div>
					{/* Mobile Menu */}
					<div className="flex md:hidden items-center gap-3">
						<div className="flex items-center gap-2">
							{!user ? (
								<>
									<Button variant="blue" asChild>
										<Link to="/login">
											<LogIn />
										</Link>
									</Button>
									<Button asChild variant="outline">
										<Link to="/register">
											<UserRoundPlus />
										</Link>
									</Button>
								</>
							) : (
								<>
									<Button asChild variant="blue" className="text-[0.500rem]">
										<Link to="/dashboard">
											<PanelsTopLeft /> {t('home.nav.dashboard')}
										</Link>
									</Button>
									<Button
										variant="blue"
										className="text-[0.500rem]"
										onClick={async () => handleLogout()}
									>
										<LogOut />
									</Button>
								</>
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
								<SheetHeader className="p-2 border-b">
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
									<SheetDescription
										aria-describedby={undefined}
									></SheetDescription>
								</SheetHeader>

								{/* Mobile Navigation Links */}
								<div className="flex flex-col gap-3 py-2">
									<div className="flex flex-col items-center gap-2 py-2 px-6">
										{!user ? (
											<>
												<Button variant="blue" asChild className="w-full">
													<Link to="/login">
														<LogIn />
														{t('home.nav.login')}
													</Link>
												</Button>
												<Button asChild variant="outline" className="w-full">
													<Link to="/register">
														<UserRoundPlus />
														{t('home.nav.register')}
													</Link>
												</Button>
											</>
										) : (
											<>
												<Button asChild variant="blue" className="w-full">
													<Link to="/dashboard">
														<PanelsTopLeft />
														{t('home.nav.dashboard')}
													</Link>
												</Button>
												<Button
													variant="blue"
													className="w-full"
													onClick={async () => handleLogout()}
												>
													<LogOut /> {t('button.logout')}
												</Button>
											</>
										)}
									</div>
									{TopMenu.map((menu) => (
										<SheetClose key={menu.name} asChild>
											<a
												href={menu.to}
												className="flex items-center py-2 px-6 text-sm font-medium hover:text-primary-color transition-all duration-300"
											>
												{t(menu.name)}
											</a>
										</SheetClose>
									))}
								</div>

								{/* Mobile Theme & Language Controls */}
								<div className="flex items-center justify-center gap-4 py-4 border-t border-b border-border/50">
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
