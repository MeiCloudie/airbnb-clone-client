import NotificationContext from '@/context/notification-context'
import { useContext } from 'react'

export const useToastifyNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useToastifyNotification must be used within a NotificationProvider')
  }
  return context
}
