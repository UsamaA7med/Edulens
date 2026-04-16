import { ScrollArea } from '../ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import useQuestion from '@/store/useQuestion'

const GenerateExamScrollArea = ({
  onChange,
  value,
}: {
  onChange: (value: string[]) => void
  value: string[]
}) => {
  const { questions } = useQuestion()

  const handleCheckBoxChange = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((qId) => qId !== id))
    } else {
      onChange([...value, id])
    }
  }

  return (
    <ScrollArea className="h-72 overflow-y-auto rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">
          Select Questions
        </h4>

        <FieldSet>
          <FieldGroup className="gap-3">
            {questions?.map((question) => (
              <Field orientation="horizontal" key={question._id}>
                <Checkbox
                  id={question._id}
                  checked={value.includes(question._id)}
                  onCheckedChange={() => handleCheckBoxChange(question._id)}
                />

                <FieldLabel htmlFor={question._id} className="font-normal">
                  {question.question}
                </FieldLabel>
              </Field>
            ))}
          </FieldGroup>
        </FieldSet>
      </div>
    </ScrollArea>
  )
}

export default GenerateExamScrollArea
