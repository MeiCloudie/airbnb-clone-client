import { create } from 'zustand'
import { locationService } from '@/services/location.service'
import { LocationPaginationPayload, LocationPaginationResponse, LocationError } from '@/types/location.type'

interface LocationState {
  isLoading: boolean
  error: LocationError | null
  data: LocationPaginationResponse | null
  getLocationPagination: (payload: LocationPaginationPayload) => Promise<void>
}

export const useLocationStore = create<LocationState>((set) => ({
  isLoading: false,
  error: null,
  data: null,

  getLocationPagination: async (payload: LocationPaginationPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await locationService.locationPagination(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as LocationError, data: null })
      } else {
        set({ isLoading: false, data: response as LocationPaginationResponse, error: null })
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
