'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomPagination from '@/components/pagination/custom-pagination'
import { useLocation } from '@/hooks/useLocation'
import { Skeleton } from '@/components/ui/skeleton'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

const RecommendLocations = () => {
  const router = useRouter()
  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, dataLocationPagination, error, getLocationPagination } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 8 // Cố định pageSize là 8 - số lượng item trên 1 trang
  const totalPages = dataLocationPagination ? Math.ceil(dataLocationPagination.content.totalRow / pageSize) : 1 // Tính tổng số trang dựa trên totalRow

  useEffect(() => {
    // Gọi API phân trang khi component mount
    getLocationPagination({ pageIndex, pageSize, keywords: null }).finally(() => setIsFirstLoading(false))
  }, [getLocationPagination, pageIndex])

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

  if (isFirstLoading || isLoading) {
    return (
      <div className='mt-14'>
        <div className='mb-6'>
          <h1 className='font-bold text-2xl'>Khám phá những điểm đến được yêu thích</h1>
          <p className='text-muted-foreground text-lg'>Đề xuất cho bạn những vị trí gần đây</p>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: pageSize }).map((_, index) => (
            <div key={index} className='flex gap-4 justify-start items-center'>
              <Skeleton className='w-20 h-20 rounded-md' /> {/* Image Skeleton */}
              <div className='flex flex-col'>
                <Skeleton className='h-5 w-40 mb-2' /> {/* Title Skeleton */}
                <Skeleton className='h-4 w-24' /> {/* Subtitle Skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return null
  }

  const handleCardClick = (location: { id: number; tenViTri: string; tinhThanh: string; quocGia: string }) => {
    // Xử lý điều hướng khi click vào card vị trí
    const params = new URLSearchParams({
      location_id: location.id.toString(),
      location_label: encodeURIComponent(`${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`)
    })
    router.push(`${ROUTES.USER.ROOMS.LOCATION}?${params.toString()}`)
  }

  return (
    <div className='mt-14'>
      {/* Title */}
      <div className='mb-6'>
        <h1 className='font-bold text-2xl'>Khám phá những điểm đến được yêu thích</h1>
        <p className='text-muted-foreground text-lg'>Đề xuất cho bạn những vị trí gần đây</p>
      </div>

      {/* List */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {dataLocationPagination?.content.data.map((location, index) => (
          <div
            key={location.id}
            onClick={() => handleCardClick(location)}
            className='flex gap-4 justify-start items-center rounded-md cursor-pointer group transition-colors duration-300 hover:bg-muted'
          >
            {/* Image */}
            <Image
              loader={({ src }) => src}
              src={location.hinhAnh}
              alt={`location-${index}`}
              width={500}
              height={500}
              loading='lazy'
              unoptimized
              className='w-20 h-auto rounded-md aspect-square object-cover object-center'
            />
            {/* Content */}
            <div>
              <h3 className='truncate text-lg font-semibold transition-colors duration-300 group-hover:text-primary'>
                {location.tenViTri}
              </h3>
              <h5 className='truncate text-base text-muted-foreground transition-colors duration-300 group-hover:text-primary/75'>
                {location.tinhThanh}, {location.quocGia}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-10'>
        <CustomPagination pageIndex={pageIndex} setPageIndex={setPageIndex} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default RecommendLocations
