export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>Admin Header</header>
      <main>{children}</main>
      <footer>Admin Footer</footer>
    </>
  )
}
