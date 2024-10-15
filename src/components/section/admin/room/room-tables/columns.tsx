import { Checkbox } from '@/components/ui/checkbox'
import { Room } from '@/types/room.type'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import Image from 'next/image'
import { CellAction } from '@/components/section/admin/room/room-tables/cell-action'
import { LocationCell } from '@/components/section/admin/room/room-tables/location-cell'
import { CopyButton } from '@/components/custom/custom-copy-button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

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
    enableHiding: false,
    cell: ({ row }) => (
      <div className='flex items-center space-x-2'>
        <CopyButton value={String(row.original.id)} />

        <Link
          href={ROUTES.ADMIN.ROOM_DETAIL(String(row.original.id))}
          className='text-foreground font-semibold duration-200 transition-colors hover:text-primary hover:underline'
        >
          {row.original.id}
        </Link>
      </div>
    )
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
      const { khach, phongNgu, giuong, phongTam } = row.original
      const details = [
        { label: 'Khách', value: khach },
        { label: 'Phòng ngủ', value: phongNgu },
        { label: 'Giường', value: giuong },
        { label: 'Phòng tắm', value: phongTam }
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

      const amenitiesMapping = {
        mayGiat: 'Máy Giặt',
        banLa: 'Bàn Là',
        tivi: 'Tivi',
        dieuHoa: 'Điều Hòa',
        wifi: 'Wi-Fi',
        bep: 'Bếp',
        doXe: 'Đỗ Xe',
        hoBoi: 'Hồ Bơi',
        banUi: 'Bàn Ủi'
      }

      const amenities = { mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi }

      return (
        <div className='flex flex-wrap gap-1'>
          {Object.keys(amenities).map((key) =>
            amenities[key as keyof typeof amenities] ? (
              <Badge key={key} variant='secondary'>
                {amenitiesMapping[key as keyof typeof amenitiesMapping]}
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
        src={row.original.hinhAnh || '/images/image-alternative.jpg'}
        alt={row.original.tenPhong}
        width={50}
        height={50}
        className='aspect-square object-cover object-center rounded-sm'
        unoptimized
        onError={(e) => {
          e.currentTarget.src = '/images/image-alternative.jpg' // Thay thế bằng ảnh khác khi xảy ra lỗi
        }}
      />
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction key={row.original.id} data={row.original} />
  }
]
