'use client'

import SignUpForm from '@/components/form/sign-up-form'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className='max-w-md mx-auto'>
      <div className='flex flex-col space-y-2 mb-5 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Chào mừng bạn đến với Airbnb</h1>
        <p className='text-sm text-muted-foreground'>Hãy tạo tài khoản để trải nghiệm dịch vụ của chúng tôi</p>
      </div>

      {/* Form */}
      <SignUpForm />

      {/* Chuyển hướng đăng nhập */}
      <p className='text-center text-sm text-muted-foreground mt-2'>
        Bạn đã có tài khoản?{' '}
        <Button asChild variant='link' className='text-primary px-0'>
          <Link href={ROUTES.AUTH.SIGNIN}>Đăng Nhập</Link>
        </Button>
      </p>
    </div>
  )
}
