'use client'

import Header from '@/components/layout/admin/header'
import Sidebar from '@/components/layout/admin/sidebar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in')
    } else if (status === 'authenticated') {
      if (session?.user?.role !== 'ADMIN') {
        router.push('/')
      } else {
        setIsLoading(false)
      }
    } else if (status === 'loading') {
      setIsLoading(true)
    }
  }, [status, session, router])

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center text-center min-h-screen'>
        <div className='w-96 h-auto'>
          <Image src={'/logo/airbnb-logo-fullname.png'} alt='airbnb-logo-fullname' width={500} height={500} />
        </div>
        <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chào mừng bạn đến với Hệ Thống Quản Trị</h3>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full flex-1 overflow-hidden'>
        <Header />
        {children}
      </main>
    </div>
  )
}
