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
    getAllReservations,
    reservationById,
    getReservationById,
    putReservationResponse,
    putReservation,
    deleteReservationResponse,
    deleteReservation
  } = useReservationStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    response: state.response,
    reservationByUserId: state.reservationByUserId,
    postReservation: state.postReservation,
    getReservationByUserId: state.getReservationByUserId,
    allReservations: state.allReservations,
    getAllReservations: state.getAllReservations,
    reservationById: state.reservationById,
    getReservationById: state.getReservationById,
    putReservationResponse: state.putReservationResponse,
    putReservation: state.putReservation,
    deleteReservationResponse: state.deleteReservationResponse,
    deleteReservation: state.deleteReservation
  }))

  return {
    isLoading,
    error,
    response,
    reservationByUserId,
    postReservation,
    getReservationByUserId,
    allReservations,
    getAllReservations,
    reservationById,
    getReservationById,
    putReservationResponse,
    putReservation,
    deleteReservationResponse,
    deleteReservation
  }
}
