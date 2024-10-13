'use client'
import { CellAction } from '@/components/section/admin/user/user-tables/cell-action'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { User } from '@/types/auth.type'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { FileWarning } from 'lucide-react'

export const columns: ColumnDef<User>[] = [
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
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'password',
    header: 'PASSWORD',
    cell: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FileWarning className='w-5 h-5' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Không thể xem thông tin này tại đây</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'phone',
    header: 'PHONE',
    cell: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FileWarning className='w-5 h-5' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Không thể xem thông tin này tại đây</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'birthday',
    header: 'BIRTHDAY',
    cell: ({ row }) => {
      const birthday = row.original.birthday

      if (birthday && !isNaN(Date.parse(birthday))) {
        const date = new Date(birthday)
        return format(date, 'dd/MM/yyyy')
      } else {
        return 'N/A'
      }
    }
  },
  {
    accessorKey: 'avatar',
    header: 'AVATAR',
    cell: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FileWarning className='w-5 h-5' />
          </TooltipTrigger>
          <TooltipContent>
            <p>Không thể xem thông tin này tại đây</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'gender',
    header: 'GENDER',
    cell: ({ row }) => (row.original.gender ? 'Male' : 'Female')
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction key={row.original.id} data={row.original} />
  }
]
