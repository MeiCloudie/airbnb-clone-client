import { convertUSDToVND } from '@/format/currency'
import React, { useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Minus, Plus } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

interface ReservationFormProps {
  roomId: string
}

const ReservationForm: React.FC<ReservationFormProps> = ({ roomId }) => {
  console.log('roomId in Form:' + roomId)

  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  })

  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    console.log('Selected Date Range:', dateRange)
    setSelectedDateRange(dateRange)
  }

  const customerTypes = [
    { id: 1, type: 'adults', label: 'Người lớn', description: 'Từ 13 tuổi trở lên' },
    { id: 2, type: 'children', label: 'Trẻ em', description: 'Độ tuổi 2 - 12' },
    { id: 3, type: 'infants', label: 'Em bé', description: 'Dưới 2 tuổi' },
    { id: 4, type: 'pets', label: 'Thú cưng', description: 'Bạn sẽ mang theo động vật phục vụ?' }
  ]

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
  })

  const totalGuests = guests.adults + guests.children + guests.infants

  const updateGuests = (type: string, action: 'increase' | 'decrease') => {
    setGuests((prevGuests) => {
      const value = prevGuests[type as keyof typeof guests]

      // Kiểm tra điều kiện tăng/giảm số lượng
      const updatedGuests = { ...prevGuests }
      if (action === 'increase') {
        updatedGuests[type as keyof typeof guests] = value + 1
      } else if (action === 'decrease' && value > 0 && (type !== 'adults' || value > 1)) {
        updatedGuests[type as keyof typeof guests] = value - 1
      }

      // Log kết quả sau khi thay đổi
      // console.log('Selected Guests:', updatedGuests)

      return updatedGuests
    })
  }

  return (
    <div>
      {/* Giá phòng (tính theo đêm) */}
      <h2 className='text-lg mb-5'>
        <span className='text-xl font-bold'>₫{convertUSDToVND(127)}</span> / đêm
      </h2>

      {/* Form đặt phòng */}
      {/* Bao gồm ngày nhận phòng, ngày trả phòng (disable before và api ngày đã được đặt) 
            và số lượng khách (Ràng buộc cứng: Tối đa 5 khách và disable thú cưng) */}
      <div>
        {/* Các input field */}
        <div>
          <div className='space-y-3'>
            <Popover>
              <PopoverTrigger asChild>
                <div className='cursor-pointer w-full flex gap-4 justify-center items-center'>
                  <div>
                    <p className='text-sm mb-2 font-semibold flex items-center'>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      Nhận phòng
                    </p>
                    <Input
                      readOnly
                      type='text'
                      placeholder='Ngày nhận phòng'
                      className='cursor-pointer'
                      value={selectedDateRange?.from ? format(selectedDateRange.from, "dd 'thg' MM, yyyy") : ''}
                    />
                  </div>
                  <div>
                    <p className='text-sm mb-2 font-semibold flex items-center'>
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      Trả phòng
                    </p>
                    <Input
                      readOnly
                      type='text'
                      placeholder='Ngày trả phòng'
                      className='cursor-pointer'
                      value={selectedDateRange?.to ? format(selectedDateRange.to, "dd 'thg' MM, yyyy") : ''}
                    />
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  initialFocus
                  mode='range'
                  defaultMonth={selectedDateRange?.from}
                  selected={selectedDateRange}
                  onSelect={handleDateRangeChange}
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <div className='cursor-pointer w-full'>
                  <p className='text-sm mb-2 font-semibold flex items-center'>
                    <FontAwesomeIcon icon={faUsers} className='mr-2 h-4 w-4' />
                    Khách
                  </p>
                  <Input
                    readOnly
                    type='text'
                    placeholder='Số lượng khách'
                    className='cursor-pointer'
                    value={`${totalGuests} khách${guests.pets > 0 ? ` và ${guests.pets} thú cưng` : ''}`}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className='p-4 w-auto' align='start'>
                <div className='flex flex-col divide-y '>
                  {customerTypes.map((customer, index) => (
                    <div key={index} className='flex justify-between items-center py-4'>
                      <div>
                        <h2 className='text-lg font-semibold'>{customer.label}</h2>
                        <p className='text-sm text-muted-foreground'>{customer.description}</p>
                      </div>
                      {/* Counter */}
                      <div className='flex justify-end items-center gap-4'>
                        <Button
                          variant={'outline'}
                          className='rounded-full'
                          size={'icon'}
                          onClick={() => updateGuests(customer.type, 'decrease')}
                          disabled={
                            guests[customer.type as keyof typeof guests] === 0 ||
                            (customer.type === 'adults' && guests.adults === 1)
                          }
                        >
                          <Minus className='w-4 h-4' />
                        </Button>
                        <p className='text-lg font-semibold'>{guests[customer.type as keyof typeof guests]}</p>
                        <Button
                          variant={'outline'}
                          className='rounded-full'
                          size={'icon'}
                          onClick={() => updateGuests(customer.type, 'increase')}
                        >
                          <Plus className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phần lưu ý (Ràng buộc cứng: Tối đa 5 khách và disable thú cưng) */}
                <div className='mt-4'>
                  <p className='text-xs'>
                    Chỗ này cho phép tối đa 5 khách.
                    <br />
                    Không được phép mang theo thú cưng.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Button submit (2 trạng thái đặt phòng và đặt thành công) */}
        <div className='mt-5'>
          <Button variant={'default'} size={'lg'} className='w-full'>
            Đặt phòng
          </Button>
          <p className='mt-3 text-sm text-center'>Bạn vẫn chưa bị trừ tiền</p>
        </div>
      </div>

      {/* TODO: API đặt phòng chưa quản lý số tiền thanh toán (Data hiển thị ko theo form) */}
      <div className='mt-4 text-base'>
        {/* Tổng giá phòng (theo giá cơ sở) */}
        <div className='flex justify-between items-center'>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant='link' className='text-base p-0 text-foreground'>
                ₫664.587 x 4 đêm
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className='w-80'>
              <div>
                <h4>Chi tiết giá cơ sở:</h4>
                <p>Tổng tiền được tính theo công thức Giá Cơ Sở (của 1 đêm) x Số đêm</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div>
            <p>₫2.658.346</p>
          </div>
        </div>
        {/* Phí vệ sinh */}
        <div className='flex justify-between items-center'>
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='link' className='text-base p-0 text-foreground'>
                  Phí vệ sinh
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div>
                  <p>Khoản phí một lần do chủ nhà tính để trang trải chi phí vệ sinh chỗ của họ.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div>
            <p>₫73.843</p>
          </div>
        </div>
        {/* Phí dịch vụ Airbnb */}
        <div className='flex justify-between items-center'>
          <div>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='link' className='text-base p-0 text-foreground'>
                  Phí dịch vụ Airbnb
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div>
                  <p>
                    Điều này giúp chúng tôi vận hành nền tảng của mình và cung cấp các dịch vụ như hỗ trợ 24/7 trong
                    chuyến đi của bạn.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div>
            <p>₫238.266</p>
          </div>
        </div>
      </div>

      <Separator className='my-4' />

      {/* Tổng trước thuế */}
      <div className='text-base font-bold flex justify-between items-center'>
        <h4>Tổng trước thuế</h4>
        <p>₫15.827.007</p>
      </div>
    </div>
  )
}

export default ReservationForm
