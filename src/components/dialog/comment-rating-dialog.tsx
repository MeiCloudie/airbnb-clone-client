import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Ratings } from '@/components/ui/custom-rating'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CommentByRoomId } from '@/types/comment.type'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'

interface CommentRatingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
  comments: CommentByRoomId[]
}

const CommentRatingDialog: React.FC<CommentRatingDialogProps> = ({ open, onOpenChange, onClose, comments }) => {
  const [openPopover, setOpenPopover] = useState(false)

  const filters = [
    {
      value: 'Gần đây nhất',
      label: 'Gần đây nhất'
    },
    {
      value: 'Có điểm xếp hạng cao nhất',
      label: 'Có điểm xếp hạng cao nhất'
    },
    {
      value: 'Có điểm xếp hạng thấp nhất',
      label: 'Có điểm xếp hạng thấp nhất'
    }
  ]

  const [value, setValue] = useState(filters[0].value)

  const handleSelect = (currentValue: string) => {
    setValue(currentValue === value ? '' : currentValue)
    setOpenPopover(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex flex-col h-full md:max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='uppercase'>Tất cả bình luận đánh giá</DialogTitle>
          <DialogDescription>Dưới đây là các trải nghiệm thật từ các khách hàng</DialogDescription>

          {/* Tổng và bộ lọc */}
          <div className='pt-4 flex gap-2 justify-between items-center'>
            <h3 className='text-sm md:text-lg font-semibold'>146 lượt đánh giá</h3>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openPopover}
                  className='w-fit text-xs md:text-base justify-between'
                >
                  {filters.find((framework) => framework.value === value)?.label}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {filters.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={() => handleSelect(framework.value)}
                        >
                          <Check
                            className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </DialogHeader>

        <div className='overflow-auto'>
          {/* Danh sách tất cả bình luận */}
          <div className='mt-2 grid grid-cols-1 gap-16'>
            {comments.length === 0 ? (
              <p className='text-sm text-center'>
                Chưa có bình luận đánh giá nào. Hãy là người đầu tiên để lại đánh giá!
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className='space-y-4'>
                  <div className='flex w-full gap-4 justify-start item-center'>
                    <Avatar className='w-12 h-12'>
                      <AvatarImage src={comment.avatar} alt='avatar' className='object-cover object-top' />
                      <AvatarFallback className='bg-primary text-background font-bold'>
                        {comment.tenNguoiBinhLuan.toString().charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className='text-base font-semibold'>{comment.tenNguoiBinhLuan}</h4>
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <Ratings
                          rating={comment.saoBinhLuan}
                          totalStars={5}
                          size={12}
                          variant='default'
                          interactive={false}
                        />
                        <p className='mx-2'>•</p>
                        <p>
                          {new Date(comment.ngayBinhLuan).toLocaleDateString('en-US')},{' '}
                          {new Date(comment.ngayBinhLuan).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full'>
                    <p className='text-sm text-pretty w-full leading-relaxed'>{comment.noiDung}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentRatingDialog
