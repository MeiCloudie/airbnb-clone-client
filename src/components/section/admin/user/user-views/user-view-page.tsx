'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import UserTable from '@/components/section/admin/user/user-tables/user-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useUser } from '@/hooks/useUser'
import { Plus } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

const breadcrumbItems = [
  { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
  { title: 'Quản lý người dùng', link: ROUTES.ADMIN.USERS }
]

type UserViewPageProps = {
  page: number
  search: string | null
  gender: string | null
  role: string | null
  limit: number
}

export default function UserViewPage({ page, search, gender, role, limit }: UserViewPageProps) {
  const { getAllUsers, allUsers, isLoading } = useUser()

  // Gọi API để lấy danh sách người dùng
  useEffect(() => {
    getAllUsers() // Gọi hàm lấy dữ liệu
  }, [getAllUsers])

  // Lọc dữ liệu theo gender, role và search
  const filteredUsers = useMemo(() => {
    if (!allUsers || !allUsers.content) return []

    const genderAsBoolean = gender === 'male' ? true : gender === 'female' ? false : null
    const rolesArray = role ? role.split('.') : []

    return allUsers.content.filter((user) => {
      const matchesGender = genderAsBoolean === null || user.gender === genderAsBoolean
      const matchesRole = rolesArray.length ? rolesArray.includes(user.role) : true
      const matchesSearch = search
        ? user.name?.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
        : true
      return matchesGender && matchesRole && matchesSearch
    })
  }, [allUsers, gender, role, search])

  const totalUsers = filteredUsers.length
  const offset = (page - 1) * (limit || 10)
  const paginatedUsers = filteredUsers.slice(offset, offset + limit)

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Người dùng (${totalUsers})`} description='Danh sách NGƯỜI DÙNG trong hệ thống' />

          <Button variant={'default'}>
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Button>
        </div>

        <Separator />

        {isLoading ? <p>Loading...</p> : <UserTable data={paginatedUsers} totalData={totalUsers} />}
      </div>
    </PageContainer>
  )
}
