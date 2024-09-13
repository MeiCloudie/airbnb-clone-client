'use client'

import { createContext, ReactNode, useContext } from 'react'
import { toast, ToastContainer, ToastOptions, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface NotificationContextProps {
  showNotification: (content: string, type: 'success' | 'error' | 'info' | 'warning', duration?: number) => void
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const showNotification = (content: string, type: 'success' | 'error' | 'info' | 'warning', duration = 4000) => {
    const toastTypes: Record<string, (msg: string, options?: ToastOptions) => void> = {
      success: toast.success,
      error: toast.error,
      info: toast.info,
      warning: toast.warning
    }

    const showToast = toastTypes[type]
    showToast(content, {
      position: 'top-right',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce
    })
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
