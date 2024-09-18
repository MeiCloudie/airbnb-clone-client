import AirbnbLogo from '@/components/icon/airbnb-logo'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r'>
          {/* Background image */}
          <div className='absolute inset-0 bg-airbnb' />

          {/* Overlay */}
          <div className='absolute inset-0 bg-black/75' />

          {/* Logo */}
          <div className='relative z-20 flex items-center text-lg font-medium'>
            <Link href={ROUTES.USER.HOME}>
              <AirbnbLogo />
            </Link>
          </div>

          {/* Slogan */}
          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg'>
                &ldquo;Belong Anywhere - We believe in a world where people belong, anywhere.&rdquo;
              </p>
              <footer className='text-sm'>Airbnb Clone - MeiCloudie</footer>
            </blockquote>
          </div>
        </div>

        {/* Auth Form */}
        <div className='flex h-full items-center p-4 lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]'>
            {children}
            <p className='px-8 text-center text-sm text-muted-foreground'>
              Bằng cách nhấp vào tiếp tục, bạn đồng ý với <br />
              <Link href='#' className='underline underline-offset-4 hover:text-primary'>
                Điều khoản dịch vụ
              </Link>{' '}
              và{' '}
              <Link href='#' className='underline underline-offset-4 hover:text-primary'>
                Chính sách quyền riêng tư
              </Link>{' '}
              và của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
