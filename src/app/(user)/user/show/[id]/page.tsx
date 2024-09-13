interface UserPublicProfileProps {
  params: {
    id: string
  }
}

export default function UserPublicProfile({ params }: UserPublicProfileProps) {
  return (
    <>
      <h1>UserPublicProfile Page: {params.id}</h1>
    </>
  )
}
