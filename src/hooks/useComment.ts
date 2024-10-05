import { useCommentStore } from '@/store/commentStore'

export const useComment = () => {
  const { isLoading, dataCommentByRoomId, error, getCommentByRoomId } = useCommentStore((state) => ({
    isLoading: state.isLoading,
    dataCommentByRoomId: state.dataCommentByRoomId,
    error: state.error,
    getCommentByRoomId: state.getCommentByRoomId
  }))

  return {
    isLoading,
    dataCommentByRoomId,
    error,
    getCommentByRoomId
  }
}
