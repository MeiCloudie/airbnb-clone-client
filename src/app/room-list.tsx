'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const RoomList = () => {
  const [wishlist, setWishlist] = useState(Array(7).fill(false)) // TODO: Tạm thời - chưa có tính năng
  const [ratings, setRatings] = useState<number[]>([]) // TODO: Tạm thời random - chưa có tính năng
  const [mounted, setMounted] = useState(false)

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
    // Khi component mount, khởi tạo các giá trị đánh giá random cho từng card
    const initialRatings = Array.from({ length: 7 }, () => getRandomRating())
    setRatings(initialRatings)

    // Đánh dấu component đã mount
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
      {Array.from({ length: 7 }).map((_, index) => (
        <Card key={index} className='group bg-background border-none shadow-none cursor-pointer hover:overflow-hidden'>
          <div className='relative overflow-hidden rounded-xl'>
            <CardImage
              src='/images/airbnb-background.jpg'
              alt='Image description'
              className='aspect-square object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
            />
            {/* Heart Icon Button */}
            <Button
              variant='ghost'
              size='icon'
              className='absolute top-3 right-3 rounded-full transition-transform duration-300 hover:bg-transparent hover:scale-125'
              onClick={() => toggleWishlist(index)}
            >
              <Heart className={`w-7 h-7 text-white ${wishlist[index] ? 'fill-primary' : 'fill-black/50'}`} />
            </Button>
            {/* Guest Favorite */}
            {ratings[index] >= 4.5 && (
              <div className='absolute top-4 left-3 rounded-full bg-white px-2 py-1'>
                <p className='text-sm font-semibold'>Được khách yêu thích</p>
              </div>
            )}
          </div>
          <CardHeader className='px-0 pt-4 pb-1 space-y-1'>
            <CardTitle className='flex justify-between gap-5'>
              <p className='truncate'>NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!</p>
              {/* Rating */}
              <p className='flex items-center'>
                <Star className='w-4 h-4 me-1 fill-current' />
                {ratings[index] >= 0 && ratings[index] <= 1 ? 'Mới' : ratings[index]}
              </p>
            </CardTitle>
            <CardDescription className='truncate'>
              Cái Răng | Cần Thơ <br />
              Việt Nam
            </CardDescription>
          </CardHeader>
          <CardContent className='text-sm px-0 pb-3 text-muted-foreground'>
            <p className='truncate'>1 phòng ngủ • 1 giường • 1 phòng tắm</p>
            <p className='truncate'>Wifi • Bếp</p>
          </CardContent>
          <CardFooter className='px-0'>
            <p>
              <span className='font-semibold'>₫ 1.666.999</span> / đêm
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default RoomList
