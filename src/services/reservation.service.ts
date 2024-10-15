import {
  DeleteReservationPayload,
  GetAllReservationsResponse,
  PutReservationPayload,
  PutReservationResponse,
  ReservationByIdPayload,
  ReservationByIdResponse,
  ReservationByUserIdPayload,
  ReservationByUserIdResponse
} from './../types/reservation.type'
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
  },

  getReservationByUserId: async (data: ReservationByUserIdPayload) => {
    const { userId } = data
    try {
      const response = await http.get<ReservationByUserIdResponse>(`/dat-phong/lay-theo-nguoi-dung/${userId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as ReservationError
        }
      }
      throw error
    }
  },

  getAllReservations: async () => {
    try {
      const response = await http.get<GetAllReservationsResponse>(`/dat-phong`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as ReservationError
        }
      }
      throw error
    }
  },

  getReservationById: async (data: ReservationByIdPayload) => {
    const { id } = data

    try {
      const response = await http.get<ReservationByIdResponse>(`/dat-phong/${id}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as ReservationError
        }
      }
      throw error
    }
  },

  putReservation: async (data: PutReservationPayload) => {
    const { id } = data

    try {
      const response = await http.put<PutReservationResponse>(`/dat-phong/${id}`, data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as ReservationError
        }
      }
      throw error
    }
  },

  deleteReservation: async (data: DeleteReservationPayload) => {
    const { id } = data

    try {
      const response = await http.delete<ReservationError>(`/dat-phong/${id}`)
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
