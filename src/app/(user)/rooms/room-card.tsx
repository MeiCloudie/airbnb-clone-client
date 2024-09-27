import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '@/components/ui/card'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { convertUSDToVND } from '@/format/currency'
import { ROUTES } from '@/constants/routes'
import { Room } from '@/types/room.type'
import { Location } from '@/types/location.type'
import { useRouter } from 'next/navigation'

interface RoomCardProps {
  room: Room
  location: Location | undefined
  isInWishlist: boolean
  rating: number
  onWishlistToggle: () => void
}

const RoomCard: React.FC<RoomCardProps> = ({ room, location, isInWishlist, rating, onWishlistToggle }) => {
  const router = useRouter()

  // Tạo mảng các tiện nghi dựa trên giá trị boolean
  const amenities = [
    room.wifi && 'Wifi',
    room.bep && 'Bếp',
    room.mayGiat && 'Máy giặt',
    room.banLa && 'Bàn là',
    room.tivi && 'Tivi',
    room.dieuHoa && 'Điều hòa',
    room.doXe && 'Đỗ xe',
    room.hoBoi && 'Hồ bơi',
    room.banUi && 'Bàn ủi'
  ].filter(Boolean) // Lọc ra các giá trị 'true'

  // Tạo mảng chứa thông tin phòng ngủ, giường, phòng tắm
  const roomDetails = [
    room.phongNgu > 0 && `${room.phongNgu} phòng ngủ`,
    room.giuong > 0 && `${room.giuong} giường`,
    room.phongTam > 0 && `${room.phongTam} phòng tắm`
  ].filter(Boolean) // Lọc ra các giá trị hợp lệ

  const handleCardClick = () => {
    router.push(ROUTES.USER.ROOMS.ROOM_DETAIL(room.id.toString()))
  }

  return (
    <Card className='group bg-background border-none shadow-none cursor-pointer hover:overflow-hidden'>
      <div className='relative overflow-hidden rounded-xl'>
        <CardImage
          src={room.hinhAnh || '/images/image-alternative.jpg'}
          alt={`image-${room.id}`}
          className='aspect-square object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
          onClick={handleCardClick}
          onError={(e) => {
            e.currentTarget.src = '/images/image-alternative.jpg' // Thay thế bằng ảnh khác khi xảy ra lỗi
          }}
        />
        {/* Heart Icon Button */}
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-2 right-2 md:top-3 md:right-3 rounded-full transition-transform duration-300 hover:bg-transparent hover:scale-125'
          onClick={(e) => {
            e.preventDefault()
            onWishlistToggle()
          }}
        >
          <Heart className={`w-5 h-5 md:w-7 md:h-7 text-white ${isInWishlist ? 'fill-primary' : 'fill-black/50'}`} />
        </Button>
        {/* Guest Favorite */}
        {rating >= 4.5 ? (
          <div className='absolute top-4 left-3 rounded-full bg-white px-2 py-1 shadow-md'>
            <p className='text-[9px] md:text-sm text-black font-semibold'>Được khách yêu thích</p>
          </div>
        ) : rating >= 3.5 ? (
          <div className='absolute top-4 left-3 rounded-full bg-black/75 px-2 py-1 shadow-md'>
            <p className='text-[9px] md:text-sm text-white font-semibold'>Chủ nhà siêu cấp</p>
          </div>
        ) : null}
      </div>
      <CardHeader className='px-0 pt-4 pb-1 space-y-1' onClick={handleCardClick}>
        <CardTitle className='flex justify-between gap-5'>
          <p className='truncate'>{room.tenPhong}</p>
          {/* Rating */}
          <p className='flex items-center'>
            <Star className='w-4 h-4 me-1 fill-current' />
            {rating >= 0 && rating <= 1 ? 'Mới' : rating}
          </p>
        </CardTitle>
        <CardDescription className='truncate'>
          {location ? (
            <>
              {location.tenViTri} | {location.tinhThanh} <br />
              {location.quocGia}
            </>
          ) : (
            <>
              {'Chưa cập nhật vị trí'} <br /> {'???'}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className='text-sm px-0 pb-3 text-muted-foreground' onClick={handleCardClick}>
        <p className='truncate font-semibold'>
          {roomDetails.length > 0 ? roomDetails.join(' • ') : 'Chưa cập nhật thông tin phòng'}
        </p>
        <p className='truncate'>{amenities.length > 0 ? amenities.join(' • ') : 'Chưa cập nhật tiện nghi'}</p>
      </CardContent>
      <CardFooter className='px-0' onClick={handleCardClick}>
        <p>
          <span className='font-semibold'>₫ {convertUSDToVND(room.giaTien)}</span> / đêm
        </p>
      </CardFooter>
    </Card>
  )
}

export default RoomCard
