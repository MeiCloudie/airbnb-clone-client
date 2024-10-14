'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@/hooks/useUser'
import { PutUserPayload, User } from '@/types/auth.type'
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
import { Controller } from 'react-hook-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { userUpdateSchema } from '@/lib/zodSchemas'

interface UpdateUserDialogProps {
  isOpen: boolean
  onClose: () => void
  userData: User
}

export default function UpdateUserDialog({ isOpen, onClose, userData }: UpdateUserDialogProps) {
  const { putUser, getAllUsers, getUserById } = useUser()
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(userUpdateSchema, {
    defaultValues: {
      id: Number(userData.id),
      name: userData.name ?? '',
      email: userData.email,
      phone: userData.phone ?? undefined,
      birthday: undefined, // Tạm thời là undefined để ko lỗi
      gender: userData.gender,
      role: userData.role
    }
  })

  const onSubmit = async (data: PutUserPayload) => {
    const error = await putUser(data)

    if (error) {
      showNotification(`Cập nhật người dùng thất bại: ${error.content}`, 'error')
    } else {
      showNotification('Người dùng đã được cập nhật thành công!', 'success')
      await getAllUsers()
      form.reset()
      onClose()
      await getUserById({ id: Number(userData.id) })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Cập Nhật Người Dùng</DialogTitle>
          <DialogDescription>Điền thông tin dưới đây và bấm nút hoàn thành để có thể cập nhật</DialogDescription>
        </DialogHeader>
        <div className='overflow-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập ID'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.id}
                        autoComplete='id'
                        readOnly
                      />
                    </FormControl>
                    <FormDescription>Bạn không được chỉnh sửa ID.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
