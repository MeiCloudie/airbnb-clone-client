'use client'

import { columns } from '@/components/section/admin/location/location-tables/columns'
import { useLocationTableFilters } from '@/components/section/admin/location/location-tables/use-location-table-filters'
import { DataTable } from '@/components/ui/table/data-table'
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box'
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter'
import { DataTableSearch } from '@/components/ui/table/data-table-search'
import { Location } from '@/types/location.type'

export default function LocationTable({ data, totalData }: { data: Location[]; totalData: number }) {
  const {
    cityFilter,
    setCityFilter,
    countryFilter,
    setCountryFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    CITY_OPTIONS,
    COUNTRY_OPTIONS
  } = useLocationTableFilters()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-4'>
        <DataTableSearch
          searchKey='location name or city'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey='tinhThanh'
          title='City'
          options={CITY_OPTIONS}
          setFilterValue={setCityFilter}
          filterValue={cityFilter}
        />
        <DataTableFilterBox
          filterKey='quocGia'
          title='Country'
          options={COUNTRY_OPTIONS}
          setFilterValue={setCountryFilter}
          filterValue={countryFilter}
        />
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  )
}
