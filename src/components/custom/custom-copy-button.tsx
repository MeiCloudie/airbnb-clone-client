'use client'

import { useState, useEffect } from 'react'
import { Button, ButtonProps } from '@/components/ui/button'
import { ClipboardIcon, CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { copyToClipboard } from '@/lib/copyToClipboardUtils'

interface CopyButtonProps extends ButtonProps {
  value: string
}

export function CopyButton({ value, className, variant = 'ghost', ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  // Reset the copied state after a delay
  useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  return (
    <Button
      size='icon'
      variant={variant}
      className={cn('relative z-10 h-6 w-6 text-foreground hover:bg-accent hover:text-accent-foreground', className)}
      onClick={() => {
        copyToClipboard(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className='sr-only'>Copy</span>
      {hasCopied ? <CheckIcon className='h-3 w-3' /> : <ClipboardIcon className='h-3 w-3' />}
    </Button>
  )
}
