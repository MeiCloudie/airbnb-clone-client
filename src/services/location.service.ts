import {
  LocationPaginationPayload,
  LocationPaginationResponse,
  LocationError,
  LocationResponse,
  PostLocationPayload,
  PostLocationResponse,
  PutLocationPayload,
  PutLocationResponse,
  DeleteLocationPayload
} from '@/types/location.type'
import { http } from './http.service'
import axios from 'axios'
import { getSession } from 'next-auth/react'

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
  },

  postLocation: async (data: PostLocationPayload) => {
    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.post<PostLocationResponse>(`/vi-tri`, data, {
        headers: {
          token: `${userToken}`
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

  putLocation: async (data: PutLocationPayload) => {
    const { id } = data

    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.put<PutLocationResponse>(`/vi-tri/${id}`, data, {
        headers: {
          token: `${userToken}`
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

  deleteLocation: async (data: DeleteLocationPayload) => {
    const { id } = data

    try {
      const session = await getSession()
      const userToken = session?.accessToken

      if (!userToken) {
        throw new Error('User is not authenticated')
      }

      const response = await http.delete<LocationError>(`/vi-tri/${id}`, {
        headers: {
          token: `${userToken}`
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
  }
}
