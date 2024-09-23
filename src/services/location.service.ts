import {
  LocationPaginationPayload,
  LocationPaginationResponse,
  LocationError,
  LocationResponse
} from '@/types/location.type'
import { http } from './http.service'
import axios from 'axios'

export const locationService = {
  getLocationPagination: async (data: LocationPaginationPayload) => {
    const { pageIndex, pageSize, keywords } = data

    try {
      const response = await http.get<LocationPaginationResponse>(`/vi-tri/phan-trang-tim-kiem`, {
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
          return error.response.data as LocationError
        }
      }
      throw error
    }
  },

  getAllLocations: async () => {
    try {
      const response = await http.get<LocationResponse>(`/vi-tri`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as LocationError
        }
      }
      throw error
    }
  }
}
