'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useZodForm } from '@/hooks/useZodForm'
import { signUpSchema } from '@/lib/zodSchemas'
import { SignUpPayload } from '@/types/auth.type'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'
import { PasswordInput } from '@/components/ui/password-input'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

export default function SignUp() {
  const router = useRouter()
  const { signUp, isLoading, error } = useAuth()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const form = useZodForm(signUpSchema)

  const onSubmit = async (data: SignUpPayload) => {
    setHasSubmitted(true)
    await signUp(data)

    if (!error) {
      // Nếu không có lỗi, chuyển hướng tới trang đăng nhập
      router.push('/sign-in')
    } else {
      // Nếu có lỗi, hiển thị lỗi
      form.setError('root', { message: error })
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <div className='flex flex-col space-y-2 mb-5 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Chào mừng bạn đến với Airbnb</h1>
        <p className='text-sm text-muted-foreground'>Hãy tạo tài khoản để trải nghiệm dịch vụ của chúng tôi</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ Tên</FormLabel>
                <FormControl>
                  <Input placeholder='Nhập họ tên của bạn' {...field} hasError={!!form.formState.errors.name} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Nhập email của bạn'
                    autoComplete='email'
                    {...field}
                    hasError={!!form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật Khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Nhập mật khẩu của bạn'
                    autoComplete='new-password'
                    {...field}
                    hasError={!!form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác Nhận Mật Khẩu</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder='Nhập lại mật khẩu của bạn'
                    autoComplete='new-password'
                    {...field}
                    hasError={!!form.formState.errors.confirmPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error message */}
          {hasSubmitted && error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* Submit button */}
          {isLoading ? (
            <Button className='w-full' disabled>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Vui Lòng Chờ
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Tiếp Tục
            </Button>
          )}
        </form>
      </Form>

      {/* Chuyển hướng đăng nhập */}
      <p className='text-center text-sm text-muted-foreground mt-2'>
        Bạn đã có tài khoản?{' '}
        <Button asChild variant='link' className='text-primary px-0'>
          <Link href={ROUTES.AUTH.SIGNIN}>Đăng Nhập</Link>
        </Button>
      </p>
    </div>
  )
}
