import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/theme/theme-provider';
import { router } from './router';
import './i18n';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<ThemeProvider>
				<AnimatePresence mode="wait">
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</AnimatePresence>
			</ThemeProvider>
		</StrictMode>,
	);
} else {
	console.error('Root element not found');
}
