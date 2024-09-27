'use client'

import RoomListByLocation from '@/app/(user)/rooms/room-list-by-location'
// import SimpleMap from '@/components/map/map'
import { useSearchParams } from 'next/navigation' // Import useSearchParams từ Next.js

interface RoomsByLocationProps {}

export default function RoomsByLocation({}: RoomsByLocationProps) {
  const searchParams = useSearchParams() // Lấy các tham số tìm kiếm từ URL

  const locationId = searchParams.get('location_id')
  const locationLabel = searchParams.get('location_label')
  const dateRangeFrom = searchParams.get('date_range_from')
  const dateRangeTo = searchParams.get('date_range_to')
  const guestsAdults = searchParams.get('guests_adults')
  const guestsChildren = searchParams.get('guests_children')
  const guestsInfants = searchParams.get('guests_infants')
  const guestsPets = searchParams.get('guests_pets')

  return (
    <div>
      <h1>Rooms By Location</h1>
      <p>Location ID: {locationId}</p>
      <p>Location Label: {decodeURIComponent(locationLabel || '')}</p>
      <p>Date Range From: {dateRangeFrom}</p>
      <p>Date Range To: {dateRangeTo}</p>
      <p>Guests Adults: {guestsAdults}</p>
      <p>Guests Children: {guestsChildren}</p>
      <p>Guests Infants: {guestsInfants}</p>
      <p>Guests Pets: {guestsPets}</p>

      <div>{/* <SimpleMap /> */}</div>

      <div>
        <RoomListByLocation maViTri={locationId ? parseInt(locationId, 10) : 0} />
      </div>
    </div>
  )
}
