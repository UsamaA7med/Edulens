import { MdOutlineDashboard } from 'react-icons/md'

import { GoBook } from 'react-icons/go'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { IoIosStats } from 'react-icons/io'
import { TbDownload } from 'react-icons/tb'

export const teacherSidebarItems = [
  {
    label: 'Dashboard',
    href: '/teacher/dashboard',
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    label: 'Question Bank',
    href: '/teacher/question-bank',
    icon: <GoBook size={20} />,
  },
  {
    label: 'Exams',
    href: '/teacher/exams',
    icon: <LuFileSpreadsheet size={20} />,
  },
  {
    label: 'Results',
    href: '/teacher/results',
    icon: <IoIosStats size={20} />,
  },
]

export const studentSidebarItems = [
  {
    label: 'Dashboard',
    href: '/student/dashboard',
    icon: <MdOutlineDashboard size={20} />,
  },
]
