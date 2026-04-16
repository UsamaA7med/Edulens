import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { IoIosLogOut } from 'react-icons/io'
import { useLocation, useNavigate } from 'react-router-dom'
import useUser from '@/store/useUser'
import toast from 'react-hot-toast'

export function SideBar({
  sidebarItems,
  isTeacher,
}: {
  sidebarItems: { label: string; href: string; icon: React.JSX.Element }[]
  isTeacher: boolean
}) {
  const { logout } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const { setOpenMobile } = useSidebar()

  const handleNavigate = (href: string) => {
    navigate(href)
    setOpenMobile(false)
  }

  const handleLogout = async () => {
    try {
      const res = await logout()
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error('An error occurred while logging out.')
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <h1>Smart Exam System</h1>
        <p className="text-xs text-muted-foreground">
          {isTeacher ? 'Teacher' : 'Student'} Portal
        </p>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-5 flex flex-col gap-3">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            size="lg"
            variant={location.pathname === item.href ? 'default' : 'outline'}
            className="hover:bg-primary hover:text-white flex justify-start duration-100 ease-in-out"
            onClick={() => handleNavigate(item.href)}
          >
            {item.icon}
            <span className="ml-1">{item.label}</span>
          </Button>
        ))}
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <Button
          variant="destructive"
          size="lg"
          className="flex justify-start"
          onClick={handleLogout}
        >
          <IoIosLogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
