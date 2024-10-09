'use client'
import { AlertModal } from '@/components/modal/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { User } from '@/types/auth.type'
import { Edit, Info, MoreHorizontal, Trash } from 'lucide-react'
import { useState } from 'react'

interface CellActionProps {
  data: User
}

export const CellAction: React.FC<CellActionProps> = ({}) => {
  // ! Remove data
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    setLoading(true)
    // Perform delete operation
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
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
          <DropdownMenuItem>
            <Edit className='mr-2 h-4 w-4' /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
