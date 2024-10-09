import RoomViewPage from '@/components/section/admin/room/room-views/room-view-page'
import { searchParamsCache } from '@/lib/searchparams'
import { SearchParams } from 'nuqs/parsers'
import React from 'react'

type pageProps = {
  searchParams: SearchParams
}

export const metadata = {
  title: 'Dashboard : Rooms'
}

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('q')
  const maViTri = searchParamsCache.get('maViTri')
  const limit = searchParamsCache.get('limit')

  return <RoomViewPage page={page} search={search} maViTri={maViTri} limit={limit} />
}
