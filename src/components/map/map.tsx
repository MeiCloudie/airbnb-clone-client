import React from 'react'
import GoogleMapReact from 'google-map-react'

// Khai báo kiểu cho component marker
interface MarkerProps {
  lat: number
  lng: number
  text: string
}

// Component marker nhận các prop lat, lng và text
const AnyReactComponent: React.FC<MarkerProps> = ({ text }) => (
  <div className='bg-red-500 text-white p-2 rounded-md'>{text}</div>
)

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.8231, // Latitude for Ho Chi Minh City
      lng: 106.6297 // Longitude for Ho Chi Minh City
    },
    zoom: 15
  }

  return (
    <div className='w-[80vh] h-[80vh]'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent text='My Marker' lat={10.8231} lng={106.6297} />
      </GoogleMapReact>
    </div>
  )
}
