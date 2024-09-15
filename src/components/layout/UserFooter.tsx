import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const UserFooter = () => {
  return (
    <footer className='pt-10 pb-5 border-t bg-background'>
      <div className='container text-xs md:text-sm'>
        <div className='grid grid-cols-1 space-y-6 lg:space-y-0 space lg:grid-cols-3'>
          {/* TODO: Cập nhật href link sau */}
          <div className='border-b pb-6 lg:border-none lg:pb-0'>
            <h4 className='font-semibold mb-3'>Hỗ trợ</h4>
            <ul className='space-y-3'>
              <li className='hover:underline'>
                <Link href={'/'}>Trung tâm trợ giúp</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Yêu cầu trợ giúp về vấn đề an toàn</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>AirCover</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Chống phân biệt đối xử</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Hỗ trợ người khuyết tật</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Các tùy chọn hủy</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Báo cáo lo ngại của khu dân cư</Link>
              </li>
            </ul>
          </div>

          <div className='border-b pb-6 lg:border-none lg:pb-0'>
            <h4 className='font-semibold mb-3'>Đón tiếp khách</h4>
            <ul className='space-y-3'>
              <li className='hover:underline'>
                <Link href={'/'}>Cho thuê nhà trên Airbnb</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>AirCover cho Chủ nhà</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Tài nguyên về đón tiếp khách</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Diễn đàn cộng đồng</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Đón tiếp khách có trách nhiệm</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Tham gia khóa học miễn phí về công việc Đón tiếp khách</Link>
              </li>
            </ul>
          </div>

          <div className=''>
            <h4 className='font-semibold mb-3'>Airbnb</h4>
            <ul className='space-y-3'>
              <li className='hover:underline'>
                <Link href={'/'}>Trang tin tức</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Tính năng mới</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Cơ hội nghề nghiệp</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Nhà đầu tư</Link>
              </li>
              <li className='hover:underline'>
                <Link href={'/'}>Chỗ ở khẩn cấp Airbnb.org</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className='mt-10 mb-5' />

        <div className='font-semibold flex flex-col justify-center text-center lg:flex-row lg:justify-between items-center'>
          <div className='flex flex-col lg:flex-row gap-2'>
            <div>
              <p>© 2024 Airbnb, Inc.</p>
            </div>
            <div className='flex gap-2'>
              <p>•</p>
              <Link href={'/'} className='hover:underline'>
                Quyền riêng tư
              </Link>
              <p>•</p>
              <Link href={'/'} className='hover:underline'>
                Điều khoản
              </Link>
              <p>•</p>
              <Link href={'/'} className='hover:underline'>
                Sơ đồ trang web
              </Link>
            </div>
          </div>

          <div className='flex gap-2 mt-4 lg:mt-0'>
            <Button variant={'ghost'} className='hover:bg-transparent hover:underline'>
              <FontAwesomeIcon icon={faGlobe} className='w-4 h-auto me-2' /> Tiếng Việt (VN)
            </Button>

            <Button variant={'ghost'} className='hover:bg-transparent'>
              ₫ <span className='hover:underline ms-2'>VND</span>
            </Button>

            <div className='flex gap-1'>
              <Button variant={'ghost'} size={'icon'} className='hover:text-primary'>
                <FontAwesomeIcon icon={faFacebookF} className='w-2.5 h-auto' />
              </Button>
              <Button variant={'ghost'} size={'icon'} className='hover:text-primary'>
                <FontAwesomeIcon icon={faTwitter} className='w-4 h-auto' />
              </Button>
              <Button variant={'ghost'} size={'icon'} className='hover:text-primary'>
                <FontAwesomeIcon icon={faInstagram} className='w-4 h-auto' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
