'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import RoomCard from '@/app/(user)/rooms/room-card'
import SkeletonRoomCard from '@/app/(user)/rooms/skeleton-room-card'
import CustomPagination from '@/components/pagination/custom-pagination'

interface RoomListByLocationProps {
  maViTri: number
  locationLabel: string
}

const RoomListByLocation: React.FC<RoomListByLocationProps> = ({ maViTri, locationLabel }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const [wishlist, setWishlist] = useState(Array(7).fill(false)) // TODO: Tạm thời - chưa có tính năng
  const [ratings, setRatings] = useState<number[]>([]) // TODO: Tạm thời random - chưa có tính năng

  const { isLoading, roomsByLocation, error, getRoomByLocation } = useRoom()
  const { dataAllLocations, getAllLocations } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 6 // Cố định pageSize là 6 - số lượng item trên 1 trang

  const toggleWishlist = (index: number) => {
    const newWishlist = [...wishlist]
    newWishlist[index] = !newWishlist[index]
    setWishlist(newWishlist)
  }

  // Scroll to top when pageIndex changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [pageIndex])

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  useEffect(() => {
    // Gọi API phân trang khi component mount
    getRoomByLocation({ maViTri }).finally(() => setIsFirstLoading(false))

    // Random ratings cho từng phòng
    const initialRatings = Array.from({ length: pageSize }, () => parseFloat((Math.random() * 5).toFixed(2)))
    setRatings(initialRatings)
  }, [getRoomByLocation, maViTri])

  useEffect(() => {
    if (error && !hasShownError) {
      // Chỉ hiển thị thông báo lỗi 1 lần
      // console.log(error.content)
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
  // Tính toán dữ liệu hiển thị dựa trên phân trang
  const paginatedData = roomsByLocation?.content.slice((pageIndex - 1) * pageSize, pageIndex * pageSize) || []

  // Tính tổng số trang
  const totalPages = roomsByLocation ? Math.ceil(roomsByLocation.content.length / pageSize) : 1

  // Render các Skeleton Card khi đang loading
  if (isFirstLoading || isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: pageSize }).map((_, index) => (
          <SkeletonRoomCard key={index} />
        ))}
      </div>
    )
  }

  if (error) {
    return null
  }

  return (
    <>
      {/* Title */}
      <h1 className='mb-4 font-semibold text-lg'>
        Tìm thấy {roomsByLocation ? roomsByLocation.content.length : 0} chỗ ở
      </h1>

      {/* Room List */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {paginatedData.map((room, index) => {
          // Tìm thông tin vị trí từ dataAllLocations dựa vào room.maViTri
          const location = dataAllLocations?.content.find((loc) => loc.id === room.maViTri)

          return (
            <RoomCard
              key={room.id}
              room={room}
              location={location}
              isInWishlist={wishlist[index]}
              rating={ratings[index]}
              onWishlistToggle={() => toggleWishlist(index)}
            />
          )
        })}
      </div>

      {/* Pagination */}
      {roomsByLocation && roomsByLocation.content.length > 0 ? (
        <div className='mt-10'>
          <CustomPagination pageIndex={pageIndex} setPageIndex={setPageIndex} totalPages={totalPages} />
        </div>
      ) : (
        <h2 className='italic text-md'>
          {locationLabel && locationLabel !== ''
            ? `"${locationLabel}" hiện chưa được cập nhật phòng. Hãy liên hệ chúng tôi để được hỗ trợ sớm nhất!`
            : 'Vị trí bạn chọn chưa được xác định rõ. Hãy thử tìm kiếm lại nhé!'}
        </h2>
      )}
    </>
  )
}

export default RoomListByLocation
