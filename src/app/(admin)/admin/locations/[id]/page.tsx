'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import UpdateLocationDialog from '@/components/section/admin/location/location-actions/update-location-dialog'
import DeleteLocationDialog from '@/components/section/admin/location/location-actions/delete-location-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { useLocation } from '@/hooks/useLocation'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface LocationDetailProps {
  params: {
    id: string
  }
}

export default function LocationDetail({ params }: LocationDetailProps) {
  const locationId = params.id
  const breadcrumbItems = [
    { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
    { title: 'Quản lý thông tin vị trí', link: ROUTES.ADMIN.LOCATIONS },
    { title: 'Chi tiết thông tin Vị Trí', link: ROUTES.ADMIN.LOCATION_DETAIL(locationId) }
  ]

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, error, locationById, getLocationById } = useLocation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Gọi API room id khi component mount
    if (params?.id) {
      getLocationById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }
  }, [params?.id, getLocationById])

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
        <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chi tiết Vị Trí</h3>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return null
  }

  if (!locationById || !locationById.content) {
    notFound()
  }

  const location = locationById.content

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Vị trí (ID: ${locationId})`} description='Thông tin chi tiết của Vị Trí trong hệ thống' />

          <div className='space-x-2'>
            <Button variant={'warning'} onClick={() => setIsUpdateDialogOpen(true)}>
              <Edit className='mr-2 h-4 w-4' /> Chỉnh sửa
            </Button>
            <Button variant={'error'} onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash className='mr-2 h-4 w-4' /> Xoá
            </Button>
          </div>
        </div>

        <UpdateLocationDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          locationData={location}
        />
        <DeleteLocationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          locationId={Number(location.id)}
          redirectToList
        />

        <Separator />

        {/* Thông tin chi tiết */}
        <div className='grid grid-cols-3 gap-10'>
          <div className='col-span-1 flex flex-col items-center sm:items-start'>
            <Image
              loader={({ src }) => src}
              src={location.hinhAnh || '/images/airbnb-background.jpg'}
              alt='Location Image'
              width={500}
              height={500}
              unoptimized
              onError={(e) => {
                e.currentTarget.src = '/images/airbnb-background.jpg'
              }}
              className='object-cover object-center rounded-sm w-full'
            />
          </div>

          <div className='col-span-2 divide-y'>
            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Tên Vị Trí</h2>
              <p>{location.tenViTri || 'Chưa cung cấp'}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Tỉnh Thành</h2>
              <p>{location.tinhThanh || 'Chưa cung cấp'}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Quốc Gia</h2>
              <p>{location.quocGia || 'Chưa cung cấp'}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
