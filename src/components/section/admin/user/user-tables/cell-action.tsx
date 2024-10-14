'use client'
import DeleteUserDialog from '@/components/section/admin/user/user-actions/delete-user-dialog'
import UpdateUserDialog from '@/components/section/admin/user/user-actions/update-user-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ROUTES } from '@/constants/routes'
import { User } from '@/types/auth.type'
import { Edit, Info, MoreHorizontal, Trash } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CellActionProps {
  data: User
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <UpdateUserDialog isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} userData={data} />
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        userId={Number(data.id)}
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

          <Link href={ROUTES.ADMIN.USER_DETAIL(String(data.id))}>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
