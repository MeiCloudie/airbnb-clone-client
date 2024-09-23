'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CustomPagination from '@/components/pagination/custom-pagination'
import { convertUSDToVND } from '@/format/currency'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'

const RoomList = () => {
  const [wishlist, setWishlist] = useState(Array(7).fill(false)) // TODO: Tạm thời - chưa có tính năng
  const [ratings, setRatings] = useState<number[]>([]) // TODO: Tạm thời random - chưa có tính năng
  const [mounted, setMounted] = useState(false)
  const { isLoading, data, error, getRoomPagination } = useRoom()
  const { dataAllLocations, getAllLocations } = useLocation()
  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 10 // Cố định pageSize là 10 - số lượng item trên 1 trang
  const totalPages = data ? Math.ceil(data.content.totalRow / pageSize) : 1 // Tính tổng số trang dựa trên totalRow

  const toggleWishlist = (index: number) => {
    const newWishlist = [...wishlist]
    newWishlist[index] = !newWishlist[index]
    setWishlist(newWishlist)
  }

  // Hàm random số đánh giá
  const getRandomRating = () => {
    return parseFloat((Math.random() * 5).toFixed(2))
  }

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  useEffect(() => {
    // Gọi API phân trang khi component mount
    getRoomPagination({ pageIndex, pageSize, keywords: null })
  }, [getRoomPagination, pageIndex])

  useEffect(() => {
    // Khi component mount, khởi tạo các giá trị đánh giá random cho từng card
    const initialRatings = Array.from({ length: 7 }, () => getRandomRating())
    setRatings(initialRatings)

    // Đánh dấu component đã mount
    setMounted(true)
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.content}</p>
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {data?.content.data.map((room, index) => {
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

          // Tìm thông tin vị trí từ dataAllLocations dựa vào room.maViTri
          const location = dataAllLocations?.content.find((loc) => loc.id === room.maViTri)

          return (
            <Card
              key={index}
              className='group bg-background border-none shadow-none cursor-pointer hover:overflow-hidden'
            >
              <div className='relative overflow-hidden rounded-xl'>
                <CardImage
                  src={room.hinhAnh}
                  alt={`image-${room.id}`}
                  className='aspect-square object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
                />
                {/* Heart Icon Button */}
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute top-2 right-2 md:top-3 md:right-3 rounded-full transition-transform duration-300 hover:bg-transparent hover:scale-125'
                  onClick={() => toggleWishlist(index)}
                >
                  <Heart
                    className={`w-5 h-5 md:w-7 md:h-7 text-white ${wishlist[index] ? 'fill-primary' : 'fill-black/50'}`}
                  />
                </Button>
                {/* Guest Favorite */}
                {ratings[index] >= 4.5 && (
                  <div className='absolute top-4 left-3 rounded-full bg-white px-2 py-1'>
                    <p className='text-[9px] md:text-sm text-black font-semibold'>Được khách yêu thích</p>
                  </div>
                )}
              </div>
              <CardHeader className='px-0 pt-4 pb-1 space-y-1'>
                <CardTitle className='flex justify-between gap-5'>
                  <p className='truncate'>{room.tenPhong}</p>
                  {/* Rating */}
                  <p className='flex items-center'>
                    <Star className='w-4 h-4 me-1 fill-current' />
                    {ratings[index] >= 0 && ratings[index] <= 1 ? 'Mới' : ratings[index]}
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
              <CardContent className='text-sm px-0 pb-3 text-muted-foreground'>
                <p className='truncate font-semibold'>
                  {roomDetails.length > 0 ? roomDetails.join(' • ') : 'Chưa cập nhật thông tin phòng'}
                </p>
                <p className='truncate'>{amenities.length > 0 ? amenities.join(' • ') : 'Chưa cập nhật tiện nghi'}</p>
              </CardContent>
              <CardFooter className='px-0'>
                <p>
                  <span className='font-semibold'>₫ {convertUSDToVND(room.giaTien)}</span> / đêm
                </p>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      <div className='mt-10' id='location-pagination'>
        <CustomPagination pageIndex={pageIndex} setPageIndex={setPageIndex} totalPages={totalPages} />
      </div>
    </>
  )
}

export default RoomList
