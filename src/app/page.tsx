'use client'

import RecommendLocations from '@/app/recommend-locations'
import RoomList from '@/app/room-list'
import CategoryHeader from '@/components/layout/user/category-header'
import UserFooter from '@/components/layout/user/user-footer'
import UserHeader from '@/components/layout/user/user-header'
import localStorageService from '@/services/localStorage.service'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    localStorageService.remove('searchResults')
  }, [])

  return (
    <>
      <UserHeader CategoryHeader={CategoryHeader} />

      <main className='container py-7'>
        {/* Rooms List */}
        <RoomList />

        {/* Recommend Locations */}
        <RecommendLocations />
      </main>

      <UserFooter />
    </>
  )
}
