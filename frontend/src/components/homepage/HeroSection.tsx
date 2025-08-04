import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/home-page/hero_img1.png';
import { Button } from '@/components/ui/button';

export default function Hero05() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	return (
		<section className="relative flex items-center pb-20 pt-20 px-4 md:pb-32 md:pt-28 overflow-hidden">
			<div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-primary-color/8 via-primary-color/12 to-primary-color/8 rounded-full blur-3xl" />

			<div className="sm:px-6 lg:px-16">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
					<motion.div
						className="relative flex flex-col gap-8 items-center lg:items-start"
						initial={{ opacity: 0, x: -600 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.1,
							type: 'spring',
							stiffness: 150,
							damping: 15,
							mass: 0.8,
							delay: 0.3,
						}}
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-color/10 border border-primary-color/20 text-primary-color font-medium text-sm">
							<Sparkles className="w-4 h-4" />
							{t('home.hero.badge')}
						</div>

						<h1 className="bg-gradient-to-r from-primary-color via-primary-color to-foreground bg-clip-text text-transparent font-bold text-3xl md:text-4xl xl:text-5xl tracking-tight leading-tight text-center md:text-left">
							{t('home.hero.title')}
						</h1>

						<p className="text-muted-foreground text-center lg:text-left text-sm md:text-base xl:text-lg leading-relaxed max-w-2xl">
							{t('home.hero.description')}
						</p>

						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
							<Button
								variant="blue"
								size="lg"
								onClick={() => navigate('/register')}
							>
								{t('home.hero.cta')}
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
							</Button>
						</div>
					</motion.div>

					{/* Right Image */}
					<motion.div
						className="relative h-full"
						initial={{ opacity: 0, x: 600 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.1,
							type: 'spring',
							stiffness: 150,
							damping: 15,
							mass: 0.8,
							delay: 0.3,
						}}
					>
						<div className="absolute right-8 backdrop-blur-sm flex items-center gap-2 p-2 bg-secondary-color/10 border border-secondary-color/20 rounded-full">
							<div className="w-3 h-3 bg-secondary-color animate-pulse rounded-full" />
							<div>
								<div className="text-xs text-secondary-color uppercase tracking-widest">
									{t('home.hero.preview')}
								</div>
							</div>
						</div>

						<div className="relative h-full overflow-hidden">
							{/* Main Image */}
							<div className="relative z-10 p-8 h-full flex items-center justify-center">
								<img
									alt="Application La Pince - Tableau de bord"
									src={heroImage}
									className="max-w-full h-auto"
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
