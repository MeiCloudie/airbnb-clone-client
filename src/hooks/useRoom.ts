import { useRoomStore } from '@/store/roomStore'

export const useRoom = () => {
  const { isLoading, data, roomsByLocation, roomsById, error, getRoomPagination, getRoomByLocation, getRoomById } =
    useRoomStore((state) => ({
      isLoading: state.isLoading,
      data: state.data,
      roomsByLocation: state.roomsByLocation,
      roomsById: state.roomsById,
      error: state.error,
      getRoomPagination: state.getRoomPagination,
      getRoomByLocation: state.getRoomByLocation,
      getRoomById: state.getRoomById
    }))

  return {
    isLoading,
    data,
    roomsByLocation,
    roomsById,
    error,
    getRoomPagination,
    getRoomByLocation,
    getRoomById
  }
}
