import { Button } from '../ui/button'
import { LuEye } from 'react-icons/lu'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useState } from 'react'
import { Separator } from '../ui/separator'

const FormDialog = ({
  form,
  title,
}: {
  form: {
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
  }
  title: string
}) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <LuEye className="text-primary" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg -mx-4 max-h-[50vh] overflow-y-auto px-4">
        <DialogTitle>Preview: {title}</DialogTitle>
        <Separator />
        {form.questions.map((question, idx) => (
          <div key={question.question._id} className="flex flex-col gap-2">
            <h4 className="font-medium">
              <span className="text-muted-foreground">Question {idx + 1}:</span>{' '}
              {question.question.question}
            </h4>
            {question.options.map((option, idx) => (
              <ul
                className="list-disc pl-5 flex flex-col gap-1"
                key={option._id}
              >
                <li key={idx}>
                  {option.text}{' '}
                  {option.isCorrect && (
                    <span className="text-green-600 text-xs">(Correct)</span>
                  )}
                </li>
              </ul>
            ))}
            <Separator />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog
