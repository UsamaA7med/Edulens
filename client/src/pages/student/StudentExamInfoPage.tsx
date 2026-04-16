import { Card, CardContent } from '@/components/ui/card'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { CiClock2 } from 'react-icons/ci'
import { RiErrorWarningLine } from 'react-icons/ri'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useStudent from '@/store/useStudent'
import { Spinner } from '@/components/ui/spinner'

const StudentExamInfoPage = () => {
  const { startExam, isLoading } = useStudent()
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const handleStartExam = async () => {
    try {
      const res = await startExam(id!)
      if (res.status) {
        navigate(`/student/exam/${id}`, {
          state: {
            examTitle: state?.examTitle,
          },
        })
      }
    } catch (error) {}
  }
  return (
    <div className="flex justify-center">
      <Card className="w-1/2 min-w-sm">
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl">{state?.examTitle}</h1>
              <p className="text-muted-foreground">
                Teacher: <span className="font-semibold">John Doe</span>
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex w-1/2 gap-3 bg-gray-100 p-5 rounded-md items-center">
                <LuFileSpreadsheet size={20} />
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Questions</p>
                  <p className="font-semibold">{state?.numberOfQuestions}</p>
                </div>
              </div>
              <div className="flex w-1/2 gap-3 bg-gray-100 p-5 rounded-md items-center">
                <CiClock2 size={20} />
                <div className="flex flex-col gap-1">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">{state?.duration} minutes</p>
                </div>
              </div>
            </div>
            <div className="flex bg-yellow-200/30 rounded-md border-yellow-200 text-muted-foreground p-5 gap-2">
              <RiErrorWarningLine size={20} />
              <div className="flex flex-col gap-2">
                <p>Important Instructions</p>
                <ul className="list-disc pl-5 flex flex-col gap-1">
                  <li>Once started, you cannot pause the exam</li>
                  <li>
                    You will be randomly assigned one of four exam versions
                  </li>
                  <li>Make sure you have a stable internet connection</li>
                  <li>Answer all questions before submitting</li>
                </ul>
              </div>
            </div>
            <Button onClick={handleStartExam} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Loading...</span>
                </>
              ) : (
                'Start Exam'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentExamInfoPage
