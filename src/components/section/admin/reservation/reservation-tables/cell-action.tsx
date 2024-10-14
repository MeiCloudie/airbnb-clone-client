'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Edit, Info, MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'
import { Reservation } from '@/types/reservation.type'
import UpdateReservationDialog from '@/components/section/admin/reservation/reservation-actions/update-reservation-dialog'
import DeleteReservationDialog from '@/components/section/admin/reservation/reservation-actions/delete-reservation-dialog'

interface CellActionProps {
  data: Reservation
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <UpdateReservationDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        reservationData={data}
      />
      <DeleteReservationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        reservationId={Number(data.id)}
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
          <DropdownMenuItem>
            <Info className='mr-2 h-4 w-4' /> Chi tiết
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdateDialogOpen(true)}>
            <Edit className='mr-2 h-4 w-4' /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
