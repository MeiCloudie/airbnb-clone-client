import AirbnbLogo from '@/components/icon/AirbnbLogo'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

const UserHeader = () => {
  return (
    <header className='sticky top-0 z-50'>
      {/* Logo */}
      <Link href={ROUTES.USER.HOME}>
        <AirbnbLogo />
      </Link>
      {/* Search */}

      {/* Link */}

      {/* User Menu */}
    </header>
  )
}

export default UserHeader
