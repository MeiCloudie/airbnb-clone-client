'use client'

import { searchParams } from '@/lib/searchparams'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

export function useReservationTableFilters() {
  // Query state for search filter (room ID or user ID)
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault('')
  )

  // Query state for pagination
  const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1))

  // Reset filters to default state
  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setPage(1)
  }, [setSearchQuery, setPage])

  // Check if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery
  }, [searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
