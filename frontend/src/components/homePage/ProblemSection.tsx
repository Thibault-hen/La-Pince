import { Brain, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Problem01() {
	const { t } = useTranslation();
	const problems = [
		{
			title: 'home.card.title1',
			description: 'home.card.description1',
			icon: <Zap className="w-6 h-6 text-primary-color" />, // par exemple, `EyeOff` de Lucide
		},
		{
			title: 'home.card.title2',
			description: 'home.card.description2',
			icon: <Shield className="w-6 h-6 text-primary-color" />,
		},
		{
			title: 'home.card.title3',
			description: 'home.card.description3',
			icon: <Brain className="w-6 h-6 text-primary-color" />,
		},
	];
	return (
		<section
			id="features"
			className="scroll-mt-25 shadow-lg bg-primary-color pb-10 pt-10 md:pb-22 md:pt-22 "
		>
			<div className="px-2 lg:px-18">
				<div className="text-center space-y-4 pb-16 mx-auto max-w-4xl  ">
					<h2 className="text-white mx-auto mt-4 text-3xl font-bold sm:text-5xl tracking-tight">
						{t('home.card.mainTitle')}
					</h2>
					<p className="text-xl text-white dark:text-muted-foreground pt-1">
						{t('home.card.mainDescription')}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 px-0 xl:px-30">
					{problems.map((problem) => (
						<div
							key={problem.title}
							className="last:lg:col-span-1 last:md:col-span-2 transform transition-all rounded-lg border text-card-foreground bg-background shadow-none p-5"
							style={{
								opacity: 1,
								filter: 'blur(0px)',
								transform: 'translateY(-6px)',
							}}
						>
							{/* Icône */}
							<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
								{problem.icon}
							</div>

							{/* Titre avec hauteur fixe mais meilleur espacement */}
							<h3 className="text-lg md:text-xl font-semibold mb-3 h-14 leading-tight">
								{t(problem.title)}
							</h3>

							{/* Description */}
							<p className="text-muted-foreground text-sm lg:text-base">
								{t(problem.description)}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
