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
import { ScrollArea } from '../ui/scroll-area'
import GenerateExamScrollArea from './GenerateExamScrollArea'
import ExamCard from './ExamCard'

export function GenerateExamDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm()

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
            onSubmit={form.handleSubmit((data) => {
              console.log(data)
            })}
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
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
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
            <GenerateExamScrollArea />
            <Button type="submit" size="lg">
              Create Exam
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
