import {
  DeleteUserPayload,
  GetAllUsersResponse,
  PostUserPayload,
  PostUserResponse,
  PutUserPayload,
  PutUserResponse,
  UserByIdPayload,
  UserByIdResponse,
  UserError
} from '@/types/auth.type'
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
  },

  getAllUsers: async () => {
    try {
      const response = await http.get<GetAllUsersResponse>(`/users`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as UserError
        }
      }
      throw error
    }
  },

  postUser: async (data: PostUserPayload) => {
    try {
      const response = await http.post<PostUserResponse>(`/users`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as UserError
        }
      }
      throw error
    }
  },

  putUser: async (data: PutUserPayload) => {
    const { id } = data

    try {
      const response = await http.put<PutUserResponse>(`/users/${id}`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as UserError
        }
      }
      throw error
    }
  },

  deleteUser: async (data: DeleteUserPayload) => {
    const { id } = data

    try {
      const response = await http.delete<UserError>(`/users`, { params: { id } })
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
