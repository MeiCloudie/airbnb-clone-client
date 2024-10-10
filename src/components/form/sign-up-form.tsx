'use client'

import React, { useEffect } from 'react'
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
import { useToastifyNotification } from '@/hooks/useToastifyNotification'

const SignUpForm = () => {
  const router = useRouter()
  const { signUp, isLoading, error } = useAuth()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(signUpSchema)

  const onSubmit = async (data: SignUpPayload) => {
    setHasSubmitted(true)
    await signUp(data)
  }

  useEffect(() => {
    if (hasSubmitted && !error && !isLoading) {
      showNotification('Đăng ký thành công!', 'success')
      router.push('/sign-in')
    }
    if (hasSubmitted && error) {
      form.setError('root', { message: error })
      showNotification(error, 'error')
    }
  }, [error, isLoading, hasSubmitted, router, form, showNotification])

  return (
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
                <Input
                  placeholder='Nhập họ tên của bạn'
                  {...field}
                  value={field.value || ''}
                  hasError={!!form.formState.errors.name}
                />
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
                  value={field.value || ''}
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
                  value={field.value || ''}
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
                  value={field.value || ''}
                  hasError={!!form.formState.errors.confirmPassword}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
  )
}

export default SignUpForm
