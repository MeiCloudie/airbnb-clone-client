'use client'

import AirbnbLogo from '@/components/icon/airbnb-logo'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faGlobe, faBars } from '@fortawesome/free-solid-svg-icons'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { signOut, useSession } from 'next-auth/react'
import { User } from 'lucide-react'
import SearchDialog from '@/components/dialog/search-dialog'
import { SearchResults } from '@/types/search.type'
import localStorageService from '@/services/localStorage.service'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'

interface UserHeaderProps {
  CategoryHeader?: React.ComponentType
}

const UserHeader: React.FC<UserHeaderProps> = ({ CategoryHeader }) => {
  const { data: session } = useSession()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [initialStep, setInitialStep] = useState(0)

  // Hàm mở và đóng dialog tìm kiếm
  const openDialog = (step: number) => {
    setInitialStep(step) // Mở dialog với step ban đầu cụ thể
    setIsDialogOpen(true)
  }
  const closeDialog = () => setIsDialogOpen(false)

  // Lấy dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const savedResults = localStorageService.get<SearchResults, null>('searchResults', null)
    if (savedResults) {
      setSearchResults(savedResults)
    } else {
      setSearchResults(null) // Reset nếu không có dữ liệu
    }

    setIsLoading(false)
  }, [])

  // Hàm tính tổng số khách
  // Hàm tính tổng số khách và định dạng chuỗi kết quả
  const getTotalGuests = (guests: SearchResults['guests']) => {
    const totalGuests = guests.adults + guests.children
    const infantsText = guests.infants > 0 ? `, ${guests.infants} em bé` : ''
    const petsText = guests.pets > 0 ? `, ${guests.pets} thú cưng` : ''

    return `${totalGuests} khách${infantsText}${petsText}`
  }

  // Cập nhật lại searchResults khi tìm kiếm được submit
  const handleSearchSubmit = (results: SearchResults) => {
    setSearchResults(results)
  }

  return (
    <header className='sticky top-0 z-50'>
      <div className='border-b shadow-md pt-2 pb-5 bg-background'>
        <div className='container space-y-3 md:flex md:justify-between 2xl:grid 2xl:grid-cols-3'>
          {/* Logo */}
          <Link href={ROUTES.USER.HOME} className='content-center'>
            <AirbnbLogo />
          </Link>

          {/* Search */}
          <div className='content-center lg:w-3/5 xl:w-1/2 2xl:w-full'>
            <ToggleGroup type='multiple' size='lg' className='border rounded-full ps-1 py-1 shadow-sm hover:shadow-lg'>
              <ToggleGroupItem
                value='anywhere'
                onClick={() => openDialog(0)}
                className='hidden lg:flex font-bold hover:bg-transparent'
              >
                {isLoading ? (
                  <Skeleton className='w-full h-5' />
                ) : (
                  <p className='text-[13px] truncate w-28 flex'>
                    {searchResults?.location ? searchResults.location.label : 'Địa điểm bất kỳ'}
                  </p>
                )}
              </ToggleGroupItem>
              <span className='text-border hidden lg:flex'>|</span>
              <ToggleGroupItem
                value='anyweek'
                onClick={() => {
                  if (searchResults?.location) {
                    openDialog(1) // Mở dialog ở step 2 nếu đã có địa điểm
                  } else {
                    openDialog(0) // Nếu không có địa điểm thì quay lại step 1
                  }
                }}
                className='hidden lg:flex font-bold hover:bg-transparent'
              >
                {isLoading ? (
                  <Skeleton className='w-full h-5' />
                ) : (
                  <p>
                    {searchResults?.dateRange && searchResults.dateRange.from
                      ? `${format(new Date(searchResults.dateRange.from), 'dd/MM')}${
                          searchResults.dateRange.to
                            ? ` - ${format(new Date(searchResults.dateRange.to), 'dd/MM')}`
                            : ''
                        }`
                      : 'tuần bất kỳ'}
                  </p>
                )}
              </ToggleGroupItem>
              <span className='text-border hidden lg:flex'>|</span>
              <ToggleGroupItem
                value='anyguests'
                onClick={() => {
                  if (searchResults?.location && searchResults?.dateRange?.from && searchResults?.dateRange?.to) {
                    openDialog(2) // Mở dialog ở step 3 nếu có dữ liệu của step 1 và step 2
                  } else if (searchResults?.location) {
                    openDialog(1) // Nếu có địa điểm nhưng chưa chọn ngày thì quay lại step 2
                  } else {
                    openDialog(0) // Nếu không có dữ liệu step 1 thì quay lại step 1
                  }
                }}
                className='hidden lg:flex font-bold hover:bg-transparent'
              >
                {isLoading ? (
                  <Skeleton className='w-full h-5' />
                ) : (
                  <p className='truncate w-28'>
                    {searchResults?.guests ? getTotalGuests(searchResults.guests) : 'Thêm khách'}
                  </p>
                )}
              </ToggleGroupItem>

              <ToggleGroupItem
                value='all'
                onClick={() => openDialog(0)}
                className='flex lg:hidden hover:bg-transparent'
              >
                <p className='text-left'>
                  <span className='font-bold'>Bạn sẽ đi đâu</span>
                  <br />
                  <span className='text-xs opacity-75'>Địa điểm bất kỳ • tuần bất kỳ • Thêm khách</span>
                </p>
              </ToggleGroupItem>

              <ToggleGroupItem
                value='search'
                className='w-auto mx-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 hover:text-primary-foreground'
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 h-auto' />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Link & User Menu */}
          <div className='flex justify-end items-center'>
            {/* TODO: Chưa có đường dẫn này */}
            <Button asChild variant={'ghost'} className='hidden xl:block rounded-full font-bold'>
              <Link href='#'>Cho thuê chỗ ở qua Airbnb</Link>
            </Button>
            {/* TODO: Nút hiển thị chọn ngôn ngữ */}
            <Button variant={'ghost'} size={'icon'} className='rounded-full me-1'>
              <FontAwesomeIcon icon={faGlobe} className='w-4 h-auto' />
            </Button>

            {/* Theme */}
            <ModeToggle />

            {/* IMPORTANT: Cần xác định Menu khác nhau khi hoàn thành Auth Service */}
            {/* TODO: Các đường dẫn còn lại phát triển sau */}
            <Menubar className='rounded-full ms-3 py-6 hover:shadow-lg'>
              <MenubarMenu>
                <MenubarTrigger className='cursor-pointer space-x-2 rounded-full'>
                  <FontAwesomeIcon icon={faBars} className='w-4 h-auto' />
                  <Avatar className='w-9 h-9'>
                    <AvatarImage src={''} alt='avatar' />
                    <AvatarFallback className='bg-slate-800 text-white'>
                      {session?.user?.name && session.user.name !== '' ? (
                        session.user.name.charAt(0)
                      ) : session ? (
                        'N'
                      ) : (
                        <User />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                {session ? (
                  <MenubarContent className='rounded-xl py-3'>
                    {session.user.role === 'ADMIN' && (
                      <>
                        <Link href={ROUTES.ADMIN.HOME}>
                          <MenubarItem className='font-semibold'>Hệ thống quản trị</MenubarItem>
                        </Link>
                        <MenubarSeparator />
                      </>
                    )}
                    <MenubarItem className='font-semibold'>Tin Nhắn</MenubarItem>
                    <MenubarItem className='font-semibold'>Chuyến đi</MenubarItem>
                    <MenubarItem className='font-semibold'>Danh sách yêu thích</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Cho thuê chỗ ở qua Airbnb</MenubarItem>
                    <MenubarItem>Tổ chức trải nghiệm</MenubarItem>
                    <MenubarItem>Giới thiệu chủ nhà</MenubarItem>
                    <Link href={ROUTES.USER.ACCOUNT_SETTINGS}>
                      <MenubarItem>Tài khoản</MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <MenubarItem>Trung tâm trợ giúp</MenubarItem>
                    <MenubarItem className='font-semibold' onClick={() => signOut({ callbackUrl: '/sign-in' })}>
                      Đăng xuất
                    </MenubarItem>
                  </MenubarContent>
                ) : (
                  <MenubarContent className='rounded-xl py-3'>
                    <Link href={ROUTES.AUTH.SIGNUP}>
                      <MenubarItem className='font-semibold'>Đăng ký</MenubarItem>
                    </Link>
                    <Link href={ROUTES.AUTH.SIGNIN}>
                      <MenubarItem>Đăng nhập</MenubarItem>
                    </Link>
                    <MenubarSeparator />
                    <MenubarItem>Cho thuê chỗ ở qua Airbnb</MenubarItem>
                    <MenubarItem>Tổ chức trải nghiệm</MenubarItem>
                    <MenubarItem>Trung tâm trợ giúp</MenubarItem>
                  </MenubarContent>
                )}
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      {/* CategoryHeader */}
      {CategoryHeader && <CategoryHeader />}

      {/* SearchDialog */}
      <SearchDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onClose={closeDialog}
        onSearchSubmit={handleSearchSubmit}
        initialStep={initialStep}
      />
    </header>
  )
}

export default UserHeader
