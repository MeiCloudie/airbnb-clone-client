import { useLocationStore } from '@/store/locationStore'

export const useLocation = () => {
  const {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations,
    locationById,
    getLocationById,
    postLocationResponse,
    postLocation,
    putLocationResponse,
    putLocation,
    deleteLocationResponse,
    deleteLocation,
    postImageLocationResponse,
    postImageLocation
  } = useLocationStore((state) => ({
    isLoading: state.isLoading,
    dataLocationPagination: state.dataLocationPagination,
    dataAllLocations: state.dataAllLocations,
    error: state.error,
    getLocationPagination: state.getLocationPagination,
    getAllLocations: state.getAllLocations,
    locationById: state.locationById,
    getLocationById: state.getLocationById,
    postLocationResponse: state.postLocationResponse,
    postLocation: state.postLocation,
    putLocationResponse: state.putLocationResponse,
    putLocation: state.putLocation,
    deleteLocationResponse: state.deleteLocationResponse,
    deleteLocation: state.deleteLocation,
    postImageLocationResponse: state.postImageLocationResponse,
    postImageLocation: state.postImageLocation
  }))

  return {
    isLoading,
    dataLocationPagination,
    dataAllLocations,
    error,
    getLocationPagination,
    getAllLocations,
    locationById,
    getLocationById,
    postLocationResponse,
    postLocation,
    putLocationResponse,
    putLocation,
    deleteLocationResponse,
    deleteLocation,
    postImageLocationResponse,
    postImageLocation
  }
}
