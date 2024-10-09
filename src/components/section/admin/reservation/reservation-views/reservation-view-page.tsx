'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import ReservationTable from '@/components/section/admin/reservation/reservation-tables/reservation-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useReservation } from '@/hooks/useReservation'
import { Plus } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

const breadcrumbItems = [
  { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
  { title: 'Quản lý đặt phòng', link: ROUTES.ADMIN.RESERVATIONS }
]

type ReservationViewPageProps = {
  page: number
  search: string | null
  limit: number
}

export default function ReservationViewPage({ page, search, limit }: ReservationViewPageProps) {
  const { getAllReservations, allReservations, isLoading } = useReservation()

  useEffect(() => {
    getAllReservations() // Fetch all reservations on component mount
  }, [getAllReservations])

  const filteredReservations = useMemo(() => {
    if (!allReservations || !allReservations.content) return []

    return allReservations.content.filter((reservation) =>
      search
        ? reservation.maPhong.toString().includes(search) || reservation.maNguoiDung.toString().includes(search)
        : true
    )
  }, [allReservations, search])

  const totalReservations = filteredReservations.length
  const paginatedReservations = filteredReservations.slice((page - 1) * limit, page * limit)

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />
        <div className='flex items-start justify-between'>
          <Heading title={`Đặt phòng (${totalReservations})`} description='Danh sách ĐẶT PHÒNG trong hệ thống' />
          <Button variant='default'>
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Button>
        </div>
        <Separator />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ReservationTable data={paginatedReservations} totalData={totalReservations} />
        )}
      </div>
    </PageContainer>
  )
}
