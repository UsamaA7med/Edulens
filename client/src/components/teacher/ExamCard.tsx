import { Card, CardContent } from '../ui/card'
import { LuFileSpreadsheet } from 'react-icons/lu'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { LuEye } from 'react-icons/lu'

const ExamCard = ({
  title,
  numberOfQuestions,
  duration,
}: {
  title: string
  numberOfQuestions: number
  duration: number
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
        <div>
          <ToggleGroup
            type="single"
            size="sm"
            defaultValue="top"
            variant="outline"
            spacing={2}
          >
            <ToggleGroupItem value="formA">
              <LuEye />
              Form A
            </ToggleGroupItem>
            <ToggleGroupItem value="formB">
              <LuEye />
              Form B
            </ToggleGroupItem>
            <ToggleGroupItem value="formC">
              <LuEye />
              Form C
            </ToggleGroupItem>
            <ToggleGroupItem value="formD">
              <LuEye />
              Form D
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExamCard
