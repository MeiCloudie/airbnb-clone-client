'use client'

import { resetForm } from '@/lib/formUtils'
import { useZodForm } from '@/lib/validationUtils'
import { registrationSchema } from '@/lib/zodSchemas'
import { z } from 'zod'

type RegistrationData = z.infer<typeof registrationSchema>

export const RegisterForm = () => {
  const methods = useZodForm(registrationSchema)

  const onSubmit = (data: RegistrationData) => {
    console.log('Form Data:', data)
    // resetForm(methods)
    resetForm(methods, {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  const renderError = (field: keyof RegistrationData) => {
    return methods.formState.errors[field] ? <p>{methods.formState.errors[field]?.message}</p> : null
  }

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...methods.register('username')} />
        {renderError('username')}
      </div>

      <div>
        <label>Email</label>
        <input {...methods.register('email')} />
        {renderError('email')}
      </div>

      <div>
        <label>Password</label>
        <input type='password' {...methods.register('password')} />
        {renderError('password')}
      </div>

      <div>
        <label>Confirm Password</label>
        <input type='password' {...methods.register('confirmPassword')} />
        {renderError('confirmPassword')}
      </div>

      <button type='submit'>Register</button>
    </form>
  )
}
