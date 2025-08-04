import { BellRing, Check, CircleX } from 'lucide-react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthLoader } from '@/components/auth/AuthLoader';
import { Toaster } from '@/components/ui/sonner';
import { useHealth } from '@/hooks/use-health';
import { usePageProgress } from '@/hooks/use-progress-bar';
import { ServerErrorBanner } from './ServerErrorBanner';

export const RootLayout = () => {
	const { error } = useHealth();
	usePageProgress();
	return (
		<AuthLoader>
			{error && <ServerErrorBanner />}
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
			<Toaster
				icons={{
					success: <Check size={15} className="text-green-500" />,
					error: <CircleX size={15} className="text-red-500" />,
					info: <BellRing size={15} className="text-primary-color" />,
				}}
				duration={6000}
			/>
		</AuthLoader>
	);
};
