import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useStudent from '@/store/useStudent'
import { FiUser } from 'react-icons/fi'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { CiClock2 } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const StudentDashboardPage = () => {
  const { exams } = useStudent()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">My Exams</h1>
        <p className="text-muted-foreground">
          View and take your assigned examinations
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {exams?.map((exam) => (
          <Card key={exam._id} className="border border-gray-200">
            <CardContent>
              <div className="flex items-center justify-between p-3">
                <div className="flex w-full items-center justify-between gap-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-lg">{exam.examTitle}</p>
                    <div className="flex  justify-start flex-col md:flex-row gap-2 text-muted-foreground">
                      <p className="flex gap-2 items-center">
                        <FiUser size={18} />
                        {exam.teacher.fullName}
                      </p>
                      <p className="flex gap-2 items-center">
                        <LuFileSpreadsheet size={18} />
                        {exam.forms[0].questions.length} questions
                      </p>
                      <p className="flex gap-2 items-center">
                        <CiClock2 size={18} />
                        {exam.examDuration} minutes
                      </p>
                    </div>
                  </div>
                  <Button
                    size={'lg'}
                    onClick={() =>
                      navigate(`/student/examInfo/${exam._id}`, {
                        state: {
                          examTitle: exam.examTitle,
                          teacherName: exam.teacher.fullName,
                          numberOfQuestions: exam.forms[0].questions.length,
                          duration: exam.examDuration,
                        },
                      })
                    }
                  >
                    Start Exam
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudentDashboardPage
