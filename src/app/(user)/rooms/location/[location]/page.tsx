interface RoomsByLocationProps {
  params: {
    location: string
  }
}

export default function RoomsByLocation({ params }: RoomsByLocationProps) {
  return (
    <div>
      <h1>Rooms By Location</h1>
      <p>Location: {params.location}</p>
    </div>
  )
}
