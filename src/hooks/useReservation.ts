import { useReservationStore } from '@/store/reservationStore'

export const useReservation = () => {
  const {
    isLoading,
    error,
    response,
    reservationByUserId,
    postReservation,
    getReservationByUserId,
    allReservations,
    getAllReservations
  } = useReservationStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    response: state.response,
    reservationByUserId: state.reservationByUserId,
    postReservation: state.postReservation,
    getReservationByUserId: state.getReservationByUserId,
    allReservations: state.allReservations,
    getAllReservations: state.getAllReservations
  }))

  return {
    isLoading,
    error,
    response,
    reservationByUserId,
    postReservation,
    getReservationByUserId,
    allReservations,
    getAllReservations
  }
}
