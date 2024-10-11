'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import AddRoomDialog from '@/components/section/admin/room/room-actions/add-room-dialog'
import RoomTable from '@/components/section/admin/room/room-tables/room-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useLocation } from '@/hooks/useLocation'
import { useRoom } from '@/hooks/useRoom'
import { Plus } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const breadcrumbItems = [
  { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
  { title: 'Quản lý thông tin phòng', link: ROUTES.ADMIN.ROOMS }
]

type RoomViewPageProps = {
  page: number
  search: string | null
  maViTri: string | null
  limit: number
}

export default function RoomViewPage({ page, search, maViTri, limit }: RoomViewPageProps) {
  const { getAllRooms, allRooms, isLoading } = useRoom()
  const { getAllLocations, dataAllLocations } = useLocation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    getAllRooms()
    getAllLocations()
  }, [getAllRooms, getAllLocations])

  const filteredRooms = useMemo(() => {
    if (!allRooms || !allRooms.content) return []
    if (!dataAllLocations || !dataAllLocations.content) return []

    const locationArray = maViTri ? maViTri.split('.') : []

    return allRooms.content.filter((room) => {
      const matchesLocation = locationArray.length ? locationArray.includes(room.maViTri.toString()) : true
      const matchesSearch = search ? room.tenPhong?.toLowerCase().includes(search.toLowerCase()) : true
      return matchesLocation && matchesSearch
    })
  }, [allRooms, dataAllLocations, maViTri, search])

  const totalRooms = filteredRooms.length
  const offset = (page - 1) * (limit || 10)
  const paginatedRooms = filteredRooms.slice(offset, offset + limit)

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Phòng (${totalRooms})`} description='Danh sách PHÒNG trong hệ thống' />

          <Button variant={'default'} onClick={() => setIsDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Button>
        </div>

        <Separator />

        {isLoading ? <p>Loading...</p> : <RoomTable data={paginatedRooms} totalData={totalRooms} />}

        <AddRoomDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </div>
    </PageContainer>
  )
}
