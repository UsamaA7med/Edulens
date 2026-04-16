import { Card, CardContent } from '../ui/card'
import { LuFileSpreadsheet } from 'react-icons/lu'
import FormDialog from './FormDialog'
const formTitles = ['Form A', 'Form B', 'Form C', 'Form D']
const ExamCard = ({
  title,
  numberOfQuestions,
  duration,
  forms,
}: {
  title: string
  numberOfQuestions: number
  duration: number
  forms: {
    questions: {
      question: {
        _id: string
        question: string
      }
      options: {
        _id: string
        text: string
        isCorrect: boolean
      }[]
    }[]

    _id: string
  }[]
}) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2 justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <LuFileSpreadsheet size={20} />
          </div>
          <p className="text-sm text-muted-foreground">
            {numberOfQuestions} questions &middot; {duration} minutes
          </p>
        </div>
        <div>
          <p>
            4 versions automatically generated with shuffled questions and
            options
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {forms.map((form, idx) => (
            <FormDialog key={form._id} form={form} title={formTitles[idx]} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ExamCard
