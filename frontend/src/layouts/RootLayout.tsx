import { BellRing, Check, CircleX } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/providers/AuthProvider';

export const RootLayout = () => {
	return (
		<AuthProvider>
			<Outlet />
			<Toaster
				icons={{
					success: <Check size={15} className="text-green-500" />,
					error: <CircleX size={15} className="text-red-500" />,
					info: <BellRing size={15} className="text-primary-color" />,
				}}
				duration={6000}
			/>
		</AuthProvider>
	);
};
