import { create } from 'zustand'
import { roomService } from '@/services/room.service'
import {
  RoomPaginationPayload,
  RoomPaginationResponse,
  RoomError,
  RoomByLocationPayload,
  RoomByLocationResponse,
  RoomByIdResponse,
  RoomByIdPayload,
  GetAllRoomsResponse,
  PostRoomResponse,
  PostRoomPayload
} from '@/types/room.type'

interface RoomState {
  isLoading: boolean
  error: RoomError | null
  data: RoomPaginationResponse | null
  roomsByLocation: RoomByLocationResponse | null
  roomsById: RoomByIdResponse | null
  allRooms: GetAllRoomsResponse | null
  getRoomPagination: (payload: RoomPaginationPayload) => Promise<void>
  getRoomByLocation: (payload: RoomByLocationPayload) => Promise<void>
  getRoomById: (payload: RoomByIdPayload) => Promise<void>
  getAllRooms: () => Promise<void>
  postRoomResponse: PostRoomResponse | null
  postRoom: (payload: PostRoomPayload) => Promise<RoomError | null>
}

export const useRoomStore = create<RoomState>((set) => ({
  isLoading: false,
  error: null,
  data: null,
  roomsByLocation: null,
  roomsById: null,
  allRooms: null,
  postRoomResponse: null,

  getRoomPagination: async (payload: RoomPaginationPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await roomService.getRoomPagination(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as RoomError, data: null })
      } else {
        set({ isLoading: false, data: response as RoomPaginationResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as RoomError
      })
    }
  },

  getRoomByLocation: async (payload: RoomByLocationPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await roomService.getRoomByLocation(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as RoomError, roomsByLocation: null })
      } else {
        set({ isLoading: false, roomsByLocation: response as RoomByLocationResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as RoomError
      })
    }
  },

  getRoomById: async (payload: RoomByIdPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await roomService.getRoomById(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as RoomError, roomsById: null })
      } else {
        set({ isLoading: false, roomsById: response as RoomByIdResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as RoomError
      })
    }
  },

  getAllRooms: async () => {
    set({ isLoading: true, error: null })

    try {
      const response = await roomService.getAllRooms()

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as RoomError, allRooms: null })
      } else {
        set({ isLoading: false, allRooms: response as GetAllRoomsResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as RoomError
      })
    }
  },

  postRoom: async (payload: PostRoomPayload): Promise<RoomError | null> => {
    set({ isLoading: true, error: null, postRoomResponse: null })

    try {
      const response = await roomService.postRoom(payload)

      if (response && response.statusCode === 201) {
        set({ postRoomResponse: response as PostRoomResponse, isLoading: false, error: null })
        return null // Trả về null khi thành công
      } else {
        const errorResponse = response as RoomError
        set({ isLoading: false, error: errorResponse, postRoomResponse: null })
        return errorResponse // Trả về lỗi
      }
    } catch (error) {
      const unknownError = {
        statusCode: 500,
        message: 'Internal Server Error',
        content: 'Unknown error',
        dateTime: new Date().toISOString()
      } as RoomError
      set({ isLoading: false, error: unknownError })
      return unknownError // Trả về lỗi khi có exception
    }
  }
}))
