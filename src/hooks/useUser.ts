import { useUserStore } from '@/store/userStore'

export const useUser = () => {
  const { isLoading, userById, error, getUserById } = useUserStore((state) => ({
    isLoading: state.isLoading,
    userById: state.userById,
    error: state.error,
    getUserById: state.getUserById
  }))

  return {
    isLoading,
    userById,
    error,
    getUserById
  }
}
