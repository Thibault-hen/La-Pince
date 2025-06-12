import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from './components/theme/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
