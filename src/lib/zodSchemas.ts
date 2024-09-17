import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(50, { message: 'Name cannot exceed 50 characters' })
      .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters' })
      .refine((value) => value.trim().length > 0, { message: 'Name cannot be only spaces' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(15, { message: 'Please enter no more than 15 characters' })
      .refine((value) => !/\s/.test(value), { message: 'Password cannot contain spaces' })
      .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
      .refine((value) => /[0-9]/.test(value), { message: 'Password must contain at least one number' })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Password must contain at least one special character'
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }), // Xác thực email
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }) // Xác thực mật khẩu
})
