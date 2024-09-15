import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from '@/components/common/Providers'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  preload: true
})

export const metadata: Metadata = {
  title: 'Airbnb Clone | MeiCloudie',
  description:
    'Airbnb clone client app with Next.js 14 (App Router), React 18, TypeScript, TailwindCSS, Ant Design, ShadcnUI, Prettier & Eslint, Fontawesome, Lottie React, React Toastify, SweetAlert2, React Hook Form, Zod, Axios, Zustand',
  icons: {
    icon: '/logo/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
