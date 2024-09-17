import { useAuthStore } from '@/store/authStore'

export const useAuth = () => {
  const { isLoading, error, signUp, signIn } = useAuthStore((state) => ({
    isLoading: state.isLoading,
    error: state.error,
    signUp: state.signUp,
    signIn: state.signIn
  }))

  return {
    isLoading,
    error,
    signUp,
    signIn
  }
}
