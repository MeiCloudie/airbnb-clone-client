import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import UserTable from '@/components/section/admin/user/user-tables/user-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { searchParamsCache } from '@/lib/searchparams'
import { User } from '@/types/auth.type'
import { Plus } from 'lucide-react'
import React from 'react'

const breadcrumbItems = [
  { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
  { title: 'Quản lý người dùng', link: ROUTES.ADMIN.USERS }
]

type TUserListingPage = Record<string, never>

export default async function UserViewPage({}: TUserListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page')
  const search = searchParamsCache.get('q')
  const gender = searchParamsCache.get('gender')
  const role = searchParamsCache.get('role')
  const pageLimit = searchParamsCache.get('limit')

  // Dummy data for users
  const dummyUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '123-456-7890',
      birthday: '1990-01-01',
      avatar: null,
      gender: true,
      role: 'admin'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password123',
      phone: '098-765-4321',
      birthday: '1992-02-02',
      avatar: null,
      gender: false,
      role: 'user'
    },
    // Add more dummy users as needed
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password123',
      phone: '111-222-3333',
      birthday: '1993-03-03',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '4',
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      password: 'password123',
      phone: '444-555-6666',
      birthday: '1994-04-04',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '5',
      name: 'Charlie Davis',
      email: 'charlie.davis@example.com',
      password: 'password123',
      phone: '777-888-9999',
      birthday: '1995-05-05',
      avatar: null,
      gender: true,
      role: 'admin'
    },
    {
      id: '6',
      name: 'Diana Evans',
      email: 'diana.evans@example.com',
      password: 'password123',
      phone: '000-111-2222',
      birthday: '1996-06-06',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '7',
      name: 'Ethan Foster',
      email: 'ethan.foster@example.com',
      password: 'password123',
      phone: '333-444-5555',
      birthday: '1997-07-07',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '8',
      name: 'Fiona Green',
      email: 'fiona.green@example.com',
      password: 'password123',
      phone: '666-777-8888',
      birthday: '1998-08-08',
      avatar: null,
      gender: false,
      role: 'admin'
    },
    {
      id: '9',
      name: 'George Harris',
      email: 'george.harris@example.com',
      password: 'password123',
      phone: '999-000-1111',
      birthday: '1999-09-09',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '10',
      name: 'Hannah White',
      email: 'hannah.white@example.com',
      password: 'password123',
      phone: '222-333-4444',
      birthday: '2000-10-10',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '11',
      name: 'Ian King',
      email: 'ian.king@example.com',
      password: 'password123',
      phone: '555-666-7777',
      birthday: '2001-11-11',
      avatar: null,
      gender: true,
      role: 'admin'
    },
    {
      id: '12',
      name: 'Julia Lee',
      email: 'julia.lee@example.com',
      password: 'password123',
      phone: '888-999-0000',
      birthday: '2002-12-12',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '13',
      name: 'Kevin Martin',
      email: 'kevin.martin@example.com',
      password: 'password123',
      phone: '111-222-3333',
      birthday: '2003-01-13',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '14',
      name: 'Laura Scott',
      email: 'laura.scott@example.com',
      password: 'password123',
      phone: '444-555-6666',
      birthday: '2004-02-14',
      avatar: null,
      gender: false,
      role: 'admin'
    },
    {
      id: '15',
      name: 'Michael Turner',
      email: 'michael.turner@example.com',
      password: 'password123',
      phone: '777-888-9999',
      birthday: '2005-03-15',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '16',
      name: 'Nina Walker',
      email: 'nina.walker@example.com',
      password: 'password123',
      phone: '000-111-2222',
      birthday: '2006-04-16',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '17',
      name: 'Oscar Young',
      email: 'oscar.young@example.com',
      password: 'password123',
      phone: '333-444-5555',
      birthday: '2007-05-17',
      avatar: null,
      gender: true,
      role: 'admin'
    },
    {
      id: '18',
      name: 'Paula Adams',
      email: 'paula.adams@example.com',
      password: 'password123',
      phone: '666-777-8888',
      birthday: '2008-06-18',
      avatar: null,
      gender: false,
      role: 'user'
    },
    {
      id: '19',
      name: 'Quincy Baker',
      email: 'quincy.baker@example.com',
      password: 'password123',
      phone: '999-000-1111',
      birthday: '2009-07-19',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '20',
      name: 'Rachel Carter',
      email: 'rachel.carter@example.com',
      password: 'password123',
      phone: '222-333-4444',
      birthday: '2010-08-20',
      avatar: null,
      gender: false,
      role: 'admin'
    },
    {
      id: '21',
      name: 'Sam Diaz',
      email: 'sam.diaz@example.com',
      password: 'password123',
      phone: '555-666-7777',
      birthday: '2011-09-21',
      avatar: null,
      gender: true,
      role: 'user'
    },
    {
      id: '22',
      name: 'Tina Edwards',
      email: 'tina.edwards@example.com',
      password: 'password123',
      phone: '888-999-0000',
      birthday: '2012-10-22',
      avatar: null,
      gender: false,
      role: 'user'
    }
  ]

  // Convert gender and role from strings
  const genderAsBoolean = gender === 'male' ? true : gender === 'female' ? false : null
  const rolesArray = role ? role.split('.') : []

  // Filter users based on gender, role, and search
  const filteredUsers = dummyUsers.filter((user) => {
    const matchesGender = genderAsBoolean === null || user.gender === genderAsBoolean
    const matchesRole = rolesArray.length ? rolesArray.includes(user.role) : true
    const matchesSearch = search
      ? user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      : true
    return matchesGender && matchesRole && matchesSearch
  })

  const totalUsers = filteredUsers.length
  const offset = (page ? page - 1 : 0) * (pageLimit ? pageLimit : 10)
  const paginatedUsers = filteredUsers.slice(offset, offset + (pageLimit ? pageLimit : 10))

  const users = paginatedUsers

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

        <UserTable data={users} totalData={totalUsers} />
      </div>
    </PageContainer>
  )
}
