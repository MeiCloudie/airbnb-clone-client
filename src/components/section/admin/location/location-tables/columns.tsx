import { Checkbox } from '@/components/ui/checkbox'
import { Location } from '@/types/location.type'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { CellAction } from '@/components/section/admin/location/location-tables/cell-action'

export const columns: ColumnDef<Location>[] = [
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
    enableSorting: true
  },
  {
    accessorKey: 'tenViTri',
    header: 'LOCATION NAME',
    enableSorting: true
  },
  {
    accessorKey: 'tinhThanh',
    header: 'CITY/PROVINCE',
    enableSorting: true
  },
  {
    accessorKey: 'quocGia',
    header: 'COUNTRY',
    enableSorting: true
  },
  {
    accessorKey: 'hinhAnh',
    header: 'IMAGE',
    cell: ({ row }) => (
      <Image
        loader={({ src }) => src}
        src={row.original.hinhAnh}
        alt={row.original.tenViTri}
        width={50}
        height={50}
        className='aspect-square object-cover object-center rounded-sm'
        unoptimized
      />
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
