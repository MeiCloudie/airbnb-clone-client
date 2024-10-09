'use client'

import { searchParams } from '@/lib/searchparams'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

export const ROLE_OPTIONS = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' }
]

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
]

export function useUserTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault('')
  )

  const [genderFilter, setGenderFilter] = useQueryState(
    'gender',
    searchParams.gender.withOptions({ shallow: false }).withDefault('')
  )

  const [roleFilter, setRoleFilter] = useQueryState(
    'role',
    searchParams.role.withOptions({ shallow: false }).withDefault('')
  )

  const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1))

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setGenderFilter(null)
    setRoleFilter(null)

    setPage(1)
  }, [setSearchQuery, setGenderFilter, setRoleFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || genderFilter !== '' || roleFilter !== ''
  }, [searchQuery, genderFilter, roleFilter])

  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive
  }
}
