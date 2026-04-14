import { SideBar } from '@/components/common/Sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { teacherSidebarItems } from '@/dummy'
import useUser from '@/store/useUser'
import { RiUser3Line } from 'react-icons/ri'

import { Outlet } from 'react-router-dom'

export default function TeacherLayout() {
  const { user } = useUser()
  return (
    <SidebarProvider>
      <SideBar sidebarItems={teacherSidebarItems} isTeacher={true} />
      <main className="flex-1">
        <div className="flex flex-col">
          <div className="flex items-center justify-between md:justify-end bg-white p-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex items-center gap-3">
              <RiUser3Line size={30} className="bg-gray-200 p-2 rounded-full" />
              <div>
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}
