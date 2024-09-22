import { useLocationStore } from '@/store/locationStore'

export const useLocation = () => {
  const { isLoading, data, error, getLocationPagination } = useLocationStore((state) => ({
    isLoading: state.isLoading,
    data: state.data,
    error: state.error,
    getLocationPagination: state.getLocationPagination
  }))

  return {
    isLoading,
    data,
    error,
    getLocationPagination
  }
}
