import laPinceLogo from "@/assets/logo.png";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import { ModeToggle } from "@/components/theme/theme-toggle.tsx";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
const TopMenu = [
	//{ name: "À propos", to: "/about" },
	{ name: "Nous contacter", to: "#contact" },
];
const topMenuButton = [
	{ name: "Connexion", to: "/login" },
	{ name: "Inscription", to: "/register" },
];

export default function Header() {
	return (
		<header className="sticky top-5 z-50 flex justify-center container">
			<div className="min-w-full border rounded-md  w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2.5 px-4">
				<nav className="hidden justify-between lg:flex">
					<div className="flex items-center gap-6">
						<Link to="/" className="flex items-center gap-1">
							<img src={laPinceLogo} width={60} className="text-red-500" />
							<span className="text-xl font-bold">La Pince</span>
						</Link>
						<div className="flex justify-start items-center gap-4">
							{TopMenu.map((menu, idx) => (
								<a
									key={idx}
									className={cn(
										buttonVariants({ variant: "ghost" }),
										navigationMenuTriggerStyle,
									)}
									href={menu.to}
								>
									{menu.name}
								</a>
							))}
						</div>
					</div>
					<div className="items-center flex gap-6">
						<div className="flex items-center gap-4">
							{topMenuButton.map((menu, idx) => (
								<Button
									key={idx}
									asChild
									className="bg-primary-color text-white hover:bg-secondary-color"
								>
									<Link to={menu.to}>{menu.name}</Link>
								</Button>
							))}
						</div>
						<Suspense>
							<ModeToggle />
						</Suspense>
					</div>
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-6">
							<Link to="/" className="flex items-center gap-1">
								<img src={laPinceLogo} width={60} className="text-red-500" />
								<span className="text-xl font-bold">La Pince</span>
							</Link>
							<div className="flex justify-start items-center gap-4"></div>
						</div>

						<Sheet>
							<SheetTrigger asChild>
								<Button variant={"outline"} size={"icon"}>
									<Menu className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto">
								<SheetHeader>
									<SheetTitle>
										<Link to="/" className="flex items-center gap-1">
											<span className="text-xl font-bold">La Pince</span>
										</Link>
									</SheetTitle>
								</SheetHeader>
								<div className="my-4 flex flex-col gap-0">
									{topMenuButton.map((menu, idx) => (
										<a
											key={idx}
											href={menu.to}
											className="font-semibold text-lg py-2"
										>
											{menu.name}
										</a>
									))}
								</div>
								{TopMenu.map((menu, idx) => (
									<a
										key={idx}
										className={cn(
											buttonVariants({ variant: "ghost" }),
											navigationMenuTriggerStyle,
										)}
										href={menu.to}
									>
										{menu.name}
									</a>
								))}
								<div className="border-t pt-4">
									<div className="mt-2 flex flex-col gap-2">
										<Link
											to="/login"
											className={buttonVariants({ variant: "default" })}
										>
											Get Started
										</Link>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	);
}
