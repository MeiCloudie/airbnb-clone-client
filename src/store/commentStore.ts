import { create } from 'zustand'
import { CommentByRoomIdPayload, CommentByRoomIdResponse, CommentError } from '@/types/comment.type'
import { commentService } from '@/services/comment.service'

interface CommentState {
  isLoading: boolean
  error: CommentError | null
  dataCommentByRoomId: CommentByRoomIdResponse | null
  getCommentByRoomId: (payload: CommentByRoomIdPayload) => Promise<void>
}

export const useCommentStore = create<CommentState>((set) => ({
  isLoading: false,
  error: null,
  dataCommentByRoomId: null,

  getCommentByRoomId: async (payload: CommentByRoomIdPayload) => {
    set({ isLoading: true, error: null })

    try {
      const response = await commentService.getCommentByRoomId(payload)

      if (response && typeof response === 'object' && 'statusCode' in response && response.statusCode >= 400) {
        set({ isLoading: false, error: response as CommentError, dataCommentByRoomId: null })
      } else {
        set({ isLoading: false, dataCommentByRoomId: response as CommentByRoomIdResponse, error: null })
      }
    } catch (error) {
      set({
        isLoading: false,
        error: {
          statusCode: 500,
          message: 'Internal Server Error',
          content: 'Unknown error',
          dateTime: new Date().toISOString()
        } as CommentError
      })
    }
  }
}))
