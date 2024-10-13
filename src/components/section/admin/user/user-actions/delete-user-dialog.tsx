'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { useUser } from '@/hooks/useUser'

interface DeleteUserDialogProps {
  isOpen: boolean
  onClose: () => void
  userId: number
}

export default function DeleteUserDialog({ isOpen, onClose, userId }: DeleteUserDialogProps) {
  const { deleteUser, getAllUsers } = useUser()
  const { showNotification } = useToastifyNotification()
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    setLoading(true)

    const error = await deleteUser({ id: userId })

    if (!error) {
      showNotification('Xóa người dùng thành công!', 'success')
      onClose()
      await getAllUsers() // Refresh the list after deletion
    } else {
      showNotification(`Xóa người dùng thất bại: ${error.message}`, 'error')
    }

    setLoading(false)
  }

  return (
    <Modal
      title={`Xác nhận xóa người dùng có id là ${userId}`}
      description='Hành động này không thể hoàn tác.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Hủy
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          {loading ? 'Đang xóa...' : 'Xóa'}
        </Button>
      </div>
    </Modal>
  )
}
