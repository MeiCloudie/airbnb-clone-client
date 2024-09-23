import { useRoomStore } from '@/store/roomStore'

export const useRoom = () => {
  const { isLoading, data, error, getRoomPagination } = useRoomStore((state) => ({
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    getRoomPagination: state.getRoomPagination
  }))

  return {
    isLoading,
    data,
    error,
    getRoomPagination
  }
}
