import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { MainLoader } from './components/ui/MainLoader';
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
const TermsPage = lazy(() => import('./pages/Terms'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPassword'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<MainLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <SuspenseWrapper>
            <ResetPasswordPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/connexion',
        element: (
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/inscription',
        element: (
          <SuspenseWrapper>
            <RegisterPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/mentions-legales',
        element: (
          <SuspenseWrapper>
            <TermsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/tableau-de-bord',
        element: <ProtectedRoutes />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: (
                  <SuspenseWrapper>
                    <DashboardPage />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'budgets',
                element: (
                  <SuspenseWrapper>
                    <BudgetPage />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'depenses',
                element: (
                  <SuspenseWrapper>
                    <ExpensePage />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'categories',
                element: (
                  <SuspenseWrapper>
                    <CategoryPage />
                  </SuspenseWrapper>
                ),
              },
              {
                path: 'parametres',
                element: (
                  <SuspenseWrapper>
                    <SettingsPage />
                  </SuspenseWrapper>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
]);
