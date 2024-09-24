import React, { useState } from 'react'
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

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose: () => void
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 2 ? prevStep + 1 : prevStep))
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep))
  }

  const steps = [
    {
      id: 1,
      name: 'Địa điểm',
      title: 'Địa điểm bất kỳ',
      description: 'Chọn địa điểm bạn muốn tìm kiếm',
      content: <div>Step 1: Nội dung tìm kiếm địa điểm</div>
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
