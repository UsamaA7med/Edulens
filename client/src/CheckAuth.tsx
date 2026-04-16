import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Spinner } from './components/ui/spinner'
import useUser from './store/useUser'

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation()
  const { isAuthenticated, checkAuth, isCheckingAuth, user } = useUser()

  useEffect(() => {
    checkAuth()
  }, [])
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    )
  }
  if (!isAuthenticated && !pathname.includes('auth')) {
    return <Navigate to="/auth/login" />
  }
  if (isAuthenticated) {
    if (user?.role === 'student' && !pathname.includes('student')) {
      return <Navigate to="/student/dashboard" />
    }
    if (user?.role === 'teacher' && !pathname.includes('teacher')) {
      return <Navigate to="/teacher/dashboard" />
    }
  }
  if (
    !isAuthenticated &&
    (pathname.includes('teacher') || pathname.includes('student'))
  ) {
    return <Navigate to="/auth/login" />
  }
  if (
    isAuthenticated &&
    user?.role === 'student' &&
    pathname.includes('teacher')
  ) {
    return <Navigate to="/student/dashboard" />
  }
  if (
    isAuthenticated &&
    user?.role === 'teacher' &&
    pathname.includes('student')
  ) {
    return <Navigate to="/teacher/dashboard" />
  }
  return <>{children}</>
}

export default CheckAuth
