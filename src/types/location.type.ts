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

export interface PostLocationPayload {
  tenViTri: string
  tinhThanh: string
  quocGia: string
  hinhAnh?: string | null
}

export interface PostLocationResponse {
  statusCode: number // 201 => Thêm Thành công
  message: string
  content: Location
  dateTime: string
}

export interface PutLocationPayload {
  id: number
  tenViTri: string
  tinhThanh: string
  quocGia: string
  hinhAnh?: string
}

export interface PutLocationResponse {
  statusCode: number // 200 - Thành Công
  content: Location
  dateTime: string
}

export interface DeleteLocationPayload {
  id: number
}

export interface DeleteLocationResponse {
  statusCode: number // 200 - Thành Công
  message: string
  content: Location | null
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
