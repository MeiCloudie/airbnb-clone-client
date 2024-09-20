import CategoryHeader from '@/components/layout/user/category-header'
import UserFooter from '@/components/layout/user/user-footer'
import UserHeader from '@/components/layout/user/user-header'

export default function Home() {
  return (
    <>
      <UserHeader CategoryHeader={CategoryHeader} />

      <main className='container'>
        {/* Rooms List - Card */}

        {/* Recommend Locations */}
      </main>

      <UserFooter />
    </>
  )
}
