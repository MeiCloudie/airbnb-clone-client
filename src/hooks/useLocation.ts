import { useLocationStore } from '@/store/locationStore'

export const useLocation = () => {
  const {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations,
    postLocationResponse,
    postLocation
  } = useLocationStore((state) => ({
    isLoading: state.isLoading,
    dataLocationPagination: state.dataLocationPagination,
    dataAllLocations: state.dataAllLocations,
    error: state.error,
    getLocationPagination: state.getLocationPagination,
    getAllLocations: state.getAllLocations,
    postLocationResponse: state.postLocationResponse,
    postLocation: state.postLocation
  }))

  return {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations,
    postLocationResponse,
    postLocation
  }
}
