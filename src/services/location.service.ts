import { LocationPaginationPayload, LocationPaginationResponse, LocationError } from '@/types/location.type'
import { http } from './http.service'
import axios from 'axios'

export const locationService = {
  // Hàm phân trang cho location sử dụng GET request
  locationPagination: async (data: LocationPaginationPayload) => {
    const { pageIndex, pageSize, keywords } = data

    try {
      // Sử dụng GET request với query parameters
      const response = await http.get<LocationPaginationResponse>(`/vi-tri/phan-trang-tim-kiem`, {
        params: {
          pageIndex,
          pageSize,
          keywords: keywords || '' // Nếu keywords là null, truyền vào chuỗi rỗng
        }
      })
      return response.data
    } catch (error) {
      // Kiểm tra xem lỗi có phải là lỗi từ axios không
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as LocationError
        }
      }
      throw error
    }
  }
}
