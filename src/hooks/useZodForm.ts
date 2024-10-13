'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'

export const useZodForm = <T extends z.ZodTypeAny>(
  schema: T,
  options?: Partial<Parameters<typeof useForm<z.infer<T>>>[0]>
): UseFormReturn<z.infer<T>> => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...options
  })
}
