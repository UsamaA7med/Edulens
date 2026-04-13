import { z } from 'zod'

const createUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.enum(['student', 'teacher']),
})

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type TCreateUser = z.infer<typeof createUserSchema>
type TLoginUser = z.infer<typeof loginUserSchema>

export { createUserSchema, loginUserSchema, type TCreateUser, type TLoginUser }
