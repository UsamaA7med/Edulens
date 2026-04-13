import { z } from 'zod'

const createQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(
      z.object({
        text: z.string().min(1, 'Option text is required'),
        isCorrect: z.boolean().optional(),
      })
    )
    .min(4, 'four options are required')
    .max(4, 'only four options are allowed'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
})

const updateQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required').optional(),
  options: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, 'Option text is required'),
        isCorrect: z.boolean(),
      })
    )
    .optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
})

type TUpdateQuestion = z.infer<typeof updateQuestionSchema>

type TCreateQuestion = z.infer<typeof createQuestionSchema>

export {
  createQuestionSchema,
  updateQuestionSchema,
  type TCreateQuestion,
  type TUpdateQuestion,
}
