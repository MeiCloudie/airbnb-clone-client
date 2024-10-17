import { create } from 'zustand'
import { locationService } from '@/services/location.service'
import {
  LocationPaginationPayload,
  LocationPaginationResponse,
  LocationResponse,
  LocationError,
  PostLocationResponse,
  PostLocationPayload,
  PutLocationResponse,
  PutLocationPayload,
  DeleteLocationResponse,
  DeleteLocationPayload,
  LocationByIdResponse,
  LocationByIdPayload,
  PostImageLocationResponse,
  PostImageLocationPayload
} from '@/types/location.type'

interface LocationState {
  isLoading: boolean
  error: LocationError | null
  dataLocationPagination: LocationPaginationResponse | null
  getLocationPagination: (payload: LocationPaginationPayload) => Promise<void>
  dataAllLocations: LocationResponse | null
  getAllLocations: () => Promise<void>
  locationById: LocationByIdResponse | null
  getLocationById: (payload: LocationByIdPayload) => Promise<void>
  postLocationResponse: PostLocationResponse | null
  postLocation: (payload: PostLocationPayload) => Promise<LocationError | null>
  putLocationResponse: PutLocationResponse | null
  putLocation: (payload: PutLocationPayload) => Promise<LocationError | null>
  deleteLocationResponse: DeleteLocationResponse | null
  deleteLocation: (payload: DeleteLocationPayload) => Promise<LocationError | null>
  postImageLocationResponse: PostImageLocationResponse | null
  postImageLocation: (payload: PostImageLocationPayload, file: File) => Promise<LocationError | null>
}

export const useLocationStore = create<LocationState>((set) => ({
  isLoading: false,
  error: null,
  dataLocationPagination: null,
  dataAllLocations: null,
  locationById: null,
  postLocationResponse: null,
  putLocationResponse: null,
  deleteLocationResponse: null,
  postImageLocationResponse: null,

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

  getLocationById: async (payload: LocationByIdPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await locationService.getLocationById(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as LocationError, locationById: null })
      } else {
        set({ isLoading: false, locationById: response as LocationByIdResponse, error: null })
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
  },

  putLocation: async (payload: PutLocationPayload): Promise<LocationError | null> => {
    set({ isLoading: true, error: null, putLocationResponse: null })

    try {
      const response = await locationService.putLocation(payload)

      if (response && response.statusCode === 200) {
        set({ putLocationResponse: response as PutLocationResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as LocationError
        set({ isLoading: false, error: errorResponse, putLocationResponse: null })
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
  },

  deleteLocation: async (payload: DeleteLocationPayload): Promise<LocationError | null> => {
    set({ isLoading: true, error: null, deleteLocationResponse: null })

    try {
      const response = await locationService.deleteLocation(payload)

      if (response && response.statusCode === 200) {
        set({ deleteLocationResponse: response as unknown as DeleteLocationResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as LocationError
        set({ isLoading: false, error: errorResponse, deleteLocationResponse: null })
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
  },

  postImageLocation: async (payload: PostImageLocationPayload, file: File): Promise<LocationError | null> => {
    set({ isLoading: true, error: null, postImageLocationResponse: null })

    try {
      const response = await locationService.postImageLocation(payload, file)

      if (response && response.statusCode === 200) {
        set({ postImageLocationResponse: response as PostImageLocationResponse, isLoading: false, error: null })
        return null // Trả về null nếu thành công
      } else {
        const errorResponse = response as LocationError
        set({ isLoading: false, error: errorResponse, postImageLocationResponse: null })
        return errorResponse // Trả về lỗi nếu có
      }
    } catch (error) {
      const unknownError: LocationError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      }
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi trong trường hợp exception
    }
  }
}))
