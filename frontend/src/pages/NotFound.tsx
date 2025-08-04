import { ArrowLeft, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import laPinceLogo from '@/assets/logo.webp';
import { Button } from '@/components/ui/button';
import { DefaultWrapper } from '@/layouts/DefaultWrapper';

const NotFound = () => {
	const location = useLocation();
	const { t } = useTranslation();

	const handleGoHome = () => {
		window.location.href = '/';
	};

	return (
		<DefaultWrapper key={location.pathname}>
			<div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background via-background to-primary-color/30">
				<div className="max-w-3xl w-full text-center">
					<div className="mb-12 flex justify-center">
						<img
							src={laPinceLogo}
							alt="La Pince"
							className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
						/>
					</div>

					<div className="mb-12 relative">
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-[12rem] md:text-[16rem] font-black text-primary-color/5 select-none">
								404
							</div>
						</div>
						<div className="relative z-10">
							<div className="text-7xl md:text-8xl font-black text-primary-color mb-4">
								4<span className="text-secondary-color animate-pulse">0</span>4
							</div>
							<div className="h-1 w-24 bg-gradient-to-r from-primary-color to-secondary-color mx-auto rounded-full"></div>
						</div>
					</div>

					<div className="mb-12 space-y-6">
						<h1 className="text-4xl md:text-5xl font-bold text-secondary-color mb-6 leading-tight">
							{t('home.notFound.title')}
						</h1>
						<div className="max-w-lg mx-auto">
							<p className="text-xl text-muted-foreground leading-relaxed mb-6">
								{t('home.notFound.description')}
							</p>
						</div>
					</div>

					<div className="flex p-4 border-t border-neutral-300 D dark:border-neutral-300/20 mt-4 flex-col sm:flex-row gap-4 justify-center items-center mb-8">
						<Button
							variant="blue"
							onClick={() => window.history.back()}
							className="flex items-center gap-2 px-6 py-3"
						>
							<ArrowLeft className="w-5 h-5" />
							{t('home.notFound.back')}
						</Button>

						<Button
							variant="outline"
							onClick={handleGoHome}
							className="flex items-center gap-2 px-6 py-3"
						>
							<Home className="w-5 h-5" />
							{t('home.notFound.backToHome')}
						</Button>
					</div>
				</div>
			</div>
		</DefaultWrapper>
	);
};

export default NotFound;
