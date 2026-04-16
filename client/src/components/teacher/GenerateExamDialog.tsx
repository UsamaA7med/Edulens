import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { IoIosAdd } from 'react-icons/io'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import GenerateExamScrollArea from './GenerateExamScrollArea'
import {
  createExamSchema,
  type TCreateExam,
} from '@/validations/exam.validations'
import useExam from '@/store/useExam'
import toast from 'react-hot-toast'
import { Spinner } from '../ui/spinner'

export function GenerateExamDialog() {
  const { createExam, isLoading } = useExam()
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(createExamSchema),
    defaultValues: {
      examTitle: '',
      examDuration: null,
      questions: [],
    },
  })
  const onSubmitData: SubmitHandler<TCreateExam> = async (data) => {
    try {
      const res = await createExam(data)
      if (res.success) {
        toast.success(res.message)
        setOpen(false)
        form.reset()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error('error while creating exam')
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="ml-auto">
          <IoIosAdd />
          Create Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Exam</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          <form
            onSubmit={form.handleSubmit(onSubmitData)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="examTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Exam Title</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Midterm Exam"
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
              name="examDuration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Duration (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const val = e.target.value
                      field.onChange(val === '' ? null : Number(val))
                    }}
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
              name="questions"
              control={form.control}
              render={({ field }) => (
                <GenerateExamScrollArea
                  value={field.value || []}
                  onChange={field.onChange}
                />
              )}
            />
            <Button
              type="submit"
              size="lg"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Creating Exam...</span>
                </>
              ) : (
                'Create Exam'
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
