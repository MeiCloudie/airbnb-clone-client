import UserHeader from '@/components/layout/UserHeader'
import { ModeToggle } from '@/components/theme/mode-toggle'

export default function Home() {
  return (
    <>
      <UserHeader />
      <h1>Home Page</h1>
      <ModeToggle />
    </>
  )
}
