'use client'

import React, { createContext, ReactNode } from 'react'
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

interface AlertContextProps {
  showAlert: (options: SweetAlertOptions) => Promise<SweetAlertResult>
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const showAlert = (options: SweetAlertOptions): Promise<SweetAlertResult> => {
    return Swal.fire(options)
  }

  return <AlertContext.Provider value={{ showAlert }}>{children}</AlertContext.Provider>
}

export default AlertContext
