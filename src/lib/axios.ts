import { getLocalStorage, setLocalStorage } from '@/lib/utils'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
const cyberSoftToken = process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN

export const http = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    tokenCyberSoft: cyberSoftToken
  }
})

// Interceptor cho request: Thêm Authorization token từ localStorage
http.interceptors.request.use(
  (config) => {
    const token = getLocalStorage<string>('authToken') // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // Thêm token vào header Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error) // Xử lý lỗi request
  }
)

// Interceptor cho response: Xử lý lỗi và response
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login...')
      // Ví dụ: Nếu gặp lỗi 401, có thể xóa token khỏi localStorage
      setLocalStorage('authToken', null) // Xóa token khi hết hạn
    }
    return Promise.reject(error)
  }
)
