import { z } from 'zod'

const createQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z.array(
    z.object({
      text: z.string().min(1, 'Option text is required'),
      isCorrect: z.boolean(),
    })
  ),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  image: z.string().optional(),
})

const updateQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required').optional(),
  options: z
    .array(
      z.object({
        _id: z.string(),
        text: z.string().min(1, 'Option text is required'),
        isCorrect: z.boolean(),
      })
    )
    .optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  correctOption: z.string().min(1, 'Correct option is required').optional(),
  image: z.string().optional(),
})

type TUpdateQuestion = z.infer<typeof updateQuestionSchema>

type TCreateQuestion = z.infer<typeof createQuestionSchema>

export {
  createQuestionSchema,
  updateQuestionSchema,
  type TCreateQuestion,
  type TUpdateQuestion,
}
