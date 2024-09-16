import UserFooter from '@/components/layout/user/UserFooter'
import UserHeader from '@/components/layout/user/UserHeader'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeader />
      <main>{children}</main>
      <UserFooter />
    </>
  )
}
