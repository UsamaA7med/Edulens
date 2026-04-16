import useStudent from '@/store/useStudent'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'

const ResultDetailsCard = () => {
  const { attempt } = useStudent()
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col  justify-between gap-5">
          <h1 className="text-lg">Exam Details</h1>
          <div className="flex justify-between">
            <p className="text-muted-foreground">Exam Title</p>
            <p>{attempt?.attempt.exam.examTitle}</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <p className="text-muted-foreground">Teacher</p>
            <p>{attempt?.attempt.teacher.fullName}</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <p className="text-muted-foreground">Time Taken</p>
            <p>{attempt?.attempt.timeTaken}</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <p className="text-muted-foreground">Status</p>
            <p
              className={`${attempt?.attempt.status === 'passed' ? 'text-green-500' : 'text-red-500'}`}
            >
              {attempt?.attempt.status}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResultDetailsCard
