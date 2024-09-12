import { z } from 'zod'

const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters' })

export const registrationSchema = z
  .object({
    username: z.string().min(2, { message: 'Username must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  })
