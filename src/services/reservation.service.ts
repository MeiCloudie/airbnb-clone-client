import { ReservationError, ReservationPayload, ReservationResponse } from '@/types/reservation.type'
import { http } from './http.service'
import axios from 'axios'

export const reservationService = {
  postReservation: async (data: ReservationPayload) => {
    try {
      const response = await http.post<ReservationResponse>(`/dat-phong`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as ReservationError
        }
      }
      throw error
    }
  }
}
