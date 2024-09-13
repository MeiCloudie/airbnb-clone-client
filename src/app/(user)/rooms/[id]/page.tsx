interface RoomDetailProps {
  params: {
    id: string
  }
}

export default function RoomDetail({ params }: RoomDetailProps) {
  return (
    <div>
      <h1>Room Detail</h1>
      <p>Room ID: {params.id}</p>
    </div>
  )
}
