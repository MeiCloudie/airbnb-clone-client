'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { useLocation } from '@/hooks/useLocation'

interface DeleteLocationDialogProps {
  isOpen: boolean
  onClose: () => void
  locationId: number
}

export default function DeleteLocationDialog({ isOpen, onClose, locationId }: DeleteLocationDialogProps) {
  const { deleteLocation, getAllLocations } = useLocation()
  const { showNotification } = useToastifyNotification()
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    setLoading(true)

    const error = await deleteLocation({ id: locationId })

    if (!error) {
      showNotification('Xóa vị trí thành công!', 'success')
      onClose()
      await getAllLocations() // Refresh the list after deletion
    } else {
      showNotification(`Xóa vị trí thất bại: ${error.message}`, 'error')
    }

    setLoading(false)
  }

  return (
    <Modal
      title={`Xác nhận xóa vị trí có id là ${locationId}`}
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
