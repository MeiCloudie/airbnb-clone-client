import CategoryHeader from '@/components/layout/user/category-header'
import UserFooter from '@/components/layout/user/user-footer'
import UserHeader from '@/components/layout/user/user-header'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <>
      <UserHeader CategoryHeader={CategoryHeader} />

      <main className='container py-7'>
        {/* Rooms List - Card */}
        <div className='grid grid-cols-5 gap-4'>
          {Array.from({ length: 7 }).map((_, index) => (
            <Card key={index} className='group border-none shadow-none cursor-pointer hover:overflow-hidden'>
              <div className='overflow-hidden rounded-xl'>
                <CardImage
                  src='/images/airbnb-background.jpg'
                  alt='Image description'
                  className='aspect-square object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105'
                />
              </div>
              <CardHeader className='px-0 pt-4 pb-1 space-y-1'>
                <CardTitle className='truncate'>NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!</CardTitle>
                <CardDescription className='truncate'>
                  Cái Răng | Cần Thơ <br />
                  Việt Nam
                </CardDescription>
              </CardHeader>
              <CardContent className='text-sm px-0 pb-3 text-muted-foreground'>
                <p className='truncate'>1 phòng ngủ • 1 giường • 1 phòng tắm</p>
                <p className='truncate'>Wifi • Bếp </p>
              </CardContent>
              <CardFooter className='px-0'>
                <p>
                  <span className='font-semibold'>₫ 1.666.999</span> / đêm
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Recommend Locations */}
      </main>

      <UserFooter />
    </>
  )
}
