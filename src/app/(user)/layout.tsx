import UserHeader from '@/components/layout/UserHeader'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserHeader />
      <main>{children}</main>
      <footer>User Footer</footer>
    </>
  )
}
