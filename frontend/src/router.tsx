import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';
import { RootLayout } from './layouts/RootLayout';
import { MainLoader } from './components/ui/MainLoader';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/App/Dashboard'));
const BudgetPage = lazy(() => import('./pages/App/Budget'));
const CategoryPage = lazy(() => import('./pages/App/Category'));
const Expense = lazy(() => import('./pages/App/Expense'));
const SettingsPage = lazy(() => import('./pages/App/Settings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Terms = lazy(() => import('./pages/Terms'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <SuspenseWrapper>
            <ResetPassword />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/connexion',
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/inscription',
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/mentions-legales',
        element: (
          <SuspenseWrapper>
            <Terms />
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
                    <Dashboard />
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
                    <Expense />
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
        <NotFound />
      </SuspenseWrapper>
    ),
  },
]);
