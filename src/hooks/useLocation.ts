import { useLocationStore } from '@/store/locationStore'

export const useLocation = () => {
  const { isLoading, dataLocationPagination, dataAllLocations, error, getLocationPagination, getAllLocations } =
    useLocationStore((state) => ({
      isLoading: state.isLoading,
      dataLocationPagination: state.dataLocationPagination,
      dataAllLocations: state.dataAllLocations,
      error: state.error,
      getLocationPagination: state.getLocationPagination,
      getAllLocations: state.getAllLocations
    }))

  return {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations
  }
}
