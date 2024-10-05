'use client'

import AmenitiesDialog from '@/components/dialog/amenities-dialog'
import CommentRatingDialog from '@/components/dialog/comment-rating-dialog'
import ReservationDialog from '@/components/dialog/reservation-dialog'
import RoomDescriptionDialog from '@/components/dialog/room-description-dialog'
import ReservationForm from '@/components/form/reservation-form'
import AccuracyIcon from '@/components/icon/accuracy-icon'
import AirConditionerIcon from '@/components/icon/air-conditioner-icon'
import AirbnbSafetyIcon from '@/components/icon/airbnb-safety-icon'
import CameraIcon from '@/components/icon/camera-icon'
import CheckInIcon from '@/components/icon/check-in-icon'
import CleanlinessIcon from '@/components/icon/cleanliness-icon'
import CommunicationIcon from '@/components/icon/communication-icon'
import HygienProductsIcon from '@/components/icon/hygien-products-icon'
import IronIcon from '@/components/icon/iron-icon'
import KitchenIcon from '@/components/icon/kitchen-icon'
import LocationIcon from '@/components/icon/location-icon'
import ParkingSpaceIcon from '@/components/icon/parking-space-icon'
import SuperhostIcon from '@/components/icon/superhost-icon'
import SwimmingPoolIcon from '@/components/icon/swimming-pool-icon'
import TiviIcon from '@/components/icon/tivi-icon'
import ValueIcon from '@/components/icon/value-icon'
import VerifiedIcon from '@/components/icon/verified-icon'
import WashingMachineIcon from '@/components/icon/washing-machine-icon'
import WifiIcon from '@/components/icon/wifi-icon'
import SimpleMap from '@/components/map/map'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Ratings } from '@/components/ui/custom-rating'
import { Progress } from '@/components/ui/progress'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Host, hosts, roomDescription } from '@/constants/data'
import { convertUSDToVND } from '@/format/currency'
import { useComment } from '@/hooks/useComment'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import {
  Calendar,
  Car,
  ChevronRight,
  DoorOpen,
  FlagIcon,
  Globe,
  GraduationCap,
  Heart,
  ImageIcon,
  MessageCircleMore,
  Share,
  Star
} from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface RoomDetailProps {
  params: {
    id: string
  }
}

export default function RoomDetail({ params }: RoomDetailProps) {
  const roomId = params.id

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, roomsById, error, getRoomById } = useRoom()
  const { isLoading: isCommentLoading, dataCommentByRoomId, error: commentError, getCommentByRoomId } = useComment()
  const { dataAllLocations, getAllLocations } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [randomHost, setRandomHost] = useState<Host | null>(null) // TODO: Data cứng - Tạm thời (vì API chưa có)

  const [isRoomDesDialogOpen, setIsRoomDesDialogOpen] = useState(false)
  const [isAmenitiesDialogOpen, setIsAmenitiesDialogOpen] = useState(false)
  const [isCommentRatingDialogOpen, setIsCommentRatingDialogOpen] = useState(false)
  const [isReservationDialogOpen, setIsReservationDialogOpen] = useState(false)

  const openRoomDesDialogOpen = () => {
    setIsRoomDesDialogOpen(true)
  }
  const closeRoomDesDialogOpen = () => setIsRoomDesDialogOpen(false)

  const openAmenitiesDialogOpen = () => {
    setIsAmenitiesDialogOpen(true)
  }
  const closeAmenitiesDialogOpen = () => setIsAmenitiesDialogOpen(false)

  const openCommentRatingDialogOpen = () => {
    setIsCommentRatingDialogOpen(true)
  }
  const closeCommentRatingDialogOpen = () => setIsCommentRatingDialogOpen(false)

  const openReservationDialogOpen = () => {
    setIsReservationDialogOpen(true)
  }
  const closeReservationDialogOpen = () => setIsReservationDialogOpen(false)

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  useEffect(() => {
    // Gọi API room id khi component mount
    if (params?.id) {
      getRoomById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }

    // Random Host
    setRandomHost(hosts[Math.floor(Math.random() * hosts.length)])
  }, [params?.id, getRoomById])

  useEffect(() => {
    if (params?.id) {
      getCommentByRoomId({ roomId: params.id })
    }
  }, [params?.id, getCommentByRoomId])

  useEffect(() => {
    if (error && error.statusCode === 404) {
      notFound() // Nếu lỗi là 404 thì chuyển đến trang không tìm thấy
    } else if (error && !hasShownError) {
      // Nếu là lỗi khác, hiển thị thông báo lỗi
      showAlert({
        title: 'Phát hiện lỗi',
        text: 'Đã có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau',
        icon: 'question',
        confirmButtonText: 'Đã hiểu'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
      setHasShownError(true) // Đánh dấu đã hiển thị lỗi
    }
  }, [error, hasShownError, showAlert])

  const [isTranslated, setIsTranslated] = useState(false)

  const handleTranslateToggle = () => {
    setIsTranslated(!isTranslated)
  }

  // Tạm thời gôm chung tất cả trạng thái loading
  if (isFirstLoading || isLoading || !randomHost || isCommentLoading) {
    return <Skeleton className='w-full h-5' />
  }

  // Tạm thời gôm chung tất cả trạng thái error
  if (error || commentError) {
    return null
  }

  if (!roomsById || !roomsById.content) {
    notFound()
  }

  const room = roomsById.content
  const location = dataAllLocations?.content.find((loc) => loc.id === room.maViTri)

  // Tạo mảng chứa thông tin khách, phòng ngủ, giường, phòng tắm
  const roomDetails = [
    room.khach > 0 && `${room.phongNgu} khách`,
    room.phongNgu > 0 && `${room.phongNgu} phòng ngủ`,
    room.giuong > 0 && `${room.giuong} giường`,
    room.phongTam > 0 && `${room.phongTam} phòng tắm`
  ].filter(Boolean) // Lọc ra các giá trị hợp lệ

  const allAmenities = [
    {
      id: 1,
      icon: <CameraIcon />,
      description: 'Chỗ ở có camera an ninh ngoài nhà',
      isAvailable: true // Always available
    },
    {
      id: 2,
      icon: <HygienProductsIcon />,
      description: 'Sản phẩm vệ sinh',
      isAvailable: true // Always available
    },
    {
      id: 3,
      icon: <WashingMachineIcon />,
      description: 'Máy giặt',
      isAvailable: room.mayGiat
    },
    {
      id: 4,
      icon: <TiviIcon />,
      description: 'Tivi',
      isAvailable: room.tivi
    },
    {
      id: 5,
      icon: <AirConditionerIcon />,
      description: 'Điều hòa nhiệt độ',
      isAvailable: room.dieuHoa
    },
    {
      id: 6,
      icon: <WifiIcon />,
      description: 'Wi-Fi',
      isAvailable: room.wifi
    },
    {
      id: 7,
      icon: <KitchenIcon />,
      description: 'Bếp',
      isAvailable: room.bep
    },
    {
      id: 8,
      icon: <ParkingSpaceIcon />,
      description: 'Chỗ đỗ xe miễn phí',
      isAvailable: room.doXe
    },
    {
      id: 9,
      icon: <SwimmingPoolIcon />,
      description: 'Hồ bơi',
      isAvailable: room.hoBoi
    },
    {
      id: 10,
      icon: <IronIcon />,
      description: 'Bàn ủi',
      isAvailable: room.banUi || room.banLa
    }
  ]

  const amenities = allAmenities.filter((amenity) => amenity.isAvailable)

  const rating = [
    {
      id: 1,
      rate: 5,
      value: 100
    },
    {
      id: 2,
      rate: 4,
      value: 80
    },
    {
      id: 3,
      rate: 3,
      value: 60
    },
    {
      id: 4,
      rate: 2,
      value: 40
    },
    {
      id: 5,
      rate: 1,
      value: 20
    }
  ]

  const ratingTypes = [
    { id: 1, title: 'Mức độ sạch sẽ', rate: 4.7, icon: <CleanlinessIcon /> },
    { id: 2, title: 'Độ chính xác', rate: 4.7, icon: <AccuracyIcon /> },
    { id: 3, title: 'Nhận phòng', rate: 4.7, icon: <CheckInIcon /> },
    { id: 4, title: 'Giao tiếp', rate: 4.9, icon: <CommunicationIcon /> },
    { id: 5, title: 'Vị trí', rate: 4.7, icon: <LocationIcon /> },
    { id: 6, title: 'Giá trị', rate: 4.8, icon: <ValueIcon /> }
  ]

  return (
    <div>
      <section className='flex flex-col-reverse w-full gap-3 md:flex-col'>
        {/* Nội dung tiêu đề */}
        <div className='w-full flex gap-10 flex-row justify-between items-start'>
          {/* Tên phòng */}
          <div className=''>
            <h1 className='font-bold text-pretty text-xl lg:text-2xl'>{room.tenPhong}</h1>
          </div>
          {/* Desktop - Nút chia sẻ và nút lưu */}
          <div className='hidden md:flex md:flex-row md:justify-end md:items-center gap-2'>
            <Button variant={'ghost'} className='text-sm font-semibold'>
              <Share className='w-4 h-4 me-2' />
              <span className='underline'>Chia sẻ</span>
            </Button>
            <Button variant={'ghost'} className='text-sm font-semibold'>
              <Heart className='w-4 h-4 me-2' />
              <span className='underline'>Lưu</span>
            </Button>
          </div>
        </div>

        {/* Hình ảnh */}
        <div className='relative'>
          <Image
            loader={({ src }) => src}
            src={room.hinhAnh}
            alt='image-alternative'
            width={500}
            height={500}
            unoptimized
            className='w-full h-full object-cover object-center rounded-xl'
          />
          <Button variant={'secondary'} className='absolute bottom-3 right-3 rounded-sm shadow-md'>
            <ImageIcon className='w-4 h-4 me-2' />
            Hiển thị tất cả ảnh
          </Button>
        </div>
      </section>

      <section className='my-2 md:my-4 w-full grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Nội dung chi tiết phòng */}
        <div className='col-span-1 lg:col-span-2'>
          {/* Thông tin cơ bản của phòng */}
          <div className='w-full'>
            {/* Vị trí */}
            <h1 className='font-semibold text-base lg:text-xl'>{`Phòng cho thuê tại ${location?.tenViTri}, ${location?.tinhThanh}, ${location?.quocGia}`}</h1>
            {/* SL khách, phòng ngủ, giường, phòng tắm */}
            <h2 className='text-muted-foreground text-sm'>
              {roomDetails.length > 0 ? roomDetails.join(' • ') : 'Chưa cập nhật thông tin phòng'}
            </h2>
            <div className='mt-2 flex justify-between items-center'>
              {/* Tổng đánh giá */}
              {/* TODO: Data cứng vì API chưa có phần đánh giá */}
              <p className='text-sm font-semibold flex items-center'>
                <span className='flex items-center'>
                  <Star className='w-4 h-4 me-1 fill-foreground' />
                  4.75
                </span>
                <span className='mx-1'>•</span>
                <span className='underline cursor-pointer'>120 đánh giá</span>
              </p>
              {/* Tablet & Mobile - Nút chia sẻ và nút lưu */}
              <div className='flex md:hidden flex-row justify-end items-center gap-2'>
                <Button variant={'ghost'} size={'icon'} className='text-sm font-semibold'>
                  <Share className='w-4 h-4' />
                </Button>
                <Button variant={'ghost'} size={'icon'} className='text-sm font-semibold'>
                  <Heart className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </div>

          <Separator className='my-7' />

          {/* Thông tin chủ nhà (Data cứng vì API chưa có thông tin chủ nhà) */}
          <div className='flex justify-start items-center gap-4'>
            <div className='relative p-1'>
              <Avatar className='w-12 h-12'>
                <AvatarImage src={randomHost.avatar} alt={randomHost.fullname} className='object-cover object-top' />
                <AvatarFallback>{randomHost.fullname.charAt(0)}</AvatarFallback>
                {/* Icon chủ nhà siêu cấp */}
              </Avatar>
              {randomHost.superhost && (
                <div className='absolute bottom-0 right-0'>
                  <SuperhostIcon />
                </div>
              )}
            </div>
            <div>
              <h3 className='text-sm md:text-base font-semibold'>Chủ nhà/Người tổ chức: {randomHost.fullname}</h3>
              <p className='text-xs md:text-sm text-muted-foreground'>
                {randomHost.superhost ? (
                  <>
                    {/* Hiển thị dạng xuống dòng khi màn hình nhỏ hơn md */}
                    <span className='block md:hidden'>
                      Chủ nhà siêu cấp <br />
                      {randomHost.experience} tháng kinh nghiệm đón tiếp khách
                    </span>

                    {/* Hiển thị trên một dòng khi màn hình lớn hơn hoặc bằng md */}
                    <span className='hidden md:block'>
                      Chủ nhà siêu cấp • {randomHost.experience} tháng kinh nghiệm đón tiếp khách
                    </span>
                  </>
                ) : (
                  'Chủ nhà mới'
                )}
              </p>
            </div>
          </div>

          <Separator className='my-7' />

          {/* Thông tin điểm nổi bật của phòng */}
          {/* Data cứng - Tạm thời (vì API chưa có) */}
          <div className='space-y-6 text-balance'>
            {/* item 1 */}
            <div className='flex justify-start items-center gap-5 w-full'>
              <div>
                <DoorOpen className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-sm md:text-base font-semibold'>Tự nhận phòng</h3>
                <p className='text-xs md:text-sm text-muted-foreground'>Tự nhận phòng với hộp khoá an toàn.</p>
              </div>
            </div>
            {/* item 2 */}
            <div className='flex justify-start items-center gap-5 w-full'>
              <div>
                <Car className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-sm md:text-base font-semibold'>Đỗ xe miễn phí</h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Đây là một trong số ít địa điểm có chỗ đỗ xe miễn phí tại khu vực.
                </p>
              </div>
            </div>
            {/* item 3 */}
            <div className='flex justify-start items-center gap-5 w-full'>
              <div>
                <Calendar className='w-8 h-8' />
              </div>
              <div>
                <h3 className='text-sm md:text-base font-semibold'>Hủy miễn phí trước 11 thg 11</h3>
                <p className='text-xs md:text-sm text-muted-foreground'>
                  Được hoàn tiền đầy đủ nếu bạn thay đổi kế hoạch.
                </p>
              </div>
            </div>
          </div>

          <Separator className='my-7' />

          {/* Mô tả phòng (Data cứng) */}
          <div className='space-y-5'>
            <div className='flex flex-col items-start md:flex-row md:justify-start md:items-center py-2 px-4 rounded-md bg-muted'>
              <p className='text-xs md:text-base'>
                {isTranslated
                  ? 'Một số thông tin đã được dịch tự động.'
                  : 'Một số thông tin được hiển thị ở ngôn ngữ gốc.'}
              </p>

              <Button
                variant={'link'}
                className='px-0 md:px-1 py-0 leading-none my-0 text-xs md:text-base font-semibold text-foreground underline hover:text-primary'
                onClick={handleTranslateToggle}
              >
                {isTranslated ? 'Xem bản gốc' : 'Dịch'}
              </Button>
            </div>

            {/* Nội dung mô tả phòng */}
            <div className='relative max-h-44 overflow-hidden'>
              <div
                dangerouslySetInnerHTML={{
                  __html: isTranslated ? roomDescription.english : roomDescription.vietnamese
                }}
                className='text-ellipsis text-sm md:text-base'
              />
              <div className='absolute bottom-0 right-0 left-0 h-28 bg-gradient-to-t from-background to-transparent'></div>
            </div>

            {/* Nút hiển thị thêm */}
            <Button
              variant={'link'}
              className='p-0 text-base font-semibold underline text-foreground hover:text-primary'
              onClick={openRoomDesDialogOpen}
            >
              Hiển thị thêm
              <ChevronRight className='w-5 h-5' />
            </Button>

            <RoomDescriptionDialog
              open={isRoomDesDialogOpen}
              onOpenChange={setIsRoomDesDialogOpen}
              onClose={closeRoomDesDialogOpen}
              description={isTranslated ? roomDescription.english : roomDescription.vietnamese}
            />
          </div>

          <Separator className='my-7' />

          {/* Thông tin nơi ngủ nghỉ */}
          <div>
            <h1 className='text-base md:text-xl font-bold mb-5'>Nơi bạn sẽ ngủ nghỉ</h1>
            <div>
              <Image
                src={'/images/bedroom-image-alternative.jpg'}
                alt='bedroom-image-alternative'
                width={500}
                height={500}
                className='w-1/2 md:w-1/4 aspect-square object-cover object-center rounded-xl'
              />
              <h3 className='mt-2 text-sm md:text-base font-semibold'>Phòng ngủ</h3>
              <p className='text-xs md:text-sm text-muted-foreground'>{`${room.giuong > 0 ? room.giuong : '2'} giường king`}</p>
            </div>
          </div>

          <Separator className='my-7' />

          {/* Thông tin tiện nghi */}
          <div>
            <h1 className='text-base md:text-xl font-bold mb-5'>Nơi này có những gì cho bạn</h1>

            {/* Các tiện nghi cơ bản */}
            <div className='w-full grid grid-cols-2 gap-5'>
              {amenities.map((amenity) => (
                <div key={amenity.id} className='flex justify-start items-center gap-4'>
                  <div>{amenity.icon}</div>
                  <p className='text-xs md:text-sm lg:text-base'>{amenity.description}</p>
                </div>
              ))}
            </div>

            {/* Phần hiển thị thêm tiện nghi */}
            {/* TODO: Tạm thời là Data cứng */}
            <div className='mt-6'>
              <Button
                variant={'outline'}
                size={'lg'}
                onClick={openAmenitiesDialogOpen}
                className='border-foreground w-full md:w-fit'
              >
                Hiển thị tất cả 20 tiện nghi
              </Button>

              <AmenitiesDialog
                open={isAmenitiesDialogOpen}
                onOpenChange={setIsAmenitiesDialogOpen}
                onClose={closeAmenitiesDialogOpen}
              />
            </div>
          </div>

          {/* <Separator className='my-7' /> */}

          {/* Phần chọn ngày (Chung sự kiện với Form Đặt Phòng) */}
          {/* TODO: Đã lược bỏ bớt so với trang chính */}
        </div>

        <div>
          {/* Desktop & Tablet - Sticky Form Card đặt phòng */}
          <div className='sticky top-32 z-30 hidden lg:block'>
            <Card className='shadow-xl'>
              <CardContent className='p-7'>
                <ReservationForm roomId={roomId} />
              </CardContent>
            </Card>
            <div className='flex items-center justify-center gap-2 w-full mt-4'>
              <FlagIcon className='w-4 h-4 fill-foreground' />
              <Button variant={'link'} className='text-foreground p-0'>
                Báo cáo nhà/phòng cho thuê này
              </Button>
            </div>
          </div>
          {/* Mobile - Fixed Form Bottom đặt phòng */}
          {/* TODO: Cách fixed này làm đè lên footer (Xử lý sau) */}
          <div className='fixed z-50 bottom-0 left-0 w-full block lg:hidden bg-background border-t px-5 md:px-10 py-4'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg'>
                <span className='text-xl font-bold'>₫{convertUSDToVND(127)}</span> / đêm
              </h2>
              <Button variant={'default'} size={'lg'} onClick={openReservationDialogOpen}>
                Đặt phòng
              </Button>
              <ReservationDialog
                open={isReservationDialogOpen}
                onOpenChange={setIsReservationDialogOpen}
                onClose={closeReservationDialogOpen}
                roomId={roomId}
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className='my-7' />

      <section>
        {/* Đánh giá */}
        {/* TODO: Data cứng vì API chưa có phần đánh giá */}
        <div className='mb-5'>
          <h1 className='text-base md:text-xl font-bold flex items-center'>
            <span className='flex items-center'>
              <Star className='w-4 h-4 me-1 fill-foreground' />
              4.75
            </span>
            <span className='mx-1'>•</span>
            <span>120 đánh giá</span>
          </h1>
          {/* Nếu chưa có đánh giá (SL = 0) */}
          {/* <p className='text-sm italic text-muted-foreground mt-1'>Phòng này chưa có đánh giá chi tiết</p> */}
        </div>

        {/* Desktop */}
        <div className='hidden xl:block'>
          <div className='grid grid-cols-7 divide-x'>
            {/* Xếp hạng tổng thể */}
            <div className='px-4'>
              <h3 className='text-sm font-semibold mb-2'>Xếp hạng tổng thể</h3>
              <div className='space-y-1 text-sm'>
                {rating.map((rating) => (
                  <div key={rating.id} className='w-full flex justify-center items-center gap-2'>
                    <div className='pe-2 w-1/12'>
                      <p className='text-xs'>{rating.rate}</p>
                    </div>
                    <Progress value={rating.value} className='h-1.5 w-11/12' />
                  </div>
                ))}
              </div>
            </div>
            {/* Chi tiết đánh giá */}
            {ratingTypes.map((ratingType) => (
              <div key={ratingType.id} className='px-4 flex flex-col justify-between items-start'>
                <div>
                  <h3 className='text-sm font-semibold mb-2'>{ratingType.title}</h3>
                  <p className='text-lg font-semibold'>{ratingType.rate}</p>
                </div>
                <div>{ratingType.icon}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet & Mobile */}
        <div className='block xl:hidden'>
          <ScrollArea className='w-full whitespace-nowrap'>
            <div className='flex w-max space-x-4 p-4'>
              <div className='grid grid-cols-7 gap-4'>
                {/* Xếp hạng tổng thể */}
                <Card>
                  <CardContent className='p-5'>
                    <h3 className='text-sm font-semibold mb-2'>Xếp hạng tổng thể</h3>
                    <div className='space-y-1 text-sm'>
                      {rating.map((rating) => (
                        <div key={rating.id} className='w-full flex justify-center items-center gap-2'>
                          <div className='pe-2 w-1/12'>
                            <p className='text-xs'>{rating.rate}</p>
                          </div>
                          <Progress value={rating.value} className='h-1.5 w-11/12' />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                {/* Chi tiết đánh giá */}
                {ratingTypes.map((ratingType) => (
                  <Card key={ratingType.id}>
                    <CardContent className='p-5 h-full flex flex-col justify-between items-start'>
                      <div>
                        <h3 className='text-sm font-semibold mb-2'>{ratingType.title}</h3>
                        <p className='text-lg font-semibold'>{ratingType.rate}</p>
                      </div>
                      <div>{ratingType.icon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </section>

      <Separator className='my-7' />

      <section>
        {/* Bình luận */}
        {/* TODO: Có một số điều chỉnh so với bản gốc */}

        {/* Nếu chưa có bình luận nào (SL bình luận = 0) */}
        {dataCommentByRoomId?.content.length === 0 && (
          <p className='flex gap-1 items-center text-xs md:text-sm lg:text-base font-semibold'>
            <MessageCircleMore /> Phòng này chưa có bình luận đánh giá nào. Hãy cho chúng tôi biết cảm nhận của bạn nhé!
          </p>
        )}
        {/* Danh sách bình luận (hiển thị tối đa 4 items đầu) */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          {dataCommentByRoomId?.content.slice(0, 4).map((comment) => (
            <div key={comment.id} className='space-y-4'>
              <div className='flex w-full gap-4 justify-start item-center'>
                <Avatar className='w-12 h-12'>
                  <AvatarImage src={comment.avatar} alt='avatar' className='object-cover object-top' />
                  <AvatarFallback className='bg-primary text-background font-bold'>
                    {comment.tenNguoiBinhLuan.toString().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className='text-base font-semibold'>{comment.tenNguoiBinhLuan}</h4>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Ratings
                      rating={comment.saoBinhLuan}
                      totalStars={5}
                      size={12}
                      variant='default'
                      interactive={false}
                    />
                    <p className='mx-2'>•</p>
                    <p>
                      {new Date(comment.ngayBinhLuan).toLocaleDateString('en-US')},{' '}
                      {new Date(comment.ngayBinhLuan).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <p className='text-sm text-pretty w-full leading-relaxed'>{comment.noiDung}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Phần hiển thị tất cả với dialog */}
        <div className='mt-10'>
          <Button
            variant={'outline'}
            size={'lg'}
            onClick={openCommentRatingDialogOpen}
            className='border-foreground w-full md:w-fit'
          >
            Hiển thị tất cả bình luận đánh giá
          </Button>

          <CommentRatingDialog
            open={isCommentRatingDialogOpen}
            onOpenChange={setIsCommentRatingDialogOpen}
            onClose={closeCommentRatingDialogOpen}
            comments={dataCommentByRoomId?.content || []}
          />
        </div>
      </section>

      <Separator className='my-7' />

      <section>
        {/* Map */}
        {/* TODO: Map tĩnh */}
        <h1 className='text-base md:text-xl font-bold mb-5'>Nơi bạn sẽ đến</h1>

        {/* Vị trí */}
        <p className='text-sm md:text-base mb-4'>{`${location?.tenViTri}, ${location?.tinhThanh}, ${location?.quocGia}`}</p>

        <div>
          <SimpleMap className='h-[15vh] md:h-[20vh] xl:h-[30vh]' />
        </div>
      </section>

      <Separator className='my-7' />

      <section>
        {/* Profile Chủ Nhà */}
        <h1 className='text-base md:text-xl font-bold mb-5'>Gặp gỡ Chủ nhà</h1>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 lg:gap-x-14 2xl:gap-x-24'>
          {/* Card */}
          <div className='col-span-1 w-full'>
            <Card className='shadow-xl rounded-3xl w-full'>
              <CardContent className='flex px-0 py-7 justify-between items-center'>
                <div className='col-span-1 flex flex-col items-center justify-center w-2/3'>
                  <div className='relative p-1'>
                    <Avatar className='w-28 h-28'>
                      <AvatarImage
                        src={randomHost.avatar}
                        alt={randomHost.fullname}
                        className='object-cover object-top'
                      />
                      <AvatarFallback>{randomHost.fullname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {/* Icon Chủ nhà/Người tổ chức đã được xác minh */}
                    <div className='absolute bottom-1 right-0'>
                      <div className='bg-primary p-2 aspect-square rounded-full'>
                        <VerifiedIcon />
                      </div>
                    </div>
                  </div>

                  <div className='text-center mt-2'>
                    <h1 className='text-xl font-bold'>{randomHost.fullname}</h1>
                    <p className='text-sm font-semibold'>
                      {randomHost.superhost ? 'Chủ nhà siêu cấp' : 'Chủ nhà/Người tổ chức'}
                    </p>
                  </div>
                </div>

                <div className='col-span-1 lg:col-span-2 w-1/3 font-semibold'>
                  <h5 className='font-bold text-xl'>326</h5>
                  <p className='text-xs'>Đánh giá</p>
                  <Separator className='my-4' />
                  <h5 className='font-bold text-xl'>4.96</h5>
                  <p className='text-xs'>Xếp hạng</p>
                  <Separator className='my-4' />
                  <h5 className='font-bold text-xl'>{randomHost.experience}</h5>
                  <p className='text-xs'>Tháng kinh nghiệm đón tiếp khách</p>
                </div>
              </CardContent>
            </Card>

            {/* 2 phần nổi bật trong info - TODO: Data cứng */}
            <div className='mt-10 space-y-2'>
              {/* phần 1 */}
              <div className='flex gap-2 items-center justify-start text-pretty text-xs md:text-sm truncate'>
                <GraduationCap className='w-5 h-5' />
                <p>Nơi tôi từng theo học: Macquarie University</p>
              </div>
              {/* phần 2 */}
              <div className='flex gap-2 items-center justify-start text-pretty text-xs md:text-sm truncate'>
                <Globe className='w-5 h-5' />
                <p>Nói Tiếng Anh và Tiếng Việt</p>
              </div>
              {/* button hiển thị thêm */}
              <Button
                variant={'link'}
                className='p-0 text-base font-semibold underline text-foreground hover:text-primary'
              >
                Hiển thị thêm
                <ChevronRight className='w-5 h-5' />
              </Button>
            </div>
          </div>
          {/* Information */}
          {/* TODO: Data cứng */}
          <div className='col-span-1 xl:col-span-2 space-y-8'>
            {randomHost.superhost && (
              <div className='space-y-4 text-pretty'>
                <h3 className='mb-3 text-base md:text-lg font-semibold'>
                  {randomHost.fullname} là một Chủ nhà siêu cấp
                </h3>
                <p className='text-xs md:text-base'>
                  Chủ nhà siêu cấp là những người có kinh nghiệm, được đánh giá cao và cam kết mang lại kỳ nghỉ tuyệt
                  vời cho khách.
                </p>
              </div>
            )}
            <div>
              <h3 className='mb-3 text-base md:text-lg font-semibold'>Thông tin Chủ nhà</h3>
              <p className='text-xs md:text-base'>Tỉ lệ phản hồi: 100%</p>
              <p className='text-xs md:text-base'>Phản hồi trong vòng 1 giờ</p>
            </div>
            <Button variant={'default'} className='w-full md:w-fit' size={'lg'}>
              Nhắn tin cho Chủ nhà
            </Button>

            <Separator className='my-7' />

            <div className='flex items-center justify-start gap-3'>
              <AirbnbSafetyIcon />
              <p className='text-xs'>
                Để bảo vệ khoản thanh toán của bạn, tuyệt đối không chuyển tiền hoặc liên lạc bên ngoài trang web hoặc
                ứng dụng Airbnb.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator className='my-7' />

      <section>
        {/* Quy định */}
        {/* TODO: Data cứng */}
        <h1 className='text-base md:text-xl font-bold mb-5'>Những điều cần biết</h1>
        <div className='grid grid-cols-1 gap-4 divide-y md:divide-y-0 md:grid-cols-3 text-sm md:text-base'>
          <div className='space-y-2 py-4'>
            <h4 className='font-semibold'>Nội quy nhà</h4>
            <p>Nhận phòng: 14:00 – 21:00</p>
            <p>Trả phòng trước 12:00</p>
            <p>Tối đa 2 khách</p>
            <Button
              variant={'link'}
              className='p-0 text-base font-semibold underline text-foreground hover:text-primary'
            >
              Hiển thị thêm
              <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
          <div className='space-y-2 py-4'>
            <h4 className='font-semibold'>An toàn và chỗ ở</h4>
            <p>Chỗ ở có camera an ninh ngoài nhà</p>
            <p>Chưa có thông tin về việc có máy phát hiện khí CO</p>
            <p>Chưa có thông tin về việc có máy báo khói</p>
            <Button
              variant={'link'}
              className='p-0 text-base font-semibold underline text-foreground hover:text-primary'
            >
              Hiển thị thêm
              <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
          <div className='space-y-2 py-4'>
            <h4 className='font-semibold'>Chính sách hủy</h4>
            <p>
              Bạn được hủy miễn phí trước 22 thg 10. Bạn được hoàn tiền một phần nếu hủy trước khi nhận phòng/bắt đầu
              trải nghiệm vào 23 thg 10.
            </p>
            <p>Xem toàn bộ chính sách của Chủ nhà này để biết chi tiết.</p>
            <Button
              variant={'link'}
              className='p-0 text-base font-semibold underline text-foreground hover:text-primary'
            >
              Hiển thị thêm
              <ChevronRight className='w-5 h-5' />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
