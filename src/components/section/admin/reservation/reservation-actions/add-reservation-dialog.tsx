'use client'

import { useZodForm } from '@/hooks/useZodForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { reservationSchema } from '@/lib/zodSchemas'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useReservation } from '@/hooks/useReservation'
import { useRoom } from '@/hooks/useRoom'
import { useUser } from '@/hooks/useUser'
import { ReservationPayload } from '@/types/reservation.type'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'

interface AddReservationDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddReservationDialog({ isOpen, onClose }: AddReservationDialogProps) {
  const { postReservation, getAllReservations } = useReservation()
  const { getAllRooms, allRooms } = useRoom()
  const { getAllUsers, allUsers } = useUser()

  const { showNotification } = useToastifyNotification()

  const form = useZodForm(reservationSchema)

  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: new Date()
  })
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [openRoom, setOpenRoom] = useState(false)
  const [openUser, setOpenUser] = useState(false)

  useEffect(() => {
    getAllRooms()
    getAllUsers()
  }, [getAllRooms, getAllUsers])

  const handleDateRangeChange = (range?: { from?: Date; to?: Date }) => {
    if (range?.from) {
      setSelectedDateRange(range as { from: Date; to?: Date })
    }
  }

  const onSubmit = async (data: ReservationPayload) => {
    const reservationData = {
      ...data,
      ngayDen: selectedDateRange.from?.toISOString() || '',
      ngayDi: selectedDateRange.to?.toISOString() || '',
      maPhong: Number(selectedRoom),
      maNguoiDung: Number(selectedUser)
    }

    // console.log('Reservation Data:', reservationData)

    const error = await postReservation(reservationData)

    if (!error) {
      showNotification('Đặt phòng đã được thêm thành công!', 'success')
      form.reset()
      onClose()
      await getAllReservations()
    } else {
      showNotification(`Thêm đặt phòng thất bại: ${error.content}`, 'error')
    }
  }

  const truncateString = (str: string, maxLength: number) => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='uppercase'>Thêm Mới Đặt Phòng</DialogTitle>
          <DialogDescription>Điền thông tin dưới đây và bấm nút hoàn thành để có thể thêm mới</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='maPhong'
              render={({}) => (
                <FormItem>
                  <FormLabel>Mã Phòng</FormLabel>
                  <Popover open={openRoom} onOpenChange={setOpenRoom}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openRoom}
                        className='w-full justify-between truncate'
                      >
                        {selectedRoom
                          ? `${selectedRoom} - ${truncateString(allRooms?.content.find((room) => room.id === Number(selectedRoom))?.tenPhong || '', 40)}`
                          : 'Chọn phòng...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput placeholder='Tìm kiếm phòng...' />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy phòng.</CommandEmpty>
                          <CommandGroup>
                            {allRooms?.content.map((room) => (
                              <CommandItem
                                key={room.id}
                                onSelect={() => {
                                  setSelectedRoom(String(room.id))
                                  setOpenRoom(false)
                                }}
                                className='truncate'
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedRoom === String(room.id) ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {`${room.id} - ${truncateString(room.tenPhong, 50)}`}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='maNguoiDung'
              render={({}) => (
                <FormItem>
                  <FormLabel>Mã Người Dùng</FormLabel>
                  <Popover open={openUser} onOpenChange={setOpenUser}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openUser}
                        className='w-full justify-between'
                      >
                        {selectedUser
                          ? `${selectedUser} - ${
                              allUsers?.content.find((user) => String(user.id) === selectedUser)?.name || ''
                            }`
                          : 'Chọn người dùng...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput placeholder='Tìm kiếm người dùng...' />
                        <CommandList>
                          <CommandEmpty>Không tìm thấy người dùng.</CommandEmpty>
                          <CommandGroup>
                            {allUsers?.content.map((user) => (
                              <CommandItem
                                key={user.id}
                                onSelect={() => {
                                  setSelectedUser(String(user.id))
                                  setOpenUser(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedUser === String(user.id) ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {user.id} - {user.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Popover>
              <PopoverTrigger asChild>
                <div className='flex gap-4'>
                  <div className='w-full space-y-2'>
                    <FormLabel>Ngày Đến</FormLabel>
                    <Input
                      readOnly
                      value={selectedDateRange.from ? format(selectedDateRange.from, 'dd/MM/yyyy') : ''}
                      placeholder='Chọn ngày đến'
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='w-full space-y-2'>
                    <FormLabel>Ngày Đi</FormLabel>
                    <Input
                      readOnly
                      value={selectedDateRange.to ? format(selectedDateRange.to, 'dd/MM/yyyy') : ''}
                      placeholder='Chọn ngày đi'
                      className='cursor-pointer'
                    />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-full'>
                <Calendar
                  mode='range'
                  selected={selectedDateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* Số lượng khách */}
            <FormField
              control={form.control}
              name='soLuongKhach'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số Lượng Khách</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Nhập số lượng khách'
                      {...field}
                      value={field.value || 0}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit' variant='success'>
                Hoàn Thành
              </Button>
              <Button variant='error' onClick={onClose}>
                Hủy
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
