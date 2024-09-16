import { ReactNode } from 'react'
import { useFormContext, FormProvider, FieldValues } from 'react-hook-form'

interface FormWrapperProps<T extends FieldValues> {
  onSubmit: (data: T) => void
  children: ReactNode
}

export const FormWrapper = <T extends FieldValues>({ onSubmit, children }: FormWrapperProps<T>) => {
  const methods = useFormContext<T>()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}
