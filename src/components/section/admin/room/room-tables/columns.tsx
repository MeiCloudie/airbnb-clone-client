import { Checkbox } from '@/components/ui/checkbox'
import { Room } from '@/types/room.type'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import Image from 'next/image'
import { CellAction } from '@/components/section/admin/room/room-tables/cell-action'
import { LocationCell } from '@/components/section/admin/room/room-tables/location-cell'

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: 'tenPhong',
    header: 'ROOM NAME',
    cell: ({ row }) => {
      const roomName = row.original.tenPhong

      return roomName.length > 10 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span>{`${roomName.slice(0, 10)}...`}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{roomName}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span>{roomName}</span>
      )
    },
    enableSorting: true
  },
  {
    id: 'location',
    header: 'LOCATION',
    cell: ({ row }) => <LocationCell maViTri={row.original.maViTri} />,
    enableSorting: true
  },
  {
    accessorKey: 'giaTien',
    header: 'PRICE ($)',
    enableSorting: true
  },
  {
    id: 'roomDetails',
    header: 'DETAILS',
    cell: ({ row }) => {
      const { khach, giuong, phongTam } = row.original
      const details = [
        { label: 'Guests', value: khach },
        { label: 'Beds', value: giuong },
        { label: 'Bathrooms', value: phongTam }
      ]

      return (
        <div className='flex flex-wrap gap-1'>
          {details.map(
            (detail) =>
              detail.value > 0 && (
                <Badge key={detail.label} variant='outline'>
                  {`${detail.label}: ${detail.value}`}
                </Badge>
              )
          )}
        </div>
      )
    }
  },
  {
    id: 'amenities',
    header: 'AMENITIES',
    cell: ({ row }) => {
      const { mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi } = row.original
      const amenities = { mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi }

      return (
        <div className='flex flex-wrap gap-1'>
          {Object.keys(amenities).map((key) =>
            amenities[key as keyof typeof amenities] ? (
              <Badge key={key} variant='secondary'>
                {key.toUpperCase()}
              </Badge>
            ) : null
          )}
        </div>
      )
    }
  },
  {
    accessorKey: 'moTa',
    header: 'DESCRIPTION',
    cell: ({ row }) => {
      const description = row.original.moTa

      return description.length > 10 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span>{`${description.slice(0, 10)}...`}</span>
            </TooltipTrigger>
            <TooltipContent className='w-[40vh]'>
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span>{description}</span>
      )
    }
  },
  {
    accessorKey: 'hinhAnh',
    header: 'IMAGE',
    cell: ({ row }) => (
      <Image
        loader={({ src }) => src}
        src={row.original.hinhAnh}
        alt={row.original.tenPhong}
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
