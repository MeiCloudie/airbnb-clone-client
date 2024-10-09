'use client'

import { columns } from '@/components/section/admin/reservation/reservation-tables/columns'
import { useReservationTableFilters } from '@/components/section/admin/reservation/reservation-tables/use-reservation-table-filters'
import { DataTable } from '@/components/ui/table/data-table'
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter'
import { DataTableSearch } from '@/components/ui/table/data-table-search'
import { Reservation } from '@/types/reservation.type'

export default function ReservationTable({ data, totalData }: { data: Reservation[]; totalData: number }) {
  const { searchQuery, setSearchQuery, setPage, resetFilters, isAnyFilterActive } = useReservationTableFilters()

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-4'>
        <DataTableSearch
          searchKey='Room ID or User ID'
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
      </div>

      <DataTable columns={columns} data={data} totalItems={totalData} />
    </div>
  )
}
