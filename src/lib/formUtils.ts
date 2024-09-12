import { UseFormReturn, DefaultValues, FieldValues } from 'react-hook-form'

export const resetForm = <T extends FieldValues>(methods: UseFormReturn<T>, defaultValues?: DefaultValues<T>) => {
  methods.reset(defaultValues)
}
