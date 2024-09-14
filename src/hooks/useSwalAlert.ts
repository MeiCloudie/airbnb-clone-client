import AlertContext from '@/context/AlertContext'
import { useContext } from 'react'

export const useSwalAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useSwalAlert must be used within an AlertProvider')
  }
  return context
}
