'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/useUser'
import { PostUserPayload } from '@/types/auth.type'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import { addUserSchema } from '@/lib/zodSchemas'
import { Controller } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { PasswordInput } from '@/components/ui/password-input'

interface AddUserDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddUserDialog({ isOpen, onClose }: AddUserDialogProps) {
  const { postUser, getAllUsers } = useUser()
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(addUserSchema)

  const onSubmit = async (data: PostUserPayload) => {
    const error = await postUser(data)

    if (error) {
      showNotification(`Thêm người dùng thất bại: ${error.content}`, 'error')
    } else {
      showNotification('Người dùng đã được thêm thành công!', 'success')
      await getAllUsers()
      form.reset()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Thêm Mới Người Dùng</DialogTitle>
          <DialogDescription>Điền thông tin dưới đây và bấm nút hoàn thành để có thể thêm mới</DialogDescription>
        </DialogHeader>
        <div className='overflow-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ Tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập họ tên'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.name}
                        autoComplete='name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập email'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.email}
                        autoComplete='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Nhập mật khẩu'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.password}
                        autoComplete='new-password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập số điện thoại'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.phone}
                        autoComplete=''
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='birthday'
                render={({}) => (
                  <FormItem>
                    <FormLabel>Ngày sinh</FormLabel>
                    <Controller
                      control={form.control}
                      name='birthday'
                      render={({ field: { onChange, value } }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !value && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className='mr-2 h-4 w-4' />
                              {value ? format(new Date(value), 'PPP') : <span>Chọn ngày sinh</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0'>
                            <Calendar
                              mode='single'
                              selected={value ? new Date(value) : undefined}
                              onSelect={(date) => onChange(date?.toISOString())}
                              initialFocus
                              captionLayout='dropdown-buttons'
                              fromYear={1960}
                              toYear={2030}
                            />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({}) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Controller
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(value === 'true')}
                          value={field.value?.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn giới tính' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='true'>Nam</SelectItem>
                            <SelectItem value='false'>Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='role'
                render={({}) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Controller
                      control={form.control}
                      name='role'
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn vai trò' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='USER'>USER</SelectItem>
                            <SelectItem value='ADMIN'>ADMIN</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className='mt-5 space-x-2'>
                  <Button type='submit' variant={'success'}>
                    Hoàn Thành
                  </Button>
                  <Button variant={'error'} onClick={onClose}>
                    Hủy
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
