import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions to interact with localStorage

// Đặt giá trị vào localStorage với kiểu dữ liệu an toàn
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const stringJson = JSON.stringify(value) // Chuyển đổi thành chuỗi JSON
    localStorage.setItem(key, stringJson)
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}

// Lấy giá trị từ localStorage và trả về đúng kiểu dữ liệu
export function getLocalStorage<T>(key: string): T | null {
  try {
    const dataLocal = localStorage.getItem(key) // Lấy dữ liệu từ localStorage
    return dataLocal ? (JSON.parse(dataLocal) as T) : null // Parse dữ liệu nếu không null
  } catch (error) {
    console.error('Error getting localStorage:', error)
    return null
  }
}
