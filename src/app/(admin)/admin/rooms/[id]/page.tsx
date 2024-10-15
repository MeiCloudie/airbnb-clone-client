'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import UpdateRoomDialog from '@/components/section/admin/room/room-actions/update-room-dialog'
import DeleteRoomDialog from '@/components/section/admin/room/room-actions/delete-room-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { useRoom } from '@/hooks/useRoom'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface RoomDetailProps {
  params: {
    id: string
  }
}

export default function RoomDetail({ params }: RoomDetailProps) {
  const roomId = params.id
  const breadcrumbItems = [
    { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
    { title: 'Quản lý thông tin phòng', link: ROUTES.ADMIN.ROOMS },
    { title: 'Chi tiết thông tin Phòng Thuê', link: ROUTES.ADMIN.ROOM_DETAIL(roomId) }
  ]

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, error, roomsById, getRoomById } = useRoom()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Gọi API room id khi component mount
    if (params?.id) {
      getRoomById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }
  }, [params?.id, getRoomById])

  useEffect(() => {
    if (error && error.statusCode === 404) {
      notFound() // Nếu lỗi là 404 thì chuyển đến trang không tìm thấy
    } else if (error && !hasShownError) {
      // Nếu là lỗi khác, hiển thị thông báo lỗi
      showAlert({
        title: 'Phát hiện lỗi',
        text: 'Đã có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau',
        icon: 'question',
        confirmButtonText: 'Đã hiểu'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
      setHasShownError(true) // Đánh dấu đã hiển thị lỗi
    }
  }, [error, hasShownError, showAlert])

  if (isLoading || isFirstLoading) {
    return (
      <div className='flex flex-col items-center justify-center text-center min-h-screen'>
        <div className='w-96 h-auto'>
          <Image src={'/logo/airbnb-logo-fullname.png'} alt='airbnb-logo-fullname' priority width={500} height={500} />
        </div>
        <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chi tiết Phòng Thuê</h3>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return null
  }

  if (!roomsById || !roomsById.content) {
    notFound()
  }

  const room = roomsById.content

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading
            title={`Phòng Thuê (ID: ${roomId})`}
            description='Thông tin chi tiết của Phòng Thuê trong hệ thống'
          />

          <div className='space-x-2'>
            <Button variant={'warning'} onClick={() => setIsUpdateDialogOpen(true)}>
              <Edit className='mr-2 h-4 w-4' /> Chỉnh sửa
            </Button>
            <Button variant={'error'} onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className='mr-2 h-4 w-4' /> Xoá
            </Button>
          </div>
        </div>

        <UpdateRoomDialog isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} roomData={room} />
        <DeleteRoomDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          roomId={Number(room.id)}
          redirectToList
        />

        <Separator />

        {/* Thông tin chi tiết */}
        <div className='grid grid-cols-2 gap-10'>
          <div className='col-span-1 flex flex-col items-center sm:items-start'>
            <Image
              loader={({ src }) => src}
              src={room.hinhAnh || '/images/image-alternative.jpg'}
              alt='Room Image'
              width={500}
              height={500}
              unoptimized
              onError={(e) => {
                e.currentTarget.src = '/images/image-alternative.jpg'
              }}
              className='object-cover object-center rounded-sm w-full'
            />
          </div>

          <div className='col-span-1 divide-y'>
            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Tên Phòng</h2>
              <p>{room.tenPhong || 'Chưa cung cấp'}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số Lượng Khách</h2>
              <p>{room.khach}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số Lượng Phòng Ngủ</h2>
              <p>{room.phongNgu}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số Lượng Giường</h2>
              <p>{room.giuong}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số Lượng Phòng Tắm</h2>
              <p>{room.phongTam}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Mô Tả Phòng</h2>
              <p>{room.moTa}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Giá Tiền ($/đêm)</h2>
              <p>{room.giaTien}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Các tiện ích</h2>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Máy giặt:</h3>
                <p>{room.mayGiat ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Bàn là:</h3>
                <p>{room.banLa ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Tivi:</h3>
                <p>{room.tivi ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Điều hoà:</h3>
                <p>{room.dieuHoa ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Wifi:</h3>
                <p>{room.wifi ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Bếp:</h3>
                <p>{room.bep ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Chỗ đỗ xe:</h3>
                <p>{room.doXe ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Hồ bơi:</h3>
                <p>{room.hoBoi ? 'Có' : 'Không'}</p>
              </div>
              <div className='flex gap-2 justify-between w-1/3'>
                <h3 className='text-base font-semibold'>Bàn ủi:</h3>
                <p>{room.banUi ? 'Có' : 'Không'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
