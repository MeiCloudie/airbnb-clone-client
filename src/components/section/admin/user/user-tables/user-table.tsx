'use client'

import { columns } from '@/components/section/admin/user/user-tables/columns'
import {
  GENDER_OPTIONS,
  ROLE_OPTIONS,
  useUserTableFilters
} from '@/components/section/admin/user/user-tables/use-user-table-filters'
import { DataTable } from '@/components/ui/table/data-table'
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box'
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter'
import { DataTableSearch } from '@/components/ui/table/data-table-search'
import { User } from '@/types/auth.type'

export default function UserTable({ data, totalData }: { data: User[]; totalData: number }) {
  const {
    genderFilter,
    setGenderFilter,
    roleFilter,
    setRoleFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery
  } = useUserTableFilters()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-4'>
        <DataTableSearch searchKey='name' searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
        <DataTableFilterBox
          filterKey='gender'
          title='Gender'
          options={GENDER_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
        />
        <DataTableFilterBox
          filterKey='role'
          title='Role'
          options={ROLE_OPTIONS}
          setFilterValue={setRoleFilter}
          filterValue={roleFilter}
        />
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  )
}
