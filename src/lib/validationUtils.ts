'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormReturn } from 'react-hook-form'

export const useZodForm = <T extends z.ZodTypeAny>(schema: T): UseFormReturn<z.infer<T>> => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onBlur'
  })
}
