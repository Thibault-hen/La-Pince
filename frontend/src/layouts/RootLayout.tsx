import { BellRing, Check, CircleX } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthLoader } from '@/components/auth/AuthLoader';
import { Toaster } from '@/components/ui/sonner';
import { useHealth } from '@/hooks/use-health';
import { usePageProgress } from '@/hooks/use-progress-bar';
import { ServerErrorBanner } from './ServerErrorBanner';

const TOAST_CONFIG = {
	icons: {
		success: <Check size={15} className="text-green-500" strokeWidth={2} />,
		error: <CircleX size={15} className="text-red-500" strokeWidth={2} />,
		info: <BellRing size={15} className="text-primary-color" strokeWidth={2} />,
	},
	classNames: {
		success: '!border-l-4 !border-l-green-500 !rounded',
		error: '!border-l-4 !border-l-red-500 !rounded',
		info: '!border-l-4 !border-l-indigo-500 !rounded',
	},
};

export const RootLayout = () => {
	const { error } = useHealth();
	const location = useLocation();
	usePageProgress();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <scroll back to the top when navigating>
	useEffect(() => {
		scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<AuthLoader>
			{error && <ServerErrorBanner />}
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
			<Toaster
				closeButton={true}
				icons={TOAST_CONFIG.icons}
				duration={6000}
				toastOptions={{ classNames: TOAST_CONFIG.classNames }}
			/>
		</AuthLoader>
	);
};
