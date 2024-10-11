'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocation } from '@/hooks/useLocation'
import { PostLocationPayload } from '@/types/location.type'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { locationSchema } from '@/lib/zodSchemas'

interface AddLocationDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddLocationDialog({ isOpen, onClose }: AddLocationDialogProps) {
  const { postLocation, getAllLocations } = useLocation()
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(locationSchema)

  const onSubmit = async (data: PostLocationPayload) => {
    const error = await postLocation(data)

    if (error) {
      showNotification(`Thêm vị trí thất bại: ${error.content}`, 'error')
    } else {
      showNotification('Vị trí đã được thêm thành công!', 'success')
      await getAllLocations() // Làm mới danh sách location
      form.reset() // Reset form
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Thêm Mới Vị Trí</DialogTitle>
          <DialogDescription>Điền thông tin dưới đây và bấm nút hoàn thành để có thể thêm mới</DialogDescription>
        </DialogHeader>
        <div className='overflow-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='tenViTri'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Vị Trí</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tên vị trí'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.tenViTri}
                        autoComplete='tenViTri'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='tinhThanh'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh Thành</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tỉnh thành'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.tinhThanh}
                        autoComplete='tinhThanh'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quocGia'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quốc Gia</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập quốc gia'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.quocGia}
                        autoComplete='quocGia'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='hinhAnh'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình Ảnh (URL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập URL hình ảnh'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.hinhAnh}
                        autoComplete='hinhAnh'
                      />
                    </FormControl>
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
