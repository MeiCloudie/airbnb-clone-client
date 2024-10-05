import { useReservationStore } from '@/store/reservationStore'

export const useReservation = () => {
  const { isLoading, error, response, postReservation } = useReservationStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    response: state.response,
    postReservation: state.postReservation
  }))

  return {
    isLoading,
    error,
    response,
    postReservation
  }
}
