'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { useRoom } from '@/hooks/useRoom'

interface DeleteRoomDialogProps {
  isOpen: boolean
  onClose: () => void
  roomId: number
}

export default function DeleteRoomDialog({ isOpen, onClose, roomId }: DeleteRoomDialogProps) {
  const { deleteRoom, getAllRooms } = useRoom()
  const { showNotification } = useToastifyNotification()
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    setLoading(true)

    const error = await deleteRoom({ id: roomId })

    if (!error) {
      showNotification('Xóa phòng thành công!', 'success')
      onClose()
      await getAllRooms() // Refresh the list after deletion
    } else {
      showNotification(`Xóa phòng thất bại: ${error.message}`, 'error')
    }

    setLoading(false)
  }

  return (
    <Modal
      title={`Xác nhận xóa phòng có id là ${roomId}`}
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
