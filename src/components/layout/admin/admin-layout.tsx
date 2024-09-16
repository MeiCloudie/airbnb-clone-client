'use client'

import Header from '@/components/layout/admin/header'
import Sidebar from '@/components/layout/admin/sidebar'
import { useSession } from 'next-auth/react'
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
    return <p>Loading...</p>
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
