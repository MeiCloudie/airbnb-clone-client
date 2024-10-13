import { useUserStore } from '@/store/userStore'

export const useUser = () => {
  const {
    isLoading,
    userById,
    error,
    getUserById,
    allUsers,
    getAllUsers,
    postUserResponse,
    postUser,
    putUserResponse,
    putUser
  } = useUserStore((state) => ({
    isLoading: state.isLoading,
    userById: state.userById,
    error: state.error,
    getUserById: state.getUserById,
    allUsers: state.allUsers,
    getAllUsers: state.getAllUsers,
    postUserResponse: state.postUserResponse,
    postUser: state.postUser,
    putUserResponse: state.putUserResponse,
    putUser: state.putUser
  }))

  return {
    isLoading,
    userById,
    error,
    getUserById,
    allUsers,
    getAllUsers,
    postUserResponse,
    postUser,
    putUserResponse,
    putUser
  }
}
