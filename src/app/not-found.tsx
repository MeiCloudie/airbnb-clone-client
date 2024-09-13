'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import notFoundAnimation from '../../public/animations/not-found-animation.json'
import { Button } from '@/components/ui/button'

// Sử dụng dynamic import để vô hiệu hóa SSR cho Lottie
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen text-center'>
      <Lottie animationData={notFoundAnimation} loop={true} className='w-96 h-auto' />
      <h1 className='text-3xl font-bold mt-6'>Sorry, Page Not Found</h1>
      <p className='text-lg mt-2'>Could not find requested resource</p>
      <Button asChild size={'lg'} className='mt-6'>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  )
}
