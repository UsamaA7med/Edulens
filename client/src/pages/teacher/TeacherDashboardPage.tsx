import { Card, CardContent } from '@/components/ui/card'
import { GoBook } from 'react-icons/go'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { LuUsers } from 'react-icons/lu'
import { FaRegClock } from 'react-icons/fa6'
import { Progress } from '@/components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'

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
  {
    label: 'Avg. Time',
    value: '25m',
    icon: (
      <FaRegClock
        size={40}
        className="bg-gray-100 p-2 rounded-sm text-red-600"
      />
    ),
  },
]
const TeacherDashboardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your examination system
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
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
              <span className="ml-auto">50</span>
            </FieldLabel>
            <Progress value={50} className="[&>div]:bg-green-600" />
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-muted-foreground">Medium</span>
              <span className="ml-auto">15</span>
            </FieldLabel>
            <Progress value={15} className="[&>div]:bg-yellow-600" />
          </Field>
          <Field className="w-full">
            <FieldLabel htmlFor="progress-upload">
              <span className="text-muted-foreground">Hard</span>
              <span className="ml-auto">15</span>
            </FieldLabel>
            <Progress value={15} className="[&>div]:bg-red-600" />
          </Field>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeacherDashboardPage
