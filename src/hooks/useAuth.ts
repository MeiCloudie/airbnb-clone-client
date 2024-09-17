import { useAuthStore } from '@/store/authStore'

export const useAuth = () => {
  const { isLoading, error, signUp } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    signUp: state.signUp
  }))

  return {
    isLoading,
    error,
    signUp
  }
}
