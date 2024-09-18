'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { signInSchema } from '@/lib/zodSchemas'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

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
      <h1 className='text-2xl font-bold mb-4'>Sign In</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                    placeholder='Enter your email'
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
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
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
