import { userService } from '@/services/user.service'
import {
  GetAllUsersResponse,
  PostUserPayload,
  PostUserResponse,
  UserByIdPayload,
  UserByIdResponse,
  UserError
} from '@/types/auth.type'
import { create } from 'zustand'

interface UserState {
  isLoading: boolean
  error: UserError | null
  userById: UserByIdResponse | null
  allUsers: GetAllUsersResponse | null
  postUserResponse: PostUserResponse | null
  getUserById: (payload: UserByIdPayload) => Promise<void>
  getAllUsers: () => Promise<void>
  postUser: (payload: PostUserPayload) => Promise<UserError | null>
}

export const useUserStore = create<UserState>((set) => ({
  isLoading: false,
  error: null,
  userById: null,
  allUsers: null,
  postUserResponse: null,

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
  },

  getAllUsers: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await userService.getAllUsers()

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as UserError, allUsers: null })
      } else {
        set({ isLoading: false, allUsers: response as GetAllUsersResponse, error: null })
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
  },

  postUser: async (payload: PostUserPayload): Promise<UserError | null> => {
    set({ isLoading: true, error: null, postUserResponse: null })

    try {
      const response = await userService.postUser(payload)

      if (response && response.statusCode === 200) {
        set({ postUserResponse: response as PostUserResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as UserError
        set({ isLoading: false, error: errorResponse, postUserResponse: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as UserError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  }
}))
