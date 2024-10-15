'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocation } from '@/hooks/useLocation'
import { Location, PutLocationPayload } from '@/types/location.type'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { locationUpdateSchema } from '@/lib/zodSchemas'

interface UpdateLocationDialogProps {
  isOpen: boolean
  onClose: () => void
  locationData: Location
}

export default function UpdateLocationDialog({ isOpen, onClose, locationData }: UpdateLocationDialogProps) {
  const { putLocation, getAllLocations, getLocationById } = useLocation()
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(locationUpdateSchema, {
    defaultValues: {
      id: Number(locationData.id),
      tenViTri: locationData.tenViTri,
      tinhThanh: locationData.tinhThanh,
      quocGia: locationData.quocGia,
      hinhAnh: locationData.hinhAnh ?? ''
    }
  })

  const onSubmit = async (data: PutLocationPayload) => {
    const error = await putLocation(data)

    if (error) {
      showNotification(`Cập nhật vị trí thất bại: ${error.content}`, 'error')
    } else {
      showNotification('Vị trí đã được cập nhật thành công!', 'success')
      await getAllLocations()
      form.reset()
      onClose()
      await getLocationById({ id: Number(locationData.id) })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Cập Nhật Vị Trí</DialogTitle>
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
