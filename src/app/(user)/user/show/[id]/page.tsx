'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import VerifiedIcon from '@/components/icon/verified-icon'
import { notFound } from 'next/navigation'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { Separator } from '@/components/ui/separator'
import { Cake, Check, Flag, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GenderMaleIcon from '@/components/icon/gender-male-icon'
import GenderFemaleIcon from '@/components/icon/gender-female-icon'
import { useReservation } from '@/hooks/useReservation'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useToastifyNotification } from '@/hooks/useToastifyNotification'

interface UserPublicProfileProps {
  params: {
    id: string
  }
}

export default function UserPublicProfile({ params }: UserPublicProfileProps) {
  const { isLoading: userLoading, error: userError, userById, getUserById } = useUser()
  const {
    isLoading: reservationLoading,
    error: reservationError,
    reservationByUserId,
    getReservationByUserId
  } = useReservation()

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị
  const { showAlert } = useSwalAlert()
  const { showNotification } = useToastifyNotification()

  useEffect(() => {
    // Gọi API user id khi component mount
    if (params?.id) {
      getUserById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }
  }, [params?.id, getUserById])

  useEffect(() => {
    // Gọi API reservation by user id khi user đã được load
    if (params?.id) {
      getReservationByUserId({ userId: params.id })
    }
  }, [params?.id, getReservationByUserId])

  useEffect(() => {
    if (userError && userError.statusCode === 400) {
      notFound() // Nếu lỗi là 400 thì chuyển đến trang không tìm thấy
    } else if (userError && !hasShownError) {
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
  }, [userError, hasShownError, showAlert])

  if (userLoading || isFirstLoading) {
    return (
      <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-y-10 lg:gap-x-14 2xl:gap-x-24'>
        <div className='col-span-1 w-full'>
          <Card className='shadow-xl rounded-3xl w-full'>
            <CardContent className='flex px-0 py-7 justify-between items-center'>
              <div className='col-span-1 flex flex-col items-center justify-center w-2/3'>
                <Skeleton className='w-28 h-28 rounded-full' />
                <div className='text-center mt-2'>
                  <Skeleton className='w-32 h-6 mt-2' />
                  <Skeleton className='w-24 h-4 mt-1' />
                </div>
              </div>

              <div className='col-span-1 lg:col-span-2 w-1/3 font-semibold'>
                <Skeleton className='w-16 h-6 mb-2' />
                <Skeleton className='w-10 h-4 mb-4' />
                <Skeleton className='w-16 h-6 mb-2' />
                <Skeleton className='w-10 h-4 mb-4' />
                <Skeleton className='w-16 h-6 mb-2' />
                <Skeleton className='w-10 h-4 mb-4' />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='col-span-1 xl:col-span-2'>
          <Skeleton className='w-64 h-10 mb-10' />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 text-base'>
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className='w-full h-8' />
            ))}
          </div>

          <Separator className='my-10' />

          {/* Skeleton Loading for Reservations */}
          <Skeleton className='w-64 h-10 mb-10' />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} className='w-full h-32' />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (userError) {
    return null
  }

  if (!userById || !userById.content) {
    return notFound()
  }

  const userInfo = userById.content

  return (
    <div className='w-full grid grid-cols-1 xl:grid-cols-3 gap-y-10 lg:gap-x-14 2xl:gap-x-24'>
      <div className='col-span-1 w-full'>
        <Card className='shadow-xl rounded-3xl w-full'>
          <CardContent className='flex px-0 py-7 justify-between items-center'>
            <div className='col-span-1 flex flex-col items-center justify-center w-2/3'>
              <div className='relative p-1'>
                <Avatar className='w-28 h-28'>
                  <AvatarImage
                    src={userInfo.avatar ?? undefined}
                    alt={userInfo.name ?? undefined}
                    className='object-cover object-top'
                  />
                  <AvatarFallback className='bg-foreground text-background font-bold text-4xl'>
                    {userInfo.name?.charAt(0) ?? ''}
                  </AvatarFallback>
                </Avatar>
                {/* Icon Chủ nhà/Người tổ chức đã được xác minh */}
                <div className='absolute bottom-1 right-0'>
                  <div className='bg-primary p-2 aspect-square rounded-full'>
                    <VerifiedIcon />
                  </div>
                </div>
              </div>

              <div className='text-center mt-2'>
                <h1 className='text-base xl:text-lg 2xl:text-xl font-bold'>{userInfo.name}</h1>
                <p className='text-sm font-semibold'>Chủ nhà/Người tổ chức</p>
              </div>
            </div>

            <div className='col-span-1 lg:col-span-2 w-1/3 font-semibold'>
              <h5 className='font-bold text-xl'>326</h5>
              <p className='text-xs'>Đánh giá</p>
              <Separator className='my-4' />
              <h5 className='font-bold text-xl'>4.96</h5>
              <p className='text-xs'>Xếp hạng</p>
              <Separator className='my-4' />
              <h5 className='font-bold text-xl'>12</h5>
              <p className='text-xs'>Tháng kinh nghiệm đón tiếp khách</p>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-3xl w-full mt-10'>
          <CardContent className='p-10'>
            <h3 className='text-lg font-semibold mb-4'>Thông tin đã được xác nhận của {userInfo.name}</h3>
            <div className='space-y-3'>
              <p className='flex gap-2 text-base'>
                <span>
                  <Check />
                </span>
                <span>Danh tính</span>
              </p>
              <p className='flex items-center gap-2 text-base'>
                <span>
                  <Check />
                </span>
                <span>Địa chỉ email</span>
              </p>
              <p className='flex items-center gap-2 text-base'>
                <span>
                  <Check />
                </span>
                <span>Số điện thoại</span>
              </p>
            </div>
            <Button variant={'link'} className='p-0 m-0 mt-4 text-foreground underline hover:text-primary'>
              Tìm hiểu về quy trình xác minh danh tính
            </Button>
          </CardContent>
        </Card>

        <div className='mt-5 flex justify-center items-center gap-2'>
          <div>
            <Flag className='w-4 h-4 fill-foreground' />
          </div>
          <div>
            <Button variant={'link'} className='p-0 m-0 text-foreground underline hover:text-primary'>
              Báo cáo hồ sơ này
            </Button>
          </div>
        </div>
      </div>

      <div className='col-span-1 xl:col-span-2'>
        <h1 className='font-bold text-4xl mb-10'>Thông tin về {userInfo.name}</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 text-base'>
          <div className='flex items-center space-x-3'>
            <Mail className='w-6 h-6' />
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
          </div>

          {userInfo.phone && (
            <div className='flex items-center space-x-3'>
              <Phone className='w-6 h-6' />
              <p>
                <strong>Phone:</strong> {userInfo.phone}
              </p>
            </div>
          )}

          {userInfo.birthday && (
            <div className='flex items-center space-x-3'>
              <Cake className='w-6 h-6' />
              <p>
                <strong>Birthday:</strong> {userInfo.birthday}
              </p>
            </div>
          )}

          <div className='flex items-center space-x-3'>
            {userInfo.gender ? (
              <>
                <GenderMaleIcon />
                <p>
                  <strong>Gender:</strong> Male
                </p>
              </>
            ) : (
              <>
                <GenderFemaleIcon />
                <p>
                  <strong>Gender:</strong> Female
                </p>
              </>
            )}
          </div>
        </div>

        <Separator className='my-10' />

        {/* Phòng đã thuê */}
        <div>
          <h1 className='font-bold text-2xl mb-8'>Phòng đã thuê</h1>

          {/* Danh sách phòng đã thuê */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {reservationLoading ? (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {[...Array(2)].map((_, index) => (
                  <Skeleton key={index} className='w-full h-32' />
                ))}
              </div>
            ) : reservationError ? (
              <>{showNotification('Đã có lỗi xảy ra khi tải phòng đã thuê', 'error')}</>
            ) : reservationByUserId && reservationByUserId.content.length > 0 ? (
              reservationByUserId.content.map((reservation) => (
                <Card key={reservation.id} className='rounded-lg p-5 shadow-md'>
                  <h2 className='font-bold text-lg flex items-center'>Mã phòng: {reservation.maPhong}</h2>
                  <p>Ngày đến: {new Date(reservation.ngayDen).toLocaleDateString()}</p>
                  <p>Ngày đi: {new Date(reservation.ngayDi).toLocaleDateString()}</p>
                  <p>Số lượng khách: {reservation.soLuongKhach}</p>

                  <Link href={ROUTES.USER.ROOMS.ROOM_DETAIL(reservation.maPhong.toString())}>
                    <Button variant='link' className='p-0 text-base' size={'lg'}>
                      Xem chi tiết phòng
                    </Button>
                  </Link>
                </Card>
              ))
            ) : (
              <p>Không có phòng đã thuê nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
