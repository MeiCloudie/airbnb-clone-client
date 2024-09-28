'use client'

import RoomListByLocation from '@/app/(user)/rooms/room-list-by-location'
import SimpleMap from '@/components/map/map'
import { useSearchParams } from 'next/navigation'

interface RoomsByLocationProps {}

export default function RoomsByLocation({}: RoomsByLocationProps) {
  const searchParams = useSearchParams()

  const locationId = searchParams.get('location_id')
  const locationLabel = searchParams.get('location_label')
  // const dateRangeFrom = searchParams.get('date_range_from')
  // const dateRangeTo = searchParams.get('date_range_to')
  // const guestsAdults = searchParams.get('guests_adults')
  // const guestsChildren = searchParams.get('guests_children')
  // const guestsInfants = searchParams.get('guests_infants')
  // const guestsPets = searchParams.get('guests_pets')

  return (
    <>
      <div className='flex flex-col-reverse justify-center items-center xl:flex-row xl:justify-between xl:items-start gap-8 w-full'>
        {/* Room List By Location */}
        <div className='flex-grow w-full xl:w-2/3'>
          <RoomListByLocation
            maViTri={locationId ? parseInt(locationId, 10) : 0}
            locationLabel={locationLabel ? decodeURIComponent(locationLabel) : ''}
          />
        </div>
        {/* Map */}
        <div className='sticky top-[180px] md:top-[90px] w-full pb-2 bg-background xl:w-1/3'>
          <SimpleMap />
        </div>
      </div>
    </>
  )
}
