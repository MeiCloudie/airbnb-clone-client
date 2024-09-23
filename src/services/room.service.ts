import { RoomPaginationPayload, RoomPaginationResponse, RoomError } from '@/types/room.type'
import { http } from './http.service'
import axios from 'axios'

export const roomService = {
  roomPagination: async (data: RoomPaginationPayload) => {
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
  }
}
