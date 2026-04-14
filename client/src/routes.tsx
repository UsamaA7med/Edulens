import { createBrowserRouter, Navigate } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage'
import TeacherLayout from './layouts/TeacherLayout'
import TeacherQuestionBank from './pages/teacher/TeacherQuestionBank'
import TeacherExamsPage from './pages/teacher/TeacherExamsPage'
import TeacherResultsPage from './pages/teacher/TeacherResultsPage'
import TeacherExportPage from './pages/teacher/TeacherExportPage'
import CheckAuth from './CheckAuth'
import StudentLayout from './layouts/StudentLayout'
import StudentDashboardPage from './pages/student/StudentDashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/auth',
    element: (
      <CheckAuth>
        <DefaultLayout />
      </CheckAuth>
    ),
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
  {
    path: '/teacher',
    element: (
      <CheckAuth>
        <TeacherLayout />
      </CheckAuth>
    ),
    children: [
      {
        path: 'dashboard',
        element: <TeacherDashboardPage />,
      },
      {
        path: 'question-bank',
        element: <TeacherQuestionBank />,
      },
      {
        path: 'exams',
        element: <TeacherExamsPage />,
      },
      {
        path: 'results',
        element: <TeacherResultsPage />,
      },
      {
        path: 'export',
        element: <TeacherExportPage />,
      },
    ],
  },
  {
    path: '/student',
    element: (
      <CheckAuth>
        <StudentLayout />
      </CheckAuth>
    ),
    children: [
      {
        path: 'dashboard',
        element: <StudentDashboardPage />,
      },
    ],
  },
])

export default router
