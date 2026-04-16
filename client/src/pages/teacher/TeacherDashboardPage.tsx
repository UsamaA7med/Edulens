import { Card, CardContent } from '@/components/ui/card'
import { GoBook } from 'react-icons/go'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { LuUsers } from 'react-icons/lu'
import { Progress } from '@/components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'
import { useEffect, useState } from 'react'
import axios from 'axios'

type TAnalytics = {
  questionAnalytics: {
    easy: number
    medium: number
    hard: number
  }
  numberOfExams: number
  totalQuestions: number
  totalStudents: number
  averageTime: number
}

const statistics = [
  {
    label: 'Total Questions',
    value: 5,
    icon: (
      <GoBook size={40} className="bg-gray-100 p-2 rounded-sm text-primary" />
    ),
  },
  {
    label: 'Active Exams',
    value: 3,
    icon: (
      <LuFileSpreadsheet
        size={40}
        className="bg-gray-100 p-2 rounded-sm text-green-600"
      />
    ),
  },
  {
    label: 'Students Enrolled',
    value: 50,
    icon: (
      <LuUsers
        size={40}
        className="bg-gray-100 p-2 rounded-sm text-purple-600"
      />
    ),
  },
]
const TeacherDashboardPage = () => {
  const [analytics, setAnalytics] = useState<TAnalytics | null>(null)
  const getAnalytics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/teacher/question/analytics`,
        {
          withCredentials: true,
        }
      )
      if (res.status === 200) {
        setAnalytics(res.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  statistics[0].value = analytics?.totalQuestions || 0
  statistics[1].value = analytics?.numberOfExams || 0
  statistics[2].value = analytics?.totalStudents || 0
  useEffect(() => {
    getAnalytics()
  }, [])
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your examination system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {statistics.map((stat) => (
            <Card key={stat.label} className="border border-gray-200">
              <CardContent>
                <div className="flex items-center justify-between p-3">
                  <div className="flex flex-col gap-5">
                    <p className="text-muted-foreground">{stat.label}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="border border-gray-200">
        <CardContent className="flex flex-col gap-5">
          <p className="text-lg font-semibold">Question Distribution</p>
          <Field className="w-full">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-muted-foreground">Easy</span>
              <span className="ml-auto">
                {analytics?.questionAnalytics.easy}
              </span>
            </FieldLabel>
            <Progress
              value={analytics?.questionAnalytics.easy}
              className="[&>div]:bg-green-600"
            />
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-muted-foreground">Medium</span>
              <span className="ml-auto">
                {analytics?.questionAnalytics.medium}
              </span>
            </FieldLabel>
            <Progress
              value={analytics?.questionAnalytics.medium}
              className="[&>div]:bg-yellow-600"
            />
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-muted-foreground">Hard</span>
              <span className="ml-auto">
                {analytics?.questionAnalytics.hard}
              </span>
            </FieldLabel>
            <Progress
              value={analytics?.questionAnalytics.hard}
              className="[&>div]:bg-red-600"
            />
          </Field>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeacherDashboardPage
