'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { Reservation } from '@/types/reservation.type'
import { CellAction } from '@/components/section/admin/reservation/reservation-tables/cell-action'
import { format } from 'date-fns'
import { CopyButton } from '@/components/custom/custom-copy-button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

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
    enableHiding: false,
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <CopyButton value={String(row.original.id)} />

        <Link
          href={ROUTES.ADMIN.RESERVATION_DETAIL(String(row.original.id))}
          className='text-foreground font-semibold duration-200 transition-colors hover:text-primary hover:underline'
        >
          {row.original.id}
        </Link>
      </div>
    )
  },
  {
    accessorKey: 'maPhong',
    header: 'ROOM ID',
    enableSorting: true,
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <Link
          href={ROUTES.ADMIN.ROOM_DETAIL(String(row.original.maPhong))}
          className='text-foreground duration-200 transition-colors hover:text-primary hover:underline'
        >
          {row.original.maPhong}
        </Link>
      </div>
    )
  },
  {
    accessorKey: 'maNguoiDung',
    header: 'USER ID',
    enableSorting: true,
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <Link
          href={ROUTES.ADMIN.USER_DETAIL(String(row.original.maNguoiDung))}
          className='text-foreground duration-200 transition-colors hover:text-primary hover:underline'
        >
          {row.original.maNguoiDung}
        </Link>
      </div>
    )
  },
  {
    accessorKey: 'ngayDen',
    header: 'CHECK-IN',
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.ngayDen)
      date.setDate(date.getDate() + 1)

      return format(date, 'dd/MM/yyyy')
    }
  },
  {
    accessorKey: 'ngayDi',
    header: 'CHECK-OUT',
    enableSorting: true,
    cell: ({ row }) => {
      const date = new Date(row.original.ngayDi)
      date.setDate(date.getDate() + 1)

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
    cell: ({ row }) => <CellAction key={row.original.id} data={row.original} />
  }
]
