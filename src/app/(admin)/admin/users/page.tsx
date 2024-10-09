import UserViewPage from '@/components/section/admin/user/user-views/user-view-page'
import { searchParamsCache } from '@/lib/searchparams'
import { SearchParams } from 'nuqs/parsers'
import React from 'react'

type pageProps = {
  searchParams: SearchParams
}

export const metadata = {
  title: 'Dashboard : Users'
}

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('q')
  const gender = searchParamsCache.get('gender')
  const role = searchParamsCache.get('role')
  const limit = searchParamsCache.get('limit')

  return <UserViewPage page={page} search={search} gender={gender} role={role} limit={limit} />
}
