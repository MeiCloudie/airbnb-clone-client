import { CommentByRoomIdPayload, CommentByRoomIdResponse, CommentError } from '@/types/comment.type'
import { http } from './http.service'
import axios from 'axios'

export const commentService = {
  getCommentByRoomId: async (data: CommentByRoomIdPayload) => {
    const { roomId } = data

    try {
      const response = await http.get<CommentByRoomIdResponse>(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return error.response.data as CommentError
        }
      }
      throw error
    }
  }
}
