import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SkeletonRoomCard = () => {
  return (
    <Card className='group bg-background border-none shadow-none'>
      <div className='relative overflow-hidden rounded-xl'>
        <Skeleton className='aspect-square w-full' />
      </div>
      <CardHeader className='px-0 pt-4 pb-1'>
        <Skeleton className='h-6 w-3/4' /> {/* Title Skeleton */}
      </CardHeader>
      <CardContent className='px-0 pb-3'>
        <Skeleton className='h-4 w-full mb-1' /> {/* Description Skeleton */}
        <Skeleton className='h-4 w-2/3' /> {/* Description Skeleton */}
      </CardContent>
      <CardFooter className='px-0'>
        <Skeleton className='h-5 w-1/2' /> {/* Price Skeleton */}
      </CardFooter>
    </Card>
  )
}

export default SkeletonRoomCard
