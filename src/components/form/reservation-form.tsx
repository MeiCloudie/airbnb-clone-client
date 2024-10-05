import { convertUSDToVND } from '@/format/currency'
import React, { useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { addDays, differenceInDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Minus, Plus } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { useReservation } from '@/hooks/useReservation'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { useSwalAlert } from '@/hooks/useSwalAlert'

interface ReservationFormProps {
  roomId: string
  roomPrice: number
  onCloseReservationDialog?: () => void
}

const ReservationForm: React.FC<ReservationFormProps> = ({ roomId, roomPrice, onCloseReservationDialog }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const { showNotification } = useToastifyNotification()
  const { showAlert } = useSwalAlert()

  const maPhong = parseInt(roomId, 10)
  const maNguoiDung = session?.user?.id ? parseInt(session.user.id, 10) : 0

  const { isLoading, error, response, postReservation } = useReservation()

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

      // Kiểm tra tổng số khách
      const totalGuests = prevGuests.adults + prevGuests.children + prevGuests.infants

      // Kiểm tra điều kiện tăng/giảm số lượng
      const updatedGuests = { ...prevGuests }
      if (action === 'increase' && totalGuests < 5 && type !== 'pets') {
        updatedGuests[type as keyof typeof guests] = value + 1
      } else if (action === 'decrease' && value > 0 && (type !== 'adults' || value > 1)) {
        updatedGuests[type as keyof typeof guests] = value - 1
      }

      // Log kết quả sau khi thay đổi
      // console.log('Selected Guests:', updatedGuests)

      return updatedGuests
    })
  }

  // Tính toán số đêm khách đã chọn
  const numberOfNights =
    selectedDateRange?.from && selectedDateRange?.to
      ? differenceInDays(selectedDateRange.to, selectedDateRange.from)
      : 0

  // Tính toán tổng giá dựa trên số đêm và giá phòng mỗi đêm
  const totalRoomPrice = numberOfNights * roomPrice
  const roomPriceConvertUSDToVND = convertUSDToVND(totalRoomPrice)

  // Phí vệ sinh và dịch vụ
  const cleaningFee = convertUSDToVND(roomPrice / 2) // Ví dụ phí vệ sinh
  const serviceFee = convertUSDToVND(roomPrice * 2) // Ví dụ phí dịch vụ

  // Tính tổng trước thuế
  const totalBeforeTax = convertUSDToVND(totalRoomPrice + roomPrice / 2 + roomPrice * 2) // Giá phòng + Phí vệ sinh + Phí dịch vụ

  const handleReservation = async () => {
    // Kiểm tra người dùng đã đăng nhập hay chưa
    if (!maNguoiDung) {
      showAlert({
        title: 'Lưu ý',
        text: 'Bạn cần đăng nhập để có thể Đặt Phòng!',
        icon: 'warning',
        confirmButtonText: 'Đăng Nhập'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(ROUTES.AUTH.SIGNIN)
        }
      })
      return
    }

    // Kiểm tra đầy đủ thông tin đặt phòng
    if (!selectedDateRange?.from || !selectedDateRange?.to) {
      showNotification('Vui lòng điền đầy đủ thông tin ngày nhận phòng và ngày trả phòng.', 'warning')
      return
    }

    const payload = {
      maPhong,
      ngayDen: selectedDateRange.from.toISOString(),
      ngayDi: selectedDateRange.to.toISOString(),
      soLuongKhach: totalGuests,
      maNguoiDung: maNguoiDung
    }

    try {
      await postReservation(payload)
      if (response && response.statusCode === 201) {
        if (onCloseReservationDialog) {
          onCloseReservationDialog()
        }

        showAlert({
          title: 'Thành công',
          text: 'Bạn đã đặt phòng thành công. Hãy liên hệ chủ nhà để trao đổi thêm thông tin nhé!',
          icon: 'success',
          confirmButtonText: 'Đã hiểu'
        })
      }
    } catch (err) {
      showAlert({
        title: 'Thất bại',
        text: 'Đã xảy ra lỗi khi đặt phòng. Hãy thử lại sau nhé!',
        icon: 'success',
        confirmButtonText: 'Đã hiểu'
      })
    }
  }

  if (error) {
    showNotification('Đã có lỗi xảy ra khi đặt phòng. Hãy thử lại sau nhé!', 'error')
  }

  return (
    <div>
      {/* Giá phòng (tính theo đêm) */}
      <h2 className='text-lg mb-5'>
        <span className='text-xl font-bold'>₫{convertUSDToVND(roomPrice)}</span> / đêm
      </h2>

      {/* Form đặt phòng */}
      {/* Bao gồm ngày nhận phòng, ngày trả phòng (disable before và api ngày đã được đặt - api chưa có đặt phòng theo mã phòng) 
            và số lượng khách (Ràng buộc cứng: Tối đa 5 khách và disable thú cưng) */}
      <div>
        {/* Các input field */}
        <div>
          <div className='space-y-3'>
            <Popover>
              <PopoverTrigger asChild>
                <div className='cursor-pointer w-full flex gap-4 justify-center items-center'>
                  <div className='w-full'>
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
                  <div className='w-full'>
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
                            (customer.type === 'adults' && guests.adults === 1) ||
                            customer.type === 'pets'
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
                          disabled={customer.type === 'pets' || totalGuests >= 5}
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

        {/* Button submit */}
        <div className='mt-5'>
          <Button variant={'default'} size={'lg'} className='w-full' onClick={handleReservation} disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đặt phòng'}
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
                ₫{convertUSDToVND(roomPrice)} x {numberOfNights} đêm
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
            <p>₫{roomPriceConvertUSDToVND}</p>
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
            <p>₫{cleaningFee}</p>
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
            <p>₫{serviceFee}</p>
          </div>
        </div>
      </div>

      <Separator className='my-4' />

      {/* Tổng trước thuế */}
      <div className='text-base font-bold flex justify-between items-center'>
        <h4>Tổng trước thuế</h4>
        <p>₫{totalBeforeTax}</p>
      </div>
    </div>
  )
}

export default ReservationForm
