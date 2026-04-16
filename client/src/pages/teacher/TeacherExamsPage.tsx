import ExamCard from '@/components/teacher/ExamCard'
import { GenerateExamDialog } from '@/components/teacher/GenerateExamDialog'
import useExam from '@/store/useExam'

const TeacherExamsPage = () => {
  const { exams } = useExam()
  console.log(exams)
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {exams?.map((exam) => (
          <ExamCard
            key={exam._id}
            title={exam.examTitle}
            numberOfQuestions={exam.forms[0].questions.length}
            forms={exam.forms}
            duration={exam.examDuration}
          />
        ))}
      </div>
    </div>
  )
}

export default TeacherExamsPage
