import React from 'react'
import Image from 'next/image'

const RecommendLocations = () => {
  return (
    <div className='mt-8'>
      {/* Title */}
      <div className='mb-6'>
        <h1 className='font-bold text-2xl'>Khám phá những điểm đến được yêu thích</h1>
        <p className='text-muted-foreground text-lg'>Đề xuất cho bạn những vị trí gần đây</p>
      </div>

      {/* List */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className='flex gap-4 justify-start items-center rounded-md cursor-pointer group transition-colors duration-300 hover:bg-muted'
          >
            {/* Image */}
            <Image
              src='/images/airbnb-background.jpg'
              alt={`location-${index}`}
              width={500}
              height={500}
              className='w-20 h-auto rounded-md aspect-square object-cover object-center'
            />
            {/* Content */}
            <div>
              <h3 className='text-lg font-semibold transition-colors duration-300 group-hover:text-primary'>Quận 1</h3>
              <h5 className='text-md text-muted-foreground transition-colors duration-300 group-hover:text-primary/75'>
                Hồ Chí Minh, Việt Nam
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendLocations
