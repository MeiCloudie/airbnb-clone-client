import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

interface RoomDescriptionProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
  description: string
}

const RoomDescriptionDialog: React.FC<RoomDescriptionProps> = ({ open, onOpenChange, onClose, description }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='h-full md:max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='uppercase'>Giới thiệu về chỗ ở này</DialogTitle>
          <DialogDescription>Liên hệ với chủ nhà để trao đổi thêm thông tin</DialogDescription>
        </DialogHeader>

        <div className='overflow-auto'>
          <div
            dangerouslySetInnerHTML={{
              __html: description
            }}
            className='text-sm md:text-base'
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RoomDescriptionDialog
