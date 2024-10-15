import {
  DeleteReservationPayload,
  DeleteReservationResponse,
  GetAllReservationsResponse,
  PutReservationPayload,
  PutReservationResponse,
  ReservationByIdPayload,
  ReservationByIdResponse,
  ReservationByUserIdPayload,
  ReservationByUserIdResponse,
  ReservationError,
  ReservationPayload,
  ReservationResponse
} from '@/types/reservation.type'
import { reservationService } from '@/services/reservation.service'
import { create } from 'zustand'

interface ReservationState {
  isLoading: boolean
  error: ReservationError | null
  response: ReservationResponse | null
  reservationByUserId: ReservationByUserIdResponse | null
  allReservations: GetAllReservationsResponse | null
  postReservation: (payload: ReservationPayload) => Promise<ReservationError | null>
  getReservationByUserId: (payload: ReservationByUserIdPayload) => Promise<void>
  getAllReservations: () => Promise<void>
  reservationById: ReservationByIdResponse | null
  getReservationById: (payload: ReservationByIdPayload) => Promise<void>
  putReservationResponse: PutReservationResponse | null
  putReservation: (payload: PutReservationPayload) => Promise<ReservationError | null>
  deleteReservationResponse: DeleteReservationResponse | null
  deleteReservation: (payload: DeleteReservationPayload) => Promise<ReservationError | null>
}

export const useReservationStore = create<ReservationState>((set) => ({
  isLoading: false,
  error: null,
  response: null,
  reservationByUserId: null,
  allReservations: null,
  reservationById: null,
  putReservationResponse: null,
  deleteReservationResponse: null,

  postReservation: async (payload: ReservationPayload): Promise<ReservationError | null> => {
    set({ isLoading: true, error: null, response: null })

    try {
      const response = await reservationService.postReservation(payload)
      if (response && response.statusCode === 201) {
        set({ response: response as ReservationResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as ReservationError
        set({ isLoading: false, error: errorResponse, response: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as ReservationError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  },

  getReservationByUserId: async (payload: ReservationByUserIdPayload) => {
    set({ isLoading: true, error: null, reservationByUserId: null })

    try {
      const response = await reservationService.getReservationByUserId(payload)
      if (response && response.statusCode === 200) {
        set({ reservationByUserId: response as ReservationByUserIdResponse, isLoading: false, error: null })
      } else {
        set({ isLoading: false, error: response as ReservationError, reservationByUserId: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as ReservationError
      })
    }
  },

  getAllReservations: async () => {
    set({ isLoading: true, error: null, allReservations: null })

    try {
      const response = await reservationService.getAllReservations()
      if (response && response.statusCode === 200) {
        set({ allReservations: response as GetAllReservationsResponse, isLoading: false, error: null })
      } else {
        set({ isLoading: false, error: response as ReservationError, allReservations: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as ReservationError
      })
    }
  },

  getReservationById: async (payload: ReservationByIdPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await reservationService.getReservationById(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as ReservationError, reservationById: null })
      } else {
        set({ isLoading: false, reservationById: response as ReservationByIdResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as ReservationError
      })
    }
  },

  putReservation: async (payload: PutReservationPayload): Promise<ReservationError | null> => {
    set({ isLoading: true, error: null, putReservationResponse: null })

    try {
      const response = await reservationService.putReservation(payload)

      if (response && response.statusCode === 200) {
        set({ putReservationResponse: response as PutReservationResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as ReservationError
        set({ isLoading: false, error: errorResponse, putReservationResponse: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as ReservationError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  },

  deleteReservation: async (payload: DeleteReservationPayload): Promise<ReservationError | null> => {
    set({ isLoading: true, error: null, deleteReservationResponse: null })

    try {
      const response = await reservationService.deleteReservation(payload)

      if (response && response.statusCode === 200) {
        set({
          deleteReservationResponse: response as unknown as DeleteReservationResponse,
          isLoading: false,
          error: null
        })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as ReservationError
        set({ isLoading: false, error: errorResponse, deleteReservationResponse: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as ReservationError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  }
}))
