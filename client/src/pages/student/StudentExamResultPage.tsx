import ResultCard from '@/components/student/ResultCard'
import ResultDetailsCard from '@/components/student/ResultDetailsCard'
import useStudent from '@/store/useStudent'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const StudentExamResultPage = () => {
  const { getAttempt } = useStudent()
  const { id } = useParams()
  useEffect(() => {
    getAttempt(id!)
  }, [id])
  return (
    <div className="flex flex-col justify-center items-center gap-5 ">
      <div className="w-1/2 min-w-sm">
        <ResultCard />
      </div>
      <div className="w-1/2 min-w-sm">
        <ResultDetailsCard />
      </div>
    </div>
  )
}

export default StudentExamResultPage
