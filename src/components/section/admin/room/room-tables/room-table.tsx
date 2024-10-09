'use client'

import { columns } from '@/components/section/admin/room/room-tables/columns'
import { useRoomTableFilters } from '@/components/section/admin/room/room-tables/use-room-table-filters'
import { DataTable } from '@/components/ui/table/data-table'
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box'
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter'
import { DataTableSearch } from '@/components/ui/table/data-table-search'
import { Room } from '@/types/room.type'

export default function RoomTable({ data, totalData }: { data: Room[]; totalData: number }) {
  const {
    locationFilter,
    setLocationFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    LOCATION_OPTIONS
  } = useRoomTableFilters()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-4'>
        <DataTableSearch
          searchKey='room name'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey='maViTri'
          title='Location'
          options={LOCATION_OPTIONS}
          setFilterValue={setLocationFilter}
          filterValue={locationFilter}
        />
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  )
}
