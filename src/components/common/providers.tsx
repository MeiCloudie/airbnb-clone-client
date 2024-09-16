import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { NotificationProvider } from '@/context/notification-context'
import { AlertProvider } from '@/context/alert-context'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'

interface ProvidersProps {
  session: SessionProviderProps['session']
  children: ReactNode
}

const Providers = ({ session, children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <SessionProvider session={session}>
        <AntdRegistry>
          <NotificationProvider>
            <AlertProvider>{children}</AlertProvider>
          </NotificationProvider>
        </AntdRegistry>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers
