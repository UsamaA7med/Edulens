import { createBrowserRouter, Navigate } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage'
import TeacherLayout from './layouts/TeacherLayout'
import TeacherQuestionBank from './pages/teacher/TeacherQuestionBank'
import TeacherExamsPage from './pages/teacher/TeacherExamsPage'
import TeacherResultsPage from './pages/teacher/TeacherResultsPage'
import CheckAuth from './CheckAuth'
import StudentLayout from './layouts/StudentLayout'
import StudentDashboardPage from './pages/student/StudentDashboardPage'
import StudentExamInfoPage from './pages/student/StudentExamInfoPage'
import StudentExamPage from './pages/student/StudentExamPage'
import StudentExamResultPage from './pages/student/StudentExamResultPage'

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
      {
        path: 'examInfo/:id',
        element: <StudentExamInfoPage />,
      },
      {
        path: 'exam/:id',
        element: <StudentExamPage />,
      },
      {
        path: 'exam/result/:id',
        element: <StudentExamResultPage />,
      },
    ],
  },
])

export default router
