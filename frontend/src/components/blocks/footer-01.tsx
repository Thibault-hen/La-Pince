import { Separator } from "@/components/ui/separator";
import { Rocket, Twitter, Instagram, Youtube } from "lucide-react";
import laPinceLogo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const footerLinks = {
	product: [
		{ name: "Fonctionnalités", href: "#features" },
		{ name: "Tarifs", href: "#pricing" },
		{ name: "FAQ", href: "#faq" },
	],
	company: [{ name: "Contact", href: "#contact" }],
	legal: [
		{ name: "Confidentialité", href: "/privacy-policy" },
		{ name: "Conditions", href: "/tos" },
		{ name: "Licence", href: "/license" },
	],
};

const socialLinks = [
	{ icon: Twitter, name: "Twitter", href: "#" },
	{ icon: Instagram, name: "Instagram", href: "#" },
	{ icon: Youtube, name: "YouTube", href: "#" },
];

export default function Footer01() {
	return (
		<footer id="footer" className="container px-0 pt-20 md:pt-10 pb-10">
			<div className="px-10 py-5 bg-primary-color rounded-lg md:bg-primary-color py-0 ">
				<div className="flex flex-col md:py-12">
					<div className="flex flex-col gap-6 md:flex-row md:justify-between">
						<div className="space-y-4">
							<Link to="/" className="flex items-center gap-1 text-primary">
								<img src={laPinceLogo} height={10} width={60} />
								<span className="text-xl font-bold text-white">La Pince</span>
							</Link>
						</div>
						<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
							<div className="space-y-3">
								<h4 className="text-white font-semibold">PRODUCT</h4>
								<ul className="space-y-2">
									{footerLinks.product.map((link) => (
										<li key={link.name}>
											<a
												href={link.href}
												className="text-sm text-white hover:text-foreground"
											>
												{link.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="space-y-3">
								<h4 className="text-white font-semibold">LINKS</h4>
								<ul className="space-y-2">
									{footerLinks.company.map((link) => (
										<li key={link.name}>
											<a
												href={link.href}
												className="text-sm text-white hover:text-foreground"
											>
												{link.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="space-y-3">
								<h4 className="text-white font-semibold">LÉGAL</h4>
								<ul className="space-y-2">
									{footerLinks.legal.map((link) => (
										<li key={link.name}>
											<Link
												to={link.href}
												className="text-sm text-white hover:text-foreground"
											>
												{link.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
					<Separator className="my-8 bg-accent" />
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-sm text-white">
							© 2025 La Pince All rights reserved.
						</p>
						<div className="flex items-center space-x-4">
							<ul className="flex items-center gap-4">
								{socialLinks.map(({ icon: Icon, href }, idx) => (
									<li key={idx}>
										<a
											href={href}
											className="group inline-flex cursor-pointer items-center justify-start gap-1 text-white duration-200 hover:text-foreground hover:opacity-90"
										>
											<Icon className="w-5 h-5" />
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
