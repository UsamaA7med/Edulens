import { z } from 'zod'

export const createExamSchema = z.object({
  examTitle: z.string().min(1, 'Title is required'),
  examDuration: z.number().min(1, 'Duration is required'),
  questions: z.array(z.string()).min(1, 'Questions are required'),
})
