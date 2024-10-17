'use client'
import DeleteLocationDialog from '@/components/section/admin/location/location-actions/delete-location-dialog'
import UpdateLocationDialog from '@/components/section/admin/location/location-actions/update-location-dialog'
import UploadImageLocationDialog from '@/components/section/admin/location/location-actions/upload-image-location-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/constants/routes'
import { Location } from '@/types/location.type'
import { Edit, ImageIcon, Info, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CellActionProps {
  data: Location
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUploadImageDialogOpen, setIsUploadImageDialogOpen] = useState(false)

  return (
    <>
      <UpdateLocationDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        locationData={data}
      />
      <DeleteLocationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        locationId={Number(data.id)}
      />
      <UploadImageLocationDialog
        isOpen={isUploadImageDialogOpen}
        onClose={() => setIsUploadImageDialogOpen(false)}
        locationId={Number(data.id)}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <Link href={ROUTES.ADMIN.LOCATION_DETAIL(String(data.id))}>
            <DropdownMenuItem>
              <Info className='mr-2 h-4 w-4' /> Chi tiết
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            <Edit className='mr-2 h-4 w-4' /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Xoá
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUploadImageDialogOpen(true)}>
            <ImageIcon className='mr-2 h-4 w-4' /> Cập nhật Ảnh
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
