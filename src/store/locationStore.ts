import { create } from 'zustand'
import { locationService } from '@/services/location.service'
import {
  LocationPaginationPayload,
  LocationPaginationResponse,
  LocationResponse,
  LocationError
} from '@/types/location.type'

interface LocationState {
  isLoading: boolean
  error: LocationError | null
  dataLocationPagination: LocationPaginationResponse | null
  dataAllLocations: LocationResponse | null
  getLocationPagination: (payload: LocationPaginationPayload) => Promise<void>
  getAllLocations: () => Promise<void>
}

export const useLocationStore = create<LocationState>((set) => ({
  isLoading: false,
  error: null,
  dataLocationPagination: null,
  dataAllLocations: null,

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
  }
}))
