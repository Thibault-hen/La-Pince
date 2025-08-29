import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const BANNER_NAME = 'educational-banner-dismissed';

export const EducationalBanner = () => {
	const [isActive, setIsActive] = useState(true);
	const { t } = useTranslation();
	useEffect(() => {
		const isDismissed = localStorage.getItem(BANNER_NAME);
		if (isDismissed === 'true') {
			setIsActive(false);
		}
	}, []);

	const handleDismiss = () => {
		localStorage.setItem(BANNER_NAME, 'true');
		setIsActive(false);
	};

	if (!isActive) {
		return null;
	}

	return (
		<div className="sticky flex flex-col md:flex-row justify-center items-center gap-3 font-bold bg-gradient-to-r from-primary-color/5 via-primary-color/20 to-primary-color/50 border-b border-primary-color text-xs text-center p-1 w-full">
			<span className="dark:text-white text-primary-color">
				{t('home.banner.info')}
			</span>
			<Button
				aria-label="Dismiss educational banner"
				className="relative max-h-[22px] max-w-[22px] p-0"
				variant="blue"
				onClick={handleDismiss}
			>
				<Check />
			</Button>
		</div>
	);
};
