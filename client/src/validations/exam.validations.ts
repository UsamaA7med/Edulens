import { z } from 'zod'

export const createExamSchema = z.object({
  examTitle: z.string().min(1, 'Title is required'),
  examDuration: z
    .number()
    .min(1)
    .nullable()
    .refine((val) => val !== null, {
      message: 'Duration is required',
    }),
  questions: z.array(z.string()).min(1, 'Questions are required'),
})

export type TCreateExam = z.infer<typeof createExamSchema>
