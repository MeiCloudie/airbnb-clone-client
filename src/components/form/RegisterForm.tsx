'use client' // Đảm bảo component chỉ chạy trên client-side

import { useZodForm } from '@/utils/validationUtils'
import { registrationSchema } from '@/lib/zodSchemas'
import { z } from 'zod'

type RegistrationData = z.infer<typeof registrationSchema>

export const RegisterForm = () => {
  const methods = useZodForm(registrationSchema)

  const onSubmit = (data: RegistrationData) => {
    console.log('Form Data:', data)
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...methods.register('username')} />
        {methods.formState.errors.username && <p>{methods.formState.errors.username?.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...methods.register('email')} />
        {methods.formState.errors.email && <p>{methods.formState.errors.email?.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input type='password' {...methods.register('password')} />
        {methods.formState.errors.password && <p>{methods.formState.errors.password?.message}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type='password' {...methods.register('confirmPassword')} />
        {methods.formState.errors.confirmPassword && <p>{methods.formState.errors.confirmPassword?.message}</p>}
      </div>

      <button type='submit'>Register</button>
    </form>
  )
}
