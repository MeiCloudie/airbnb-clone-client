import { useState, useEffect } from 'react'

// Định nghĩa breakpoints theo Tailwind CSS
const tailwindBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

// Hook để kiểm tra kích thước màn hình so với breakpoints Tailwind
function useResponsive() {
  const [isResponsive, setIsResponsive] = useState<Record<keyof typeof tailwindBreakpoints, boolean>>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false
  })

  useEffect(() => {
    const handleResize = () => {
      const newIsResponsive: Record<keyof typeof tailwindBreakpoints, boolean> = {
        sm: window.innerWidth >= tailwindBreakpoints.sm,
        md: window.innerWidth >= tailwindBreakpoints.md,
        lg: window.innerWidth >= tailwindBreakpoints.lg,
        xl: window.innerWidth >= tailwindBreakpoints.xl,
        '2xl': window.innerWidth >= tailwindBreakpoints['2xl']
      }
      setIsResponsive(newIsResponsive)
    }

    handleResize() // Kiểm tra kích thước ban đầu
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isResponsive
}

export default useResponsive
