import { z } from 'zod'

// AUTHENTICATION SCHEMAS
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

// USER SCHEMAS
export const userSchema = z.object({
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
  phone: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.boolean(), // true = Male, false = Female
  role: z.string()
})

// LOCATION SCHEMAS
export const locationSchema = z.object({
  tenViTri: z
    .string()
    .min(1, { message: 'Tên vị trí là bắt buộc' })
    .max(100, { message: 'Tên vị trí không được vượt quá 100 ký tự' }),
  tinhThanh: z
    .string()
    .min(1, { message: 'Tỉnh thành là bắt buộc' })
    .max(100, { message: 'Tỉnh thành không được vượt quá 100 ký tự' }),
  quocGia: z
    .string()
    .min(1, { message: 'Quốc gia là bắt buộc' })
    .max(100, { message: 'Quốc gia không được vượt quá 100 ký tự' }),
  hinhAnh: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Đường dẫn hình ảnh không hợp lệ'
    })
})

// ROOM SCHEMAS
export const roomSchema = z.object({
  tenPhong: z
    .string()
    .min(1, { message: 'Tên phòng là bắt buộc' })
    .max(100, { message: 'Tên phòng không được vượt quá 100 ký tự' }),

  khach: z.number().min(0, { message: 'Số lượng khách không được nhỏ hơn 0' }).default(0),

  giuong: z.number().min(0, { message: 'Số giường không được nhỏ hơn 0' }).default(0),

  phongTam: z.number().min(0, { message: 'Số phòng tắm không được nhỏ hơn 0' }).default(0),

  moTa: z
    .string()
    .min(1, { message: 'Mô tả là bắt buộc' })
    .max(500, { message: 'Mô tả không được vượt quá 500 ký tự' }),

  giaTien: z.number().min(0, { message: 'Giá tiền không được nhỏ hơn 0' }).default(0),

  mayGiat: z.boolean().default(true),
  banLa: z.boolean().default(true),
  tivi: z.boolean().default(true),
  dieuHoa: z.boolean().default(true),
  wifi: z.boolean().default(true),
  bep: z.boolean().default(true),
  doXe: z.boolean().default(true),
  hoBoi: z.boolean().default(true),
  banUi: z.boolean().default(true),

  maViTri: z.number().min(0, { message: 'Mã vị trí không hợp lệ' }),

  hinhAnh: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: 'Đường dẫn hình ảnh không hợp lệ'
    })
})
