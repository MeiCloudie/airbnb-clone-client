import { createStore } from '@/lib/zustandStore'
import { SignUpPayload, AuthError, SignInPayload } from '@/types/auth.type'
import { authService } from '@/services/auth.service'
import { signIn as nextAuthSignIn } from 'next-auth/react'
import { AxiosError } from 'axios'

interface AuthState {
  isLoading: boolean
  error: string | null // Quản lý lỗi dưới dạng string
  signUp: (data: SignUpPayload) => Promise<void> // Hàm xử lý đăng ký
  signIn: (data: SignInPayload) => Promise<void> // Hàm xử lý đăng nhập
}

export const useAuthStore = createStore<AuthState>(
  (set) => ({
    isLoading: false,
    error: null,

    // Hàm sign up
    signUp: async (data: SignUpPayload) => {
      set({ isLoading: true, error: null }) // Reset trạng thái khi bắt đầu đăng ký

      try {
        // Gọi API sign up từ authService
        const response = await authService.signUp(data)

        if (response.status === 200) {
          set({ isLoading: false, error: null }) // Đăng ký thành công
        } else {
          // Xử lý lỗi từ API (lấy thông báo từ response.data.content hoặc thông báo chung)
          const errorMessage = typeof response.data?.content === 'string' ? response.data.content : 'Failed to sign up'
          set({ isLoading: false, error: errorMessage })
        }
      } catch (error) {
        // Kiểm tra xem lỗi có từ API và là AxiosError không
        if (error instanceof AxiosError && error.response) {
          const apiError: AuthError = error.response.data
          set({ isLoading: false, error: apiError.content }) // Lấy thông báo lỗi từ API
        } else {
          // Xử lý lỗi chung nếu không có phản hồi rõ ràng từ API
          set({ isLoading: false, error: 'Something went wrong' })
        }
      }
    },

    // Hàm sign in
    signIn: async (data: SignInPayload) => {
      set({ isLoading: true, error: null })

      try {
        const result = await nextAuthSignIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password
        })

        console.log(result)

        if (result?.error) {
          // Lấy lỗi từ `result.error` trả về từ NextAuth
          // PROBLEM: Chưa handle được vấn đề server - client side của Authjs v5 Beta
          if (result.error === 'Configuration') {
            set({ isLoading: false, error: 'Invalid email or password' })
          }
        } else {
          set({ isLoading: false, error: null })
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          const apiError = error.response.data
          set({ isLoading: false, error: apiError.content })
        } else {
          set({ isLoading: false, error: 'Something went wrong' })
        }
      }
    }
  }),
  'auth-store'
)
