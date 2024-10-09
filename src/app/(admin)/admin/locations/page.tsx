import LocationViewPage from '@/components/section/admin/location/location-views/location-view-page'
import { searchParamsCache } from '@/lib/searchparams'
import { SearchParams } from 'nuqs/parsers'
import React from 'react'

type pageProps = {
  searchParams: SearchParams
}

export const metadata = {
  title: 'Dashboard : Locations'
}

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('q')
  const tinhThanh = searchParamsCache.get('tinhThanh')
  const quocGia = searchParamsCache.get('quocGia')
  const limit = searchParamsCache.get('limit')

  return <LocationViewPage page={page} search={search} tinhThanh={tinhThanh} quocGia={quocGia} limit={limit} />
}
