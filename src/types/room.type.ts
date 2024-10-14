import { PaginationResponse, PaginationPayload } from '@/types/pagination.type'

export interface Room {
  id: number
  tenPhong: string
  khach: number
  giuong: number
  phongTam: number
  moTa: string
  giaTien: number
  mayGiat: boolean
  banLa: boolean
  tivi: boolean
  dieuHoa: boolean
  wifi: boolean
  bep: boolean
  doXe: boolean
  hoBoi: boolean
  banUi: boolean
  maViTri: number
  hinhAnh: string
}

export interface GetAllRoomsResponse {
  statusCode: number
  content: Room[]
  dateTime: string
}

export interface PostRoomPayload {
  tenPhong: string
  khach: number
  giuong: number
  phongTam: number
  moTa: string
  giaTien: number // đơn vị $/đêm
  mayGiat: boolean
  banLa: boolean
  tivi: boolean
  dieuHoa: boolean
  wifi: boolean
  bep: boolean
  doXe: boolean
  hoBoi: boolean
  banUi: boolean
  maViTri: number
  hinhAnh?: string | null
}

export interface PostRoomResponse {
  statusCode: number // 201 => Thêm Thành công
  message: string
  content: Room
  dateTime: string
}

export interface PutRoomPayload {
  id: number
  tenPhong: string
  khach: number
  giuong: number
  phongTam: number
  moTa: string
  giaTien: number // đơn vị $/đêm
  mayGiat: boolean
  banLa: boolean
  tivi: boolean
  dieuHoa: boolean
  wifi: boolean
  bep: boolean
  doXe: boolean
  hoBoi: boolean
  banUi: boolean
  maViTri: number
  hinhAnh?: string | null
}

export interface PutRoomResponse {
  statusCode: number // 200 - Thành Công
  content: Room
  dateTime: string
}

export interface DeleteRoomPayload {
  id: number
}

export interface DeleteRoomResponse {
  statusCode: number // 200 - Thành Công
  message: string
  content: Room | null
  dateTime: string
}

export interface RoomPaginationPayload extends PaginationPayload {}

export interface RoomPaginationResponse extends PaginationResponse<Room> {}

export interface RoomError {
  statusCode: number
  message: string
  content: string
  dateTime: string
}

export interface RoomByLocationPayload {
  maViTri: number
}

export interface RoomByLocationResponse {
  statusCode: number
  content: Room[]
  dateTime: string
}

export interface RoomByIdPayload {
  id: number
}

export interface RoomByIdResponse {
  statusCode: number
  content: Room
  dateTime: string
}
