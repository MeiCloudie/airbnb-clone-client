import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Họ Tên là bắt buộc' })
      .max(50, { message: 'Họ Tên không được vượt quá 50 ký tự' })
      .regex(/^[A-Za-zÀ-ỹ\s]+$/, { message: 'Họ Tên chỉ có thể chứa các chữ cái' })
      .refine((value) => value.trim().length > 0, { message: 'Tên không thể chỉ chứa khoảng trắng' }),
    email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' })
      .max(15, { message: 'Vui lòng nhập không quá 15 ký tự' })
      .refine((value) => !/\s/.test(value), { message: 'Mật khẩu không được chứa khoảng trắng' })
      .refine((value) => /[A-Z]/.test(value), { message: 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa' })
      .refine((value) => /[0-9]/.test(value), { message: 'Mật khẩu phải chứa ít nhất một số' })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt'
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword']
  })

export const signInSchema = z.object({
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải chứa ít nhất 6 ký tự' })
})
