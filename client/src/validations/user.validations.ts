import { z } from 'zod'

const createUserSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: 'Full name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-zA-Z]/, {
        message: 'Password must contain at least one letter',
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    role: z.enum(['student', 'teacher'], { message: 'Please select a role' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

type TCreateUser = z.infer<typeof createUserSchema>

type TLoginUser = z.infer<typeof loginUserSchema>

export { createUserSchema, loginUserSchema, type TCreateUser, type TLoginUser }
