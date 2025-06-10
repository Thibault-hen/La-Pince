import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/home-page/hero_img1.png";

export default function Hero05() {
	return (
		<section className="pb-20 pt-36 md:pb-32 md:pt-28">
			<div className="container mx-auto sm:px-6 lg:px-8">
				<div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
					{/* Left Content */}
					<div>
						<h1 className="font-bold text-4xl md:text-7xl tracking-tighter">
							Maîtrisez vos finances, simplement.{" "}
							<div className="relative inline-flex">
								<span className="absolute inset-x-0 bottom-0 border-b-[30px] border-primary"></span>
								<span className="relative"></span>
							</div>
						</h1>
						<p className="mt-8 text-base sm:text-xl">
							Avec La Pince, suivez vos dépenses, gérez vos budgets et recevez
							des alertes avant les dépassements. Une application claire et
							efficace pour reprendre le contrôle de votre argent — dès
							aujourd’hui. Créez un compte gratuitement et commencez à
							économiser.
						</p>
					</div>

					{/* Right Image */}
					<div className="rounded-xl h-full md:bg-muted/70 md:p-3.5 md:ring-1 md:ring-inset md:ring-border">
						<div className="relative h-full overflow-hidden rounded-xl border md:rounded-lg">
							<img
								alt="preview landing"
								src={heroImage}
								style={{
									height: "100%",
									width: "100%",
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
