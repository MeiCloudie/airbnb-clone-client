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
    postLocation,
    putLocationResponse,
    putLocation
  } = useLocationStore((state) => ({
    isLoading: state.isLoading,
    dataLocationPagination: state.dataLocationPagination,
    dataAllLocations: state.dataAllLocations,
    error: state.error,
    getLocationPagination: state.getLocationPagination,
    getAllLocations: state.getAllLocations,
    postLocationResponse: state.postLocationResponse,
    postLocation: state.postLocation,
    putLocationResponse: state.putLocationResponse,
    putLocation: state.putLocation
  }))

  return {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations,
    postLocationResponse,
    postLocation,
    putLocationResponse,
    putLocation
  }
}
