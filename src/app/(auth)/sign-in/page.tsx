'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { signInSchema } from '@/lib/zodSchemas'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { PasswordInput } from '@/components/ui/password-input'
import { Loader2 } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const { signIn, isLoading, error } = useAuth()
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const form = useZodForm(signInSchema) // Sử dụng Zod để xác thực

  const onSubmit = async (data: { email: string; password: string }) => {
    setHasSubmitted(true)
    await signIn(data)

    if (!error) {
      router.push('/') // Chuyển hướng khi đăng nhập thành công
    } else {
      form.setError('root', { message: error }) // Hiển thị lỗi nếu có
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <div className='flex flex-col space-y-2 mb-5 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Chào mừng quay lại với Airbnb</h1>
        <p className='text-sm text-muted-foreground'>Hãy đăng nhập để trải nghiệm dịch vụ của chúng tôi</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
                    placeholder='Nhập email của bạn đã đăng ký'
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
                    autoComplete='current-password'
                    {...field}
                    hasError={!!form.formState.errors.password}
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

      {/* Chuyển hướng đăng ký */}
      <p className='text-center text-sm text-muted-foreground mt-2'>
        Bạn chưa có tài khoản?{' '}
        <Button asChild variant='link' className='text-primary px-0'>
          <Link href={ROUTES.AUTH.SIGNUP}>Đăng Ký</Link>
        </Button>
      </p>
    </div>
  )
}
