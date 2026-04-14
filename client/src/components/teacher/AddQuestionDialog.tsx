import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useQuestion from '@/store/useQuestion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoIosAdd } from 'react-icons/io'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { ImageDropArea } from './ImageDropArea'
import {
  createQuestionSchema,
  type TCreateQuestion,
} from '@/validations/teacher.validations'
import { Spinner } from '../ui/spinner'

export function AddQuestionDialog() {
  const { addQuestion, isLoading } = useQuestion()
  const [open, setOpen] = useState(false)
  const form = useForm<TCreateQuestion>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
      difficulty: 'easy',
      correctOption: '',
      image: undefined,
    },
  })
  const handleOnSubmit: SubmitHandler<TCreateQuestion> = async (data) => {
    try {
      const formattedData = {
        ...data,
        options: data.options.map((option, idx) => ({
          text: option.text,
          isCorrect: idx === Number(data.correctOption),
        })),
      }
      console.log(formattedData)
      const res = await addQuestion(formattedData)
      if (res.success) {
        toast.success(res.message)
        setOpen(false)
        form.reset()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error('An error occurred while registering the user.')
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="ml-auto">
          <IoIosAdd />
          Add Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="question"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Question</FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Image (Optional)</FieldLabel>
                  <ImageDropArea onChange={field.onChange} />
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <Controller
                  key={i}
                  name={`options.${i}.text`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Option {i + 1}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-xs"
                        />
                      )}
                    </Field>
                  )}
                />
              ))}
            </div>
            <Controller
              name="correctOption"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Correct Answer</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select Correct Answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[0, 1, 2, 3].map((i) => (
                          <SelectItem key={i} value={String(i)}>
                            Option {i + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="difficulty"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Difficulty</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs"
                    />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Adding Question</span>
                </>
              ) : (
                'Add Question'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
