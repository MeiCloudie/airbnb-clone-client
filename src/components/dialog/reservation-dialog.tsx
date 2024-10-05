import ReservationForm from '@/components/form/reservation-form'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import React from 'react'

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
  roomId: string
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({ open, onOpenChange, onClose, roomId }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='h-full md:h-fit'>
        <div className='overflow-auto'>
          <ReservationForm roomId={roomId} onCloseReservationDialog={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReservationDialog
