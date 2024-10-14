import {
  RoomPaginationPayload,
  RoomPaginationResponse,
  RoomError,
  RoomByLocationPayload,
  RoomByLocationResponse,
  RoomByIdPayload,
  RoomByIdResponse,
  GetAllRoomsResponse,
  PostRoomPayload,
  PostRoomResponse,
  PutRoomPayload,
  PutRoomResponse,
  DeleteRoomPayload
} from '@/types/room.type'
import { http } from './http.service'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export const roomService = {
  getRoomPagination: async (data: RoomPaginationPayload) => {
    const { pageIndex, pageSize, keywords } = data

    try {
      const response = await http.get<RoomPaginationResponse>(`/phong-thue/phan-trang-tim-kiem`, {
        params: {
          pageIndex,
          pageSize,
          keywords: keywords || ''
        }
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },

  getRoomByLocation: async (data: RoomByLocationPayload) => {
    const { maViTri } = data

    try {
      const response = await http.get<RoomByLocationResponse>(`/phong-thue/lay-phong-theo-vi-tri`, {
        params: { maViTri }
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },

  getRoomById: async (data: RoomByIdPayload) => {
    const { id } = data

    try {
      const response = await http.get<RoomByIdResponse>(`/phong-thue/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },

  getAllRooms: async () => {
    try {
      const response = await http.get<GetAllRoomsResponse>(`/phong-thue`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },

  postRoom: async (data: PostRoomPayload) => {
    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.post<PostRoomResponse>(`/phong-thue`, data, {
        headers: {
          token: `${userToken}`
        }
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },
  putRoom: async (data: PutRoomPayload) => {
    const { id } = data

    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.put<PutRoomResponse>(`/phong-thue/${id}`, data, {
        headers: {
          token: `${userToken}`
        }
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  },

  deleteRoom: async (data: DeleteRoomPayload) => {
    const { id } = data

    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.delete<RoomError>(`/phong-thue/${id}`, {
        headers: {
          token: `${userToken}`
        }
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as RoomError
        }
      }
      throw error
    }
  }
}
