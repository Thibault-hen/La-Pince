import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './components/theme/theme-provider'
import { AnimatePresence } from 'framer-motion'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
    </ThemeProvider>
  </StrictMode>
)
