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
      <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your name' {...field} hasError={!!form.formState.errors.name} />
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
                    placeholder='Enter your email'
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Re-enter your password'
                    {...field}
                    hasError={!!form.formState.errors.confirmPassword}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error message */}
          {/* Chỉ hiển thị lỗi nếu không phải null và form đã được submit */}
          {hasSubmitted && error && <p className='text-red-500 text-sm'>{error}</p>}

          {/* Submit button */}
          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'} {/* Hiển thị trạng thái loading */}
          </Button>
        </form>
      </Form>
    </div>
  )
}
