import { Brain, Zap, Shield } from "lucide-react";

export default function Problem01() {
	const problems = [
		{
			title: "Manque de visibilité",
			description:
				"Sans outil dédié, il est difficile de savoir où part son argent, ce qui rend la gestion quotidienne stressante et approximative.",
			icon: <Zap className="w-6 h-6 text-primary-color" />, // par exemple, `EyeOff` de Lucide
		},
		{
			title: "Budgets rapidement dépassés",
			description:
				"Sans suivi régulier et alertes, les utilisateurs dépassent involontairement leurs budgets et perdent le contrôle de leurs finances.",
			icon: <Shield className="w-6 h-6 text-primary-color" />,
		},
		{
			title: "Applications trop complexes",
			description:
				"Beaucoup d’outils financiers sont surchargés de fonctionnalités, ce qui décourage les utilisateurs à les utiliser au quotidien.",
			icon: <Brain className="w-6 h-6 text-primary-color" />,
		},
	];
	return (
		<section className=" shadow-lg bg-primary-color pb-10 pt-10 md:pb-22 md:pt-22 container ">
			<div className="text-center space-y-4 pb-16 mx-auto max-w-4xl">
				<h2 className=" text-white mx-auto mt-4 text-3xl font-bold sm:text-5xl tracking-tight">
					Reprenez le contrôle de vos dépenses
				</h2>
				<p className=" text-sky-200 text-xl text-muted-foreground pt-1">
					Des centaines d’utilisateurs font confiance à La Pince pour mieux
					gérer leur budget
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
				{problems.map((problem, index) => (
					<div
						key={index}
						className="transform transition-all rounded-lg border text-card-foreground bg-background shadow-none p-5 space-y-2"
						style={{
							opacity: 1,
							filter: "blur(0px)",
							transform: "translateY(-6px)",
						}}
					>
						<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
							{problem.icon}
						</div>
						<h3 className="text-lg md:text-xl font-semibold">
							{problem.title}
						</h3>
						<p className="text-muted-foreground">{problem.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
