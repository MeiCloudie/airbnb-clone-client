import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import SignInForm from '@/components/form/sign-in-form'

export default function SignIn() {
  return (
    <div className='max-w-md mx-auto'>
      <div className='flex flex-col space-y-2 mb-5 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Chào mừng quay lại với Airbnb</h1>
        <p className='text-sm text-muted-foreground'>Hãy đăng nhập để trải nghiệm dịch vụ của chúng tôi</p>
      </div>

      {/* Form */}
      <SignInForm />

      {/* Chuyển hướng đăng ký */}
      <p className='text-center text-sm text-muted-foreground mt-2'>
        Bạn chưa có tài khoản?{' '}
        <Button asChild variant='link' className='text-primary px-0'>
          <Link href={ROUTES.AUTH.SIGNUP}>Đăng Ký</Link>
        </Button>
      </p>
    </div>
  )
}
