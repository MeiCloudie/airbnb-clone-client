'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import RoomCard from '@/app/(user)/rooms/room-card'
import SkeletonRoomCard from '@/app/(user)/rooms/skeleton-room-card'

interface RoomListByLocationProps {
  maViTri: number
}

const RoomListByLocation: React.FC<RoomListByLocationProps> = ({ maViTri }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const [wishlist, setWishlist] = useState(Array(7).fill(false)) // TODO: Tạm thời - chưa có tính năng
  const [ratings, setRatings] = useState<number[]>([]) // TODO: Tạm thời random - chưa có tính năng

  const { isLoading, roomsByLocation, error, getRoomByLocation } = useRoom()
  const { dataAllLocations, getAllLocations } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const toggleWishlist = (index: number) => {
    const newWishlist = [...wishlist]
    newWishlist[index] = !newWishlist[index]
    setWishlist(newWishlist)
  }

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  useEffect(() => {
    // Gọi API phân trang khi component mount
    getRoomByLocation({ maViTri }).finally(() => setIsFirstLoading(false))

    // Random ratings cho từng phòng
    const initialRatings = Array.from({ length: 9 }, () => parseFloat((Math.random() * 5).toFixed(2)))
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

  // Render các Skeleton Card khi đang loading
  if (isFirstLoading || isLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {Array.from({ length: 9 || 0 }).map((_, index) => (
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
      {/* Room List */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
        {roomsByLocation?.content.map((room, index) => {
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
    </>
  )
}

export default RoomListByLocation
