import { PaginationResponse, PaginationPayload } from '@/types/pagination.type'

export interface Location {
  id: number
  tenViTri: string
  tinhThanh: string
  quocGia: string
  hinhAnh: string
}

export interface LocationResponse {
  statusCode: number
  content: Location[]
  dateTime: string
}

export interface LocationPaginationPayload extends PaginationPayload {}

export interface LocationPaginationResponse extends PaginationResponse<Location> {}

export interface LocationError {
  statusCode: number
  message: string
  content: string
  dateTime: string
}
