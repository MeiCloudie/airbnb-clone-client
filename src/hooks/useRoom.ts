import { useRoomStore } from '@/store/roomStore'

export const useRoom = () => {
  const { isLoading, data, roomsByLocation, error, getRoomPagination, getRoomByLocation } = useRoomStore((state) => ({
    isLoading: state.isLoading,
    data: state.data,
    roomsByLocation: state.roomsByLocation,
    error: state.error,
    getRoomPagination: state.getRoomPagination,
    getRoomByLocation: state.getRoomByLocation
  }))

  return {
    isLoading,
    data,
    roomsByLocation,
    error,
    getRoomPagination,
    getRoomByLocation
  }
}
