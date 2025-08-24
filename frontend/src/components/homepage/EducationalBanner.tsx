/** biome-ignore-all lint/suspicious/noDocumentCookie: <cookie to remember user choice of displaying a banner about the website purpose> */

import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

const COOKIE_NAME = 'educational-banner-dismissed';

export const EducationalBanner = () => {
	const [isActive, setIsActive] = useState(true);
	const { t } = useTranslation();
	useEffect(() => {
		const cookieValue = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${COOKIE_NAME}=`));
		if (cookieValue) {
			setIsActive(false);
		}
	}, []);

	const handleDismiss = () => {
		document.cookie = `${COOKIE_NAME}=true; max-age=31536000; path=/;`;
		setIsActive(false);
	};

	if (!isActive) {
		return null;
	}

	return (
		<div className="flex flex-col md:flex-row justify-center items-center gap-3 font-bold bg-gradient-to-r from-primary-color/5 via-primary-color/20 to-primary-color/50 border-b border-primary-color text-xs text-center p-1 w-full">
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
