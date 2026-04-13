import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <DefaultLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
])

export default router
