import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { AppLayout } from './layouts/AppLayout';
import { RootLayout } from './layouts/RootLayout';

const HomePage = lazy(() => import('./pages/Home'));
const DashboardPage = lazy(() => import('./pages/App/Dashboard'));
const BudgetPage = lazy(() => import('./pages/App/Budget'));
const CategoryPage = lazy(() => import('./pages/App/Category'));
const ExpensePage = lazy(() => import('./pages/App/Expense'));
const SettingsPage = lazy(() => import('./pages/App/Settings'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'));
const TosPage = lazy(() => import('./pages/Tos'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy'));
const LegalNoticePage = lazy(() => import('./pages/LegalNotice'));
const FaqPage = lazy(() => import('./pages/Faq'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicyPage />,
      },
      {
        path: '/tos',
        element: <TosPage />,
      },
      {
        path: '/legal-notice',
        element: <LegalNoticePage />,
      },
      {
        path: '/faq',
        element: <FaqPage />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoutes />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: 'budgets',
                element: <BudgetPage />,
              },
              {
                path: 'expenses',
                element: <ExpensePage />,
              },
              {
                path: 'categories',
                element: <CategoryPage />,
              },
              {
                path: 'settings',
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
