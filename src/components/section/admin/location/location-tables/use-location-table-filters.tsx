'use client'

import { searchParams } from '@/lib/searchparams'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'
import { useLocation } from '@/hooks/useLocation'

export function useLocationTableFilters() {
  const { dataAllLocations } = useLocation()

  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault('')
  )

  const [cityFilter, setCityFilter] = useQueryState(
    'tinhThanh',
    searchParams.tinhThanh.withOptions({ shallow: false }).withDefault('')
  )

  const [countryFilter, setCountryFilter] = useQueryState(
    'quocGia',
    searchParams.quocGia.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1))

  // Generate dynamic CITY and COUNTRY options based on the data fetched
  const CITY_OPTIONS = useMemo(() => {
    const cities = dataAllLocations?.content.map((location) => location.tinhThanh)
    return [...new Set(cities)].map((city) => ({ value: city, label: city })) // Remove duplicates
  }, [dataAllLocations])

  const COUNTRY_OPTIONS = useMemo(() => {
    const countries = dataAllLocations?.content.map((location) => location.quocGia)
    return [...new Set(countries)].map((country) => ({ value: country, label: country })) // Remove duplicates
  }, [dataAllLocations])

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setCityFilter(null)
    setCountryFilter(null)
    setPage(1)
  }, [setSearchQuery, setCityFilter, setCountryFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || cityFilter !== '' || countryFilter !== ''
  }, [searchQuery, cityFilter, countryFilter])

  return {
    searchQuery,
    setSearchQuery,
    cityFilter,
    setCityFilter,
    countryFilter,
    setCountryFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    CITY_OPTIONS,
    COUNTRY_OPTIONS
  }
}
