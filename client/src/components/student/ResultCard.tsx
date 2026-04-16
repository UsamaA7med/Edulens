import useStudent from '@/store/useStudent'
import { Card, CardContent } from '../ui/card'
import { VscError } from 'react-icons/vsc'
import { VscPass } from 'react-icons/vsc'

const ResultCard = () => {
  const { attempt } = useStudent()
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-5 p-10">
          <div className="flex flex-col items-center gap-2">
            {attempt?.attempt.status === 'passed' ? (
              <VscPass size={50} className="text-green-500" />
            ) : (
              <VscError size={50} className="text-red-500" />
            )}
            {attempt?.attempt.status === 'passed' ? (
              <p className="text-green-500 text-lg font-semibold">
                Congratulations
              </p>
            ) : (
              <p className="text-red-500 text-lg font-semibold">
                Better Luck Next Time
              </p>
            )}
            <p>
              <span className="text-4xl">{attempt?.attempt.score}</span>/
              <span className="text-2xl">{attempt?.numberOfQuestions}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 w-full">
            <div className="flex flex-col gap-3 items-center bg-gray-100 p-5 rounded-md">
              <p className="flex items-center gap-2 text-green-500">
                <VscPass size={20} /> Correct
              </p>
              <p>{attempt?.attempt.score}</p>
            </div>
            <div className="flex flex-col gap-3 items-center bg-gray-100 p-5 rounded-md">
              <p className="flex items-center gap-2 text-red-500">
                <VscError size={20} /> Incorrect
              </p>
              <p>{attempt?.numberOfQuestions! - attempt?.attempt.score!}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResultCard
