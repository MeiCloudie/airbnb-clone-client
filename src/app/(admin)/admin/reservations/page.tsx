import ReservationViewPage from '@/components/section/admin/reservation/reservation-views/reservation-view-page'
import { searchParamsCache } from '@/lib/searchparams'
import { SearchParams } from 'nuqs/parsers'
import React from 'react'

type pageProps = {
  searchParams: SearchParams
}

export const metadata = {
  title: 'Dashboard : Reservations'
}

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('q')
  const limit = searchParamsCache.get('limit')

  return <ReservationViewPage page={page} search={search} limit={limit} />
}
