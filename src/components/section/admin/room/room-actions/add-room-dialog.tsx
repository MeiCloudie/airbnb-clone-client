'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRoom } from '@/hooks/useRoom'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { roomSchema } from '@/lib/zodSchemas'
import { PostRoomPayload } from '@/types/room.type'
import { useLocation } from '@/hooks/useLocation'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface AddRoomDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddRoomDialog({ isOpen, onClose }: AddRoomDialogProps) {
  const { postRoom, getAllRooms } = useRoom()
  const { getAllLocations, dataAllLocations } = useLocation()
  const { showNotification } = useToastifyNotification()

  const form = useZodForm(roomSchema)

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  const onSubmit = async (data: PostRoomPayload) => {
    const error = await postRoom(data)

    if (error) {
      showNotification(`Thêm phòng thất bại: ${error.content}`, 'error')
    } else {
      showNotification('Phòng đã được thêm thành công!', 'success')
      await getAllRooms()
      form.reset()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='h-full md:max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='uppercase'>Thêm Mới Phòng</DialogTitle>
          <DialogDescription>Điền thông tin dưới đây và bấm nút hoàn thành để có thể thêm mới</DialogDescription>
        </DialogHeader>
        <div className='overflow-auto'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
              <FormField
                control={form.control}
                name='tenPhong'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Phòng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tên phòng'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.tenPhong}
                        autoComplete='tenPhong'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='khach'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Khách</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập số khách'
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        hasError={!!form.formState.errors.khach}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phongNgu'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Phòng Ngủ</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập số phòng ngủ'
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        hasError={!!form.formState.errors.phongNgu}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='giuong'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Giường</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập số giường'
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        hasError={!!form.formState.errors.giuong}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phongTam'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Phòng Tắm</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập số phòng tắm'
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        hasError={!!form.formState.errors.phongTam}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='moTa'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô Tả</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Nhập mô tả phòng'
                        {...field}
                        value={field.value || ''}
                        hasError={!!form.formState.errors.moTa}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='giaTien'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá Tiền ($/đêm)</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Nhập giá tiền'
                        {...field}
                        value={field.value || 0}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        hasError={!!form.formState.errors.giaTien}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <p className='text-sm font-semibold my-3'>Chọn Tiện Nghi</p>
              </div>
              <div className='grid grid-cols-3 gap-4 pb-2'>
                {[
                  { label: 'Máy Giặt', name: 'mayGiat' as const },
                  { label: 'Bàn Là', name: 'banLa' as const },
                  { label: 'Tivi', name: 'tivi' as const },
                  { label: 'Điều Hòa', name: 'dieuHoa' as const },
                  { label: 'Wifi', name: 'wifi' as const },
                  { label: 'Bếp', name: 'bep' as const },
                  { label: 'Đỗ Xe', name: 'doXe' as const },
                  { label: 'Hồ Bơi', name: 'hoBoi' as const },
                  { label: 'Bàn Ủi', name: 'banUi' as const }
                ].map((amenity) => (
                  <FormField
                    key={amenity.name}
                    control={form.control}
                    name={amenity.name}
                    render={({}) => (
                      <FormItem>
                        <div className='flex items-center justify-start'>
                          <Controller
                            control={form.control}
                            name={amenity.name}
                            render={({ field }) => (
                              <Checkbox checked={field.value ?? true} onCheckedChange={field.onChange} />
                            )}
                          />
                          <FormLabel className='ms-2'>{amenity.label}</FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormField
                control={form.control}
                name='maViTri'
                render={({}) => (
                  <FormItem>
                    <FormLabel>Mã Vị Trí</FormLabel>
                    <Controller
                      control={form.control}
                      name='maViTri'
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange(parseInt(value, 10))} // Chuyển thành number
                          value={field.value ? String(field.value) : undefined} // Kiểm tra và hiển thị placeholder
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Chọn vị trí' />
                          </SelectTrigger>
                          <SelectContent>
                            {dataAllLocations?.content.map((location) => (
                              <SelectItem key={location.id} value={String(location.id)}>
                                {location.tenViTri}, {location.tinhThanh}, {location.quocGia}
                              </SelectItem>
                            ))}
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
