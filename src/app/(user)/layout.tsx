import UserFooter from '@/components/layout/user/user-footer'
import UserHeader from '@/components/layout/user/user-header'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeader />
      <main className='container py-7'>{children}</main>
      <UserFooter />
    </>
  )
}
