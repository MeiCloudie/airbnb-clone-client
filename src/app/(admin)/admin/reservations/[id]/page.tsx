'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import UpdateReservationDialog from '@/components/section/admin/reservation/reservation-actions/update-reservation-dialog'
import DeleteReservationDialog from '@/components/section/admin/reservation/reservation-actions/delete-reservation-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { useReservation } from '@/hooks/useReservation'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'

interface ReservationDetailProps {
  params: {
    id: string
  }
}

export default function ReservationDetail({ params }: ReservationDetailProps) {
  const reservationId = params.id
  const breadcrumbItems = [
    { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
    { title: 'Quản lý đặt phòng', link: ROUTES.ADMIN.RESERVATIONS },
    { title: 'Chi tiết thông tin Đặt Phòng', link: ROUTES.ADMIN.RESERVATION_DETAIL(reservationId) }
  ]

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, error, reservationById, getReservationById } = useReservation()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Gọi API room id khi component mount
    if (params?.id) {
      getReservationById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }
  }, [params?.id, getReservationById])

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
        <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chi tiết Đặt Phòng</h3>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return null
  }

  if (!reservationById || !reservationById.content) {
    notFound()
  }

  const reservation = reservationById.content

  const formatDate = (reservationDate: string | null | undefined) => {
    if (reservationDate && !isNaN(Date.parse(reservationDate))) {
      const date = new Date(reservationDate)
      return format(date, 'dd/MM/yyyy')
    } else {
      return 'N/A - Chưa đúng định dạng'
    }
  }

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading
            title={`Đặt Phòng (ID: ${reservationId})`}
            description='Thông tin chi tiết của Đặt Phòng trong hệ thống'
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

        <UpdateReservationDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          reservationData={reservation}
        />
        <DeleteReservationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          reservationId={Number(reservation.id)}
          redirectToList
        />

        <Separator />

        {/* Thông tin chi tiết */}
        <div className='grid grid-cols-1 gap-10'>
          <div className='col-span-1 divide-y'>
            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Mã Phòng</h2>
              <p>{reservation.maPhong || 'Chưa cung cấp'}</p>
              <Link href={ROUTES.ADMIN.ROOM_DETAIL(String(reservation.maPhong))}>
                <Button variant={'link'} className='p-0'>
                  Xem Phòng
                </Button>
              </Link>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Ngày Đến</h2>
              <p>{formatDate(reservation.ngayDen)}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Ngày Đi</h2>
              <p>{formatDate(reservation.ngayDi)}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số Lượng Khách</h2>
              <p>{reservation.soLuongKhach}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Mã Người Dùng</h2>
              <p>{reservation.maNguoiDung}</p>
              <Link href={ROUTES.ADMIN.USER_DETAIL(String(reservation.maNguoiDung))}>
                <Button variant={'link'} className='p-0'>
                  Xem Người Dùng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
