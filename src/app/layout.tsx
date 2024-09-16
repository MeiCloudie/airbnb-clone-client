import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from '@/components/common/providers'
import NextTopLoader from 'nextjs-toploader'
import { auth } from '@/auth/auth.config'

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

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang='en'>
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <NextTopLoader
          color='#ff385c'
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={true}
          easing='ease'
          speed={100}
          shadow='0 0 10px #2299DD,0 0 5px #2299DD'
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
