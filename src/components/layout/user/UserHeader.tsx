'use client'

import AirbnbLogo from '@/components/icon/airbnb-logo'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ROUTES } from '@/constants/routes'
import Link from 'next/link'
import React from 'react'
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
import useResponsive from '@/hooks/useResponsive'

const UserHeader = () => {
  const isResponsive = useResponsive()

  return (
    <header className='sticky top-0 z-50 pt-2 pb-5 border-b shadow-md bg-background'>
      <div className='container space-y-3 md:flex md:justify-between 2xl:grid 2xl:grid-cols-3'>
        {/* Logo */}
        <Link href={ROUTES.USER.HOME} className='content-center'>
          <AirbnbLogo />
        </Link>

        {/* Search */}
        <div className='content-center lg:w-3/5 xl:w-2/5 2xl:w-full'>
          <ToggleGroup
            type='multiple'
            size='lg'
            className='border rounded-full py-1 shadow-sm divide-x hover:shadow-lg'
          >
            {isResponsive.lg ? (
              <>
                <ToggleGroupItem value='anywhere' className='font-bold hover:bg-transparent'>
                  <p>Địa điểm bất kỳ</p>
                </ToggleGroupItem>
                <ToggleGroupItem value='anyweek' className='font-bold hover:bg-transparent'>
                  <p>tuần bất kỳ</p>
                </ToggleGroupItem>
                <ToggleGroupItem value='anyguests' className='font-bold opacity-50 hover:bg-transparent'>
                  <p>Thêm khách</p>
                </ToggleGroupItem>
              </>
            ) : (
              <>
                <ToggleGroupItem value='all' className='hover:bg-transparent'>
                  <p className='text-left'>
                    <span className='font-bold'>Bạn sẽ đi đâu</span>
                    <br />
                    <span className='text-xs opacity-75'>Địa điểm bất kỳ • tuần bất kỳ • Thêm khách</span>
                  </p>
                </ToggleGroupItem>
              </>
            )}

            <ToggleGroupItem
              value='anyweek'
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
            <Link href={'/host/home'}>Cho thuê chỗ ở qua Airbnb</Link>
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
              <MenubarTrigger className='cursor-pointer space-x-2'>
                <FontAwesomeIcon icon={faBars} className='w-4 h-auto' />
                <Avatar className='w-9 h-9'>
                  <AvatarImage src={''} alt='avatar' />
                  <AvatarFallback className='bg-slate-800 text-white'>A</AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent className='rounded-xl py-3'>
                <MenubarItem>Đăng ký</MenubarItem>
                <MenubarItem>Đăng nhập</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cho thuê chỗ ở qua Airbnb</MenubarItem>
                <MenubarItem>Tổ chức trải nghiệm</MenubarItem>
                <MenubarItem>Trung tâm trợ giúp</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </header>
  )
}

export default UserHeader
