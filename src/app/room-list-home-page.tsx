'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import CustomPagination from '@/components/pagination/custom-pagination'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import RoomCard from '@/app/(user)/rooms/room-card'
import SkeletonRoomCard from '@/app/(user)/rooms/skeleton-room-card'

const RoomListHomePage = () => {
  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const [wishlist, setWishlist] = useState(Array(7).fill(false)) // TODO: Tạm thời - chưa có tính năng
  const [ratings, setRatings] = useState<number[]>([]) // TODO: Tạm thời random - chưa có tính năng

  const { isLoading, data, error, getRoomPagination } = useRoom()
  const { dataAllLocations, getAllLocations } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 10 // Cố định pageSize là 10 - số lượng item trên 1 trang
  const totalPages = data ? Math.ceil(data.content.totalRow / pageSize) : 1 // Tính tổng số trang dựa trên totalRow

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
    getRoomPagination({ pageIndex, pageSize, keywords: null }).finally(() => setIsFirstLoading(false))

    // Random ratings cho từng phòng
    const initialRatings = Array.from({ length: pageSize }, () => parseFloat((Math.random() * 5).toFixed(2)))
    setRatings(initialRatings)
  }, [getRoomPagination, pageIndex])

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
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
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
      {/* Room List */}
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {data?.content.data.map((room, index) => {
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
      <div className='mt-10'>
        <CustomPagination pageIndex={pageIndex} setPageIndex={setPageIndex} totalPages={totalPages} />
      </div>
    </>
  )
}

export default RoomListHomePage
