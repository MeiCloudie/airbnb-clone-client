'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Reservation } from '@/types/reservation.type'
import { CellAction } from '@/components/section/admin/reservation/reservation-tables/cell-action'
import { format } from 'date-fns'

export const columns: ColumnDef<Reservation>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: false
  },
  {
    accessorKey: 'maPhong',
    header: 'ROOM ID',
    enableSorting: true
  },
  {
    accessorKey: 'maNguoiDung',
    header: 'USER ID',
    enableSorting: true
  },
  {
    accessorKey: 'ngayDen',
    header: 'CHECK-IN',
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.ngayDen)
      return format(date, 'dd/MM/yyyy')
    }
  },
  {
    accessorKey: 'ngayDi',
    header: 'CHECK-OUT',
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.ngayDi)
      return format(date, 'dd/MM/yyyy')
    }
  },
  {
    accessorKey: 'soLuongKhach',
    header: 'GUESTS',
    enableSorting: true
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
