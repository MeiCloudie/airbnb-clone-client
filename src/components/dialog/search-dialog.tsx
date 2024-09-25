import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

import { Check, ChevronsUpDown, Clock } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLocation } from '@/hooks/useLocation'
import { Location } from '@/types/location.type'
import localStorageService from '@/services/localStorage.service'

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [openCombobox, setOpenCombobox] = React.useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ id: number; label: string } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [recentSearches, setRecentSearches] = useState<{ id: number; label: string }[]>([])

  const { dataAllLocations, getAllLocations, isLoading } = useLocation()

  useEffect(() => {
    if (open) {
      getAllLocations()

      // Lấy lại dữ liệu recent searches từ localStorage
      const recent = localStorageService.get<{ id: number; label: string }[], []>('recentSearches', [])
      setRecentSearches(recent)
    }
  }, [open, getAllLocations])

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep))
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep))
  }

  const handleSelectLocation = (location: Location) => {
    const newSelectedLocation = {
      id: location.id,
      label: `${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`
    }
    console.log('Selected Location:', newSelectedLocation)

    setSelectedLocation(newSelectedLocation)
    setOpenCombobox(false)
    setSearchTerm('') // Reset searchTerm để hiển thị lại danh sách đầy đủ

    // Lưu vào localStorage và cập nhật recent searches
    const updatedSearches = [newSelectedLocation, ...recentSearches.filter((item) => item.id !== location.id)].slice(
      0,
      3
    )
    localStorageService.set('recentSearches', updatedSearches)
    setRecentSearches(updatedSearches) // Cập nhật giao diện
  }

  // Xử lý khi chọn từ lịch sử tìm kiếm
  const handleSelectFromHistory = (location: { id: number; label: string }) => {
    console.log('Selected Location:', location)

    setSelectedLocation(location)
    setOpenCombobox(false)
  }

  const steps = [
    {
      id: 1,
      name: 'Địa điểm',
      title: 'Địa điểm bất kỳ',
      description: 'Chọn địa điểm bạn muốn tìm kiếm',
      content: (
        <>
          {/* Combobox for Locations */}
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' aria-expanded={openCombobox} className='w-full justify-between'>
                {selectedLocation ? selectedLocation.label : 'Chọn địa điểm...'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-full min-w-80 p-0' align='start'>
              <Command>
                <CommandInput placeholder='Tìm kiếm địa điểm...' value={searchTerm} onValueChange={setSearchTerm} />
                <CommandList>
                  {isLoading ? (
                    <CommandEmpty>Đang tải...</CommandEmpty>
                  ) : dataAllLocations?.content.length === 0 ? (
                    <CommandEmpty>Không có địa điểm nào.</CommandEmpty>
                  ) : (
                    <CommandGroup className='w-full'>
                      {dataAllLocations?.content.map((location) => (
                        <CommandItem
                          key={location.id}
                          value={`${location.tenViTri}, ${location.tinhThanh}, ${location.quocGia}`}
                          onSelect={() => handleSelectLocation(location)}
                          className='w-full'
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              selectedLocation?.id === location.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {location.tenViTri}, {location.tinhThanh}, {location.quocGia}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Recent Search Locations */}
          {recentSearches.length > 0 && (
            <div className='mt-6'>
              <h3 className='text-md font-semibold mb-3'>Tìm kiếm gần đây</h3>
              <div className='flex flex-col gap-2'>
                {recentSearches.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-3 rounded-md cursor-pointer hover:bg-muted'
                    onClick={() => handleSelectFromHistory(item)}
                  >
                    <div className='p-3 rounded-md bg-muted-foreground/20'>
                      <Clock className='w-4 h-4' />
                    </div>
                    <p className='text-sm'>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )
    },
    {
      id: 2,
      name: 'Tuần',
      title: 'Tuần bất kỳ',
      description: 'Chọn khoảng thời gian bạn muốn đi du lịch',
      content: <div>Step 2: Nội dung chọn tuần</div>
    },
    {
      id: 3,
      name: 'Khách',
      title: 'Thêm số lượng khách',
      description: 'Chọn số lượng khách đi cùng',
      content: <div>Step 3: Nội dung thêm số lượng khách</div>
    }
  ]

  const isLastStep = currentStep === steps.length - 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Step Indicator */}
        <div className='mt-6'>
          <ul className='flex gap-4'>
            {steps.map((step, index) => (
              <li key={step.name} className='md:flex-1'>
                {currentStep > index ? (
                  <div className='group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                    <span className='text-sm font-medium text-primary transition-colors'>Step {step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className='flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                    aria-current='step'
                  >
                    <span className='text-sm font-medium text-primary'>Step {step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                ) : (
                  <div className='group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                    <span className='text-sm font-medium text-gray-500 transition-colors'>Step {step.id}</span>
                    <span className='text-sm font-medium'>{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        {/* Main Content */}
        <DialogHeader>
          <DialogTitle className='uppercase'>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>{steps[currentStep].description}</DialogDescription>
        </DialogHeader>

        {/* Body Content */}
        <div>{steps[currentStep].content}</div>

        {/* Footer Buttons */}
        <DialogFooter>
          {currentStep > 0 && (
            <Button variant='outline' onClick={prevStep} disabled={currentStep === 0}>
              Quay lại
            </Button>
          )}
          <Button onClick={isLastStep ? onClose : nextStep}>{isLastStep ? 'Tìm kiếm ngay' : 'Tiếp theo'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SearchDialog
