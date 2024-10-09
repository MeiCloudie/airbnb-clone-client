import { useRoomStore } from '@/store/roomStore'

export const useRoom = () => {
  const {
    isLoading,
    data,
    roomsByLocation,
    roomsById,
    error,
    getRoomPagination,
    getRoomByLocation,
    getRoomById,
    allRooms,
    getAllRooms
  } = useRoomStore((state) => ({
    isLoading: state.isLoading,
    data: state.data,
    roomsByLocation: state.roomsByLocation,
    roomsById: state.roomsById,
    error: state.error,
    getRoomPagination: state.getRoomPagination,
    getRoomByLocation: state.getRoomByLocation,
    getRoomById: state.getRoomById,
    allRooms: state.allRooms,
    getAllRooms: state.getAllRooms
  }))

  return {
    isLoading,
    data,
    roomsByLocation,
    roomsById,
    error,
    getRoomPagination,
    getRoomByLocation,
    getRoomById,
    allRooms,
    getAllRooms
  }
}
