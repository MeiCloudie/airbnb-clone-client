import { userService } from '@/services/user.service'
import { UserByIdPayload, UserByIdResponse, UserError } from '@/types/auth.type'
import { create } from 'zustand'

interface UserState {
  isLoading: boolean
  error: UserError | null
  userById: UserByIdResponse | null
  getUserById: (payload: UserByIdPayload) => Promise<void>
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  error: null,
  userById: null,

  getUserById: async (payload: UserByIdPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await userService.getUserById(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as UserError, userById: null })
      } else {
        set({ isLoading: false, userById: response as UserByIdResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as UserError
      })
    }
  }
}))
