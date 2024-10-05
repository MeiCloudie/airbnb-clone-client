export interface Comment {
  id: number
  maPhong: number
  maNguoiBinhLuan: number
  ngayBinhLuan: string
  noiDung: string
  saoBinhLuan: number
}

export interface CommentByRoomId {
  id: number
  ngayBinhLuan: string
  noiDung: string
  saoBinhLuan: number
  tenNguoiBinhLuan: string
  avatar: string
}

export interface CommentByRoomIdPayload {
  roomId: string
}

export interface CommentByRoomIdResponse {
  statusCode: number
  content: CommentByRoomId[]
  dateTime: string
}

export interface CommentError {
  statusCode: number
  message: string
  content: string
  dateTime: string
}
