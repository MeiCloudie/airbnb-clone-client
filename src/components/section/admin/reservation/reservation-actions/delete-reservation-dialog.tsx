'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'
import { useReservation } from '@/hooks/useReservation'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'

interface DeleteReservationDialogProps {
  isOpen: boolean
  onClose: () => void
  reservationId: number
  redirectToList?: boolean
}

export default function DeleteReservationDialog({
  isOpen,
  onClose,
  reservationId,
  redirectToList
}: DeleteReservationDialogProps) {
  const { deleteReservation, getAllReservations } = useReservation()
  const { showNotification } = useToastifyNotification()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onConfirm = async () => {
    setLoading(true)

    const error = await deleteReservation({ id: reservationId })

    if (!error) {
      showNotification('Xóa thông tin đặt phòng thành công!', 'success')
      onClose()
      await getAllReservations()

      if (redirectToList) {
        router.push(ROUTES.ADMIN.RESERVATIONS)
      }
    } else {
      showNotification(`Xóa thông tin đặt phòng thất bại: ${error.message}`, 'error')
    }

    setLoading(false)
  }

  return (
    <Modal
      title={`Xác nhận xóa thông tin đặt phòng có id là ${reservationId}`}
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
