'use client'

import { Breadcrumbs } from '@/components/custom/custom-breadcrumbs'
import { Heading } from '@/components/custom/custom-heading'
import PageContainer from '@/components/layout/page-container'
import AddLocationDialog from '@/components/section/admin/location/location-actions/add-location-dialog'
import LocationTable from '@/components/section/admin/location/location-tables/location-table'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ROUTES } from '@/constants/routes'
import { useLocation } from '@/hooks/useLocation'
import { Plus } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const breadcrumbItems = [
  { title: 'Tổng quan', link: ROUTES.ADMIN.HOME },
  { title: 'Quản lý thông tin vị trí', link: ROUTES.ADMIN.LOCATIONS }
]

type LocationViewPageProps = {
  page: number
  search: string | null
  tinhThanh: string | null
  quocGia: string | null
  limit: number
}

export default function LocationViewPage({ page, search, tinhThanh, quocGia, limit }: LocationViewPageProps) {
  const { getAllLocations, dataAllLocations, isLoading } = useLocation()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  const filteredLocations = useMemo(() => {
    if (!dataAllLocations || !dataAllLocations.content) return []

    const tinhThanhArray = tinhThanh ? tinhThanh.split('.') : []
    const quocGiaArray = quocGia ? quocGia.split('.') : []

    const filteredByCity = tinhThanhArray.length
      ? dataAllLocations.content.filter((loc) => tinhThanhArray.includes(loc.tinhThanh))
      : dataAllLocations.content

    const filteredByCountry = quocGiaArray.length
      ? filteredByCity.filter((loc) => quocGiaArray.includes(loc.quocGia))
      : filteredByCity

    return filteredByCountry.filter((loc) => loc.tenViTri.toLowerCase().includes(search?.toLowerCase() || ''))
  }, [dataAllLocations, search, tinhThanh, quocGia])

  const totalLocations = filteredLocations.length
  const paginatedLocations = filteredLocations.slice((page - 1) * limit, page * limit)

  return (
    <PageContainer>
      <div className='space-y-4'>
        <Breadcrumbs items={breadcrumbItems} />

        <div className='flex items-start justify-between'>
          <Heading title={`Vị trí (${totalLocations})`} description='Danh sách VỊ TRÍ trong hệ thống' />
          <Button variant='default' onClick={() => setIsDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Button>
        </div>

        <Separator />

        {isLoading ? <p>Loading...</p> : <LocationTable data={paginatedLocations} totalData={totalLocations} />}

        <AddLocationDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      </div>
    </PageContainer>
  )
}
