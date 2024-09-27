'use client'

import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

// interface MarkerProps {
//   lat: number
//   lng: number
//   text: string
// }

// const Marker: React.FC<MarkerProps> = ({ text }) => <div className='bg-red-500 text-white p-2 rounded-md'>{text}</div>

const MapBadge = () => <Badge variant={'default'}>Coming Soon</Badge>

export default function SimpleMap() {
  const [loading, setLoading] = useState(true)

  const defaultProps = {
    center: {
      lat: 10.8231, // Latitude for Ho Chi Minh City
      lng: 106.6297 // Longitude for Ho Chi Minh City
    },
    zoom: 5
  }

  useEffect(() => {
    // Giả lập thời gian tải của Google Map API (có thể là khi API map đã sẵn sàng)
    const timer = setTimeout(() => {
      setLoading(false) // Sau khi tải xong thì set loading = false
    }, 2000) // Thời gian giả lập 2 giây

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-full h-[15vh] md:h-[30vh] xl:h-[90vh]'>
      {loading ? (
        // Hiển thị skeleton trong khi đang loading
        <Skeleton className='w-full h-full' />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {/* <Marker text='My Marker' lat={10.8231} lng={106.6297} /> */}
          <MapBadge />
        </GoogleMapReact>
      )}
    </div>
  )
}
