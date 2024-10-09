'use client'

import { useEffect, useMemo, useCallback } from 'react'
import { useLocationStore } from '@/store/locationStore' // Import the location store
import { searchParams } from '@/lib/searchparams'
import { useQueryState } from 'nuqs'

export function useRoomTableFilters() {
  // Location store to access locations
  const { getAllLocations, dataAllLocations } = useLocationStore()

  // Fetch locations when the component loads
  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  // Dynamically set LOCATION_OPTIONS from API
  const LOCATION_OPTIONS = useMemo(() => {
    if (!dataAllLocations?.content) return []

    return dataAllLocations.content.map((location) => ({
      value: location.id.toString(),
      label: location.tenViTri
    }))
  }, [dataAllLocations])

  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault('')
  )

  const [locationFilter, setLocationFilter] = useQueryState(
    'maViTri',
    searchParams.maViTri.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1))

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setLocationFilter(null)
    setPage(1)
  }, [setSearchQuery, setLocationFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || locationFilter !== ''
  }, [searchQuery, locationFilter])

  return {
    searchQuery,
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    LOCATION_OPTIONS
  }
}
