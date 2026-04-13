import Navbar from '@/components/auth/Navbar'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div className="min-h-screen flex flex-col  gap-5">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default DefaultLayout
