import ExamCard from '@/components/teacher/ExamCard'
import { GenerateExamDialog } from '@/components/teacher/GenerateExamDialog'

const TeacherExamsPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Exam Management</h1>
          <p className="text-muted-foreground">
            Create and manage examination versions
          </p>
        </div>
        <GenerateExamDialog />
      </div>
      <ExamCard title="Example Exam" numberOfQuestions={10} duration={60} />
    </div>
  )
}

export default TeacherExamsPage
