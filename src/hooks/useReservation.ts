import { useReservationStore } from '@/store/reservationStore'

export const useReservation = () => {
  const { isLoading, error, response, reservationByUserId, postReservation, getReservationByUserId } =
    useReservationStore((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      response: state.response,
      reservationByUserId: state.reservationByUserId,
      postReservation: state.postReservation,
      getReservationByUserId: state.getReservationByUserId
    }))

  return {
    isLoading,
    error,
    response,
    reservationByUserId,
    postReservation,
    getReservationByUserId
  }
}
