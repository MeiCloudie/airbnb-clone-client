'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import DeleteUserDialog from '@/components/section/admin/user/user-actions/delete-user-dialog'
import UpdateUserDialog from '@/components/section/admin/user/user-actions/update-user-dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useSwalAlert } from '@/hooks/useSwalAlert'
import { useUser } from '@/hooks/useUser'
import { format } from 'date-fns'
import { Edit, Trash } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserDetailProps {
  params: {
    id: string
  }
}

export default function UserDetail({ params }: UserDetailProps) {
  const userId = params.id
  const breadcrumbItems = [
    { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
    { title: 'Quản lý người dùng', link: ROUTES.ADMIN.USERS },
    { title: 'Chi tiết thông tin Người Dùng', link: ROUTES.ADMIN.USER_DETAIL(userId) }
  ]

  const [isFirstLoading, setIsFirstLoading] = useState(true) // Kiểm soát UI khi lần đầu load trang
  const { isLoading, error, userById, getUserById } = useUser()

  const { showAlert } = useSwalAlert()
  const [hasShownError, setHasShownError] = useState(false) // Flag để theo dõi nếu lỗi đã được hiển thị

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    // Gọi API room id khi component mount
    if (params?.id) {
      getUserById({ id: parseInt(params.id, 10) })
        .finally(() => setIsFirstLoading(false))
        .catch(() => notFound())
    }
  }, [params?.id, getUserById])

  useEffect(() => {
    if (error && error.statusCode === 400) {
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
        <h3 className='mt-4 text-lg md:text-xl font-semibold'>Chi tiết Người Dùng</h3>
        <p className='mt-2 text-gray-600'>Đang tải dữ liệu...</p>
      </div>
    )
  }

  if (error) {
    return null
  }

  if (!userById || !userById.content) {
    notFound()
  }

  const user = userById.content

  const formatBirthday = (birthday: string | null | undefined) => {
    if (birthday && !isNaN(Date.parse(birthday))) {
      const date = new Date(birthday)
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
            title={`Người dùng (ID: ${userId})`}
            description='Thông tin chi tiết của Người Dùng trong hệ thống'
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

        <UpdateUserDialog isOpen={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)} userData={user} />
        <DeleteUserDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          userId={Number(user.id)}
          redirectToList
        />

        <Separator />

        {/* Thông tin chi tiết */}
        <div className='grid grid-cols-3 gap-10'>
          <div className='col-span-1 flex flex-col items-center sm:items-start'>
            <Image
              loader={({ src }) => src}
              src={user.avatar || '/avatars/avatar-blank.jpg'}
              alt='User Avatar'
              width={500}
              height={500}
              unoptimized
              onError={(e) => {
                e.currentTarget.src = '/avatars/avatar-blank.jpg'
              }}
              className='aspect-square object-cover object-center rounded-sm w-full'
            />
          </div>

          <div className='col-span-2 divide-y'>
            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Tên</h2>
              <p>{user.name}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Email</h2>
              <p>{user.email}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Số điện thoại</h2>
              <p>{user.phone || 'Chưa cung cấp'}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Ngày sinh</h2>
              <p>{formatBirthday(user.birthday)}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Giới tính</h2>
              <p>{user.gender ? 'Nam' : 'Nữ'}</p>
            </div>

            <div className='space-y-1 py-4'>
              <h2 className='text-lg font-semibold'>Vai trò</h2>
              <p>{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
