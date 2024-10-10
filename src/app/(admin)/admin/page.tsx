import PageContainer from '@/components/layout/page-container'
import Image from 'next/image'

export default function AdminHome() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex justify-center items-center h-[80vh]'>
        <div className='w-96 h-auto text-center'>
          <Image src={'/logo/airbnb-logo-fullname.png'} alt='airbnb-logo-fullname' priority width={500} height={500} />
          <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chào mừng Admin quay trở lại 👋</h3>
          <p className='mt-2 text-gray-600'>Hiện tại chưa cập nhật Biểu Đồ</p>
        </div>
      </div>
    </PageContainer>
  )
}
