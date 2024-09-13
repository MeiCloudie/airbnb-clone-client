import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { NotificationProvider } from '@/context/NotificationContext'
import { AlertProvider } from '@/context/AlertContext'
import { AntdRegistry } from '@ant-design/nextjs-registry'

interface ProvidersProps {
  children: ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
      <AntdRegistry>
        <NotificationProvider>
          <AlertProvider>{children}</AlertProvider>
        </NotificationProvider>
      </AntdRegistry>
    </ThemeProvider>
  )
}

export default Providers
