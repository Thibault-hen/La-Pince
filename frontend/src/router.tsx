import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Dashboard } from './pages/App/Dashboadrd'
import { Budget } from './pages/App/Budget'
import { Category } from './pages/App/Category'
import { Expense } from './pages/App/Expense'
import { Settings } from './pages/App/Settings'
import { AppLayout } from './layouts/AppLayout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Terms } from './pages/Terms'

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/dashboard',
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
                element: <Budget />,
              },
              {
                path: 'expenses',
                element: <Expense />,
              },
              {
                path: 'categories',
                element: <Category />,
              },
              {
                path: 'settings',
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
])
