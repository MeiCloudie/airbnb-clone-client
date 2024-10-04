import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Ratings } from '@/components/ui/custom-rating'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import React, { useState } from 'react'

interface CommentRatingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

const CommentRatingDialog: React.FC<CommentRatingDialogProps> = ({ open, onOpenChange, onClose }) => {
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
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className='space-y-4'>
                <div className='flex w-full gap-4 justify-start item-center'>
                  <Avatar className='w-12 h-12'>
                    <AvatarImage src={'/avatars/avatar-girl.jpg'} alt='avatar' className='object-cover object-top' />
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='text-base font-semibold'>Rose Thompson</h4>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <Ratings rating={2.5} totalStars={5} size={12} variant='default' interactive={false} />
                      <p className='mx-2'>•</p>
                      <p>08/23/2024, 04:24:58 PM</p>
                    </div>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='text-sm text-pretty w-full leading-relaxed'>
                    nơi tuyệt vời với phong cách tuyệt vời. cảm thấy rất tốt khi ở đây. khu vực này là trung tâm và chìa
                    khóa thấp. khu phố siêu an toàn đầy đủ các đại sứ quán. ẩm thực đường phố tuyệt vời và tôi yêu thích
                    quán cà phê gần đó. rất khuyên dùng!! một điều tôi không thích là khi tôi hỏi bao nhiêu để giặt quần
                    áo của tôi họ trích dẫn gấp 5 lần giá địa phương. nhưng đó là quyền của họ. các quý cô siêu chuyên
                    nghiệp và rất thân thiện! Tôi không thể đổ lỗi
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentRatingDialog
