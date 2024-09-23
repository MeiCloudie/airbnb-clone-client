import { create } from 'zustand'
import { roomService } from '@/services/room.service'
import { RoomPaginationPayload, RoomPaginationResponse, RoomError } from '@/types/room.type'

interface RoomState {
  isLoading: boolean
  error: RoomError | null
  data: RoomPaginationResponse | null
  getRoomPagination: (payload: RoomPaginationPayload) => Promise<void>
}

export const useRoomStore = create<RoomState>((set) => ({
  isLoading: false,
  error: null,
  data: null,

  getRoomPagination: async (payload: RoomPaginationPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await roomService.roomPagination(payload)

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
  }
}))
