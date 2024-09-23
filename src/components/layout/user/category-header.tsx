'use client'

import FiltersIcon from '@/components/icon/filters'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { categories } from '@/constants/data'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const CategoryHeader = () => {
  const [isTaxMode, setIsTaxMode] = useState(false)
  const [mounted, setMounted] = useState(false) // Kiểm tra trạng thái mounted để tránh lỗi hydration

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTaxMode = () => {
    setIsTaxMode((prevMode) => !prevMode)
  }

  if (!mounted) {
    return (
      <div className='py-2 shadow bg-background'>
        <div className='container'>
          <div className='grid grid-cols-12 justify-center items-center w-full gap-2'>
            {/* Carousel Skeleton */}
            <div className='col-span-12 md:col-span-5 lg:col-span-7 xl:col-span-8 2xl:col-span-9'>
              <div className='flex gap-2 py-[11.85px]'>
                {/* {Array.from({ length: 12 }).map((_, index) => ( */}
                <Skeleton className='h-14 w-full' />
                {/* ))} */}
              </div>
            </div>

            <div className='col-span-12 md:col-span-7 lg:col-span-5 xl:col-span-4 2xl:col-span-3 flex justify-center md:justify-end items-center gap-2'>
              {/* Filters Skeleton */}
              <Skeleton className='h-14 w-24' />
              {/* Taxes Switch Skeleton */}
              <Skeleton className='h-14 w-60' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='py-2 shadow bg-background'>
      <div className='container'>
        <div className='grid grid-cols-12 justify-center items-center w-full gap-2'>
          {/* Carousel */}
          <div className='col-span-12 md:col-span-5 lg:col-span-7 xl:col-span-8 2xl:col-span-9 px-12'>
            <Carousel
              opts={{
                align: 'start'
              }}
            >
              <CarouselContent className='-ml-1'>
                {categories.map((category, index) => (
                  <CarouselItem key={index} className='pl-1 basis-auto'>
                    <div className='p-1'>
                      <Card className='bg-background border-t-0 border-b-2 border-b-transparent border-x-0 rounded-none shadow-none cursor-pointer opacity-70 hover:border-b-border hover:border-b-2 hover:opacity-100'>
                        <CardContent className='flex flex-col gap-2 text-center  items-center justify-center p-2'>
                          <span>
                            <Image
                              src={category.icon ?? ''}
                              alt={`icon-${index}`}
                              width={30}
                              height={30}
                              loading='eager'
                              className='dark:bg-foreground rounded-full p-1'
                            />
                          </span>
                          <span className='text-xs font-semibold'>{category.name}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className='col-span-12 md:col-span-7 lg:col-span-5 xl:col-span-4 2xl:col-span-3 flex justify-center md:justify-end items-center gap-2'>
            {/* Filters */}
            <Button variant={'outline'} className='py-[26px] shadow'>
              <span className='me-2'>
                <FiltersIcon />
              </span>
              <Label htmlFor='filters'>Bộ lọc</Label>
            </Button>

            {/* Taxes Switch */}
            <Card className='cursor-pointer border border-input bg-background shadow hover:bg-accent hover:text-accent-foreground'>
              <CardContent onClick={toggleTaxMode} className='flex items-center justify-center px-3 py-4'>
                <Label htmlFor='taxes-mode' className='me-2 cursor-pointer' onClick={toggleTaxMode}>
                  Hiển thị tổng trước thuế
                </Label>
                <Switch id='taxes-mode' checked={isTaxMode} onCheckedChange={toggleTaxMode} onClick={toggleTaxMode} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryHeader
