import {
  RoomPaginationPayload,
  RoomPaginationResponse,
  RoomError,
  RoomByLocationPayload,
  RoomByLocationResponse,
  RoomByIdPayload,
  RoomByIdResponse
} from '@/types/room.type'
import { http } from './http.service'
import axios from 'axios'

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
  }
}
