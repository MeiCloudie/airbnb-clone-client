import {
  GetAllReservationsResponse,
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
  postReservation: (payload: ReservationPayload) => Promise<void>
  getReservationByUserId: (payload: ReservationByUserIdPayload) => Promise<void>
  getAllReservations: () => Promise<void>
}

export const useReservationStore = create<ReservationState>((set) => ({
  isLoading: false,
  error: null,
  response: null,
  reservationByUserId: null,
  allReservations: null,

  postReservation: async (payload: ReservationPayload) => {
    set({ isLoading: true, error: null, response: null })

    try {
      const response = await reservationService.postReservation(payload)
      if (response && response.statusCode === 201) {
        set({ response: response as ReservationResponse, isLoading: false, error: null })
      } else {
        set({ isLoading: false, error: response as ReservationError, response: null })
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
  }
}))
