'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLocationStore } from '@/store/locationStore'
import CustomPagination from '@/components/pagination/custom-pagination'

const RecommendLocations = () => {
  const { isLoading, data, error, getLocationPagination } = useLocationStore()
  const [pageIndex, setPageIndex] = useState(1)
  const pageSize = 8 // Cố định pageSize là 8 - số lượng item trên 1 trang
  const totalPages = data ? Math.ceil(data.content.totalRow / pageSize) : 1 // Tính tổng số trang dựa trên totalRow

  useEffect(() => {
    // Gọi API phân trang khi component mount
    getLocationPagination({ pageIndex, pageSize, keywords: null })
  }, [getLocationPagination, pageIndex])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.content}</p>
  }

  return (
    <div className='mt-8'>
      {/* Title */}
      <div className='mb-6'>
        <h1 className='font-bold text-2xl'>Khám phá những điểm đến được yêu thích</h1>
        <p className='text-muted-foreground text-lg'>Đề xuất cho bạn những vị trí gần đây</p>
      </div>

      {/* List */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {data?.content.data.map((location, index) => (
          <div
            key={location.id}
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
              <h5 className='truncate text-md text-muted-foreground transition-colors duration-300 group-hover:text-primary/75'>
                {location.tinhThanh}, {location.quocGia}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-10' id='location-pagination'>
        <CustomPagination pageIndex={pageIndex} setPageIndex={setPageIndex} totalPages={totalPages} />
      </div>
    </div>
  )
}

export default RecommendLocations
