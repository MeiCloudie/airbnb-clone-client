import { create } from 'zustand'
import { locationService } from '@/services/location.service'
import {
  LocationPaginationPayload,
  LocationPaginationResponse,
  LocationResponse,
  LocationError,
  PostLocationResponse,
  PostLocationPayload
} from '@/types/location.type'

interface LocationState {
  isLoading: boolean
  error: LocationError | null
  dataLocationPagination: LocationPaginationResponse | null
  dataAllLocations: LocationResponse | null
  getLocationPagination: (payload: LocationPaginationPayload) => Promise<void>
  getAllLocations: () => Promise<void>
  postLocationResponse: PostLocationResponse | null
  postLocation: (payload: PostLocationPayload) => Promise<LocationError | null>
}

export const useLocationStore = create<LocationState>((set) => ({
  isLoading: false,
  error: null,
  dataLocationPagination: null,
  dataAllLocations: null,
  postLocationResponse: null,

  getLocationPagination: async (payload: LocationPaginationPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await locationService.getLocationPagination(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as LocationError, dataLocationPagination: null })
      } else {
        set({ isLoading: false, dataLocationPagination: response as LocationPaginationResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as LocationError
      })
    }
  },

  getAllLocations: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await locationService.getAllLocations()

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as LocationError, dataAllLocations: null })
      } else {
        set({ isLoading: false, dataAllLocations: response as LocationResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as LocationError
      })
    }
  },

  postLocation: async (payload: PostLocationPayload): Promise<LocationError | null> => {
    set({ isLoading: true, error: null, postLocationResponse: null })

    try {
      const response = await locationService.postLocation(payload)

      if (response && response.statusCode === 201) {
        set({ postLocationResponse: response as PostLocationResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as LocationError
        set({ isLoading: false, error: errorResponse, postLocationResponse: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as LocationError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  }
}))
