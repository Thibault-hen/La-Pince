import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Dashboard } from './pages/App/Dashboard';
import { BudgetPage } from './pages/App/Budget';
import { Category } from './pages/App/Category';
import { Expense } from './pages/App/Expense';
import { Settings } from './pages/App/Settings';
import { AppLayout } from './layouts/AppLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Terms } from './pages/Terms';
import { ProtectedRoutes } from './components/auth/ProtectedRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/connexion',
        element: <Login />,
      },
      {
        path: '/inscription',
        element: <Register />,
      },
      {
        path: '/mentions-legales',
        element: <Terms />,
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
                element: <Dashboard />,
              },
              {
                path: 'budgets',
                element: <BudgetPage />,
              },
              {
                path: 'depenses',
                element: <Expense />,
              },
              {
                path: 'categories',
                element: <Category />,
              },
              {
                path: 'parametres',
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
