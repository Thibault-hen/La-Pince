import { BellRing, Check, CircleX } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthLoader } from '@/components/auth/AuthLoader';
import { Toaster } from '@/components/ui/sonner';
import { useHealth } from '@/hooks/use-health';
import { usePageProgress } from '@/hooks/use-progress-bar';
import { ServerErrorBanner } from './ServerErrorBanner';

const TOAST_CONFIG = {
	success: <Check size={15} className="text-green-500" />,
	error: <CircleX size={15} className="text-red-500" />,
	info: <BellRing size={15} className="text-primary-color" />,
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
			<Toaster icons={TOAST_CONFIG} duration={6000} />
		</AuthLoader>
	);
};
