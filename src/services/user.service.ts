import { UserByIdPayload, UserByIdResponse, UserError } from '@/types/auth.type'
import { http } from './http.service'
import axios from 'axios'

export const userService = {
  getUserById: async (data: UserByIdPayload) => {
    const { id } = data

    try {
      const response = await http.get<UserByIdResponse>(`/users/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as UserError
        }
      }
      throw error
    }
  }
}
