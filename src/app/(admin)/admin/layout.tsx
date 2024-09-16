import Header from '@/components/layout/admin/header'
import Sidebar from '@/components/layout/admin/sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Administration | MeiCloudie',
  description:
    'Airbnb clone client app with Next.js 14 (App Router), React 18, TypeScript, TailwindCSS, Ant Design, ShadcnUI, Prettier & Eslint, Fontawesome, Lottie React, React Toastify, SweetAlert2, React Hook Form, Zod, Axios, Zustand',
  icons: {
    icon: '/logo/favicon.ico'
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='w-full flex-1 overflow-hidden'>
        <Header />
        {children}
      </main>
    </div>
  )
}
