'use client'

import UserFooter from '@/components/layout/user/user-footer'
import UserHeader from '@/components/layout/user/user-header'
import { useSession, signOut } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  // const router = useRouter()

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/sign-in')
  //   }
  // }, [status, router])

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <UserHeader />
      <h1>Home Page</h1>
      {session && (
        <div>
          <p>Welcome, {session.user?.email}</p>
          <p>Your role is: {session.user?.role}</p>
          <button onClick={() => signOut({ callbackUrl: '/sign-in' })}>Sign Out</button>
        </div>
      )}
      <UserFooter />
    </>
  )
}
