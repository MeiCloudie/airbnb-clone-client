import AdminLayout from '@/components/layout/admin/admin-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Airbnb Administration | MeiCloudie',
  description:
    'Airbnb clone client app with Next.js 14 (App Router), React 18, TypeScript, TailwindCSS, Auth.js, Ant Design, ShadcnUI, Prettier & Eslint, Fontawesome, Lottie React, React Toastify, SweetAlert2, React Hook Form, Zod, Axios, Zustand',
  icons: {
    icon: '/logo/favicon.ico'
  }
}

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
