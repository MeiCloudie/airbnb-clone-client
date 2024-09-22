export interface Pagination<T> {
  pageIndex: number
  pageSize: number
  totalRow: number
  keywords: string | null
  data: T[]
}

export interface PaginationResponse<T> {
  statusCode: number
  content: Pagination<T>
  dateTime: string
}

export interface PaginationPayload {
  pageIndex: number
  pageSize: number
  keywords: string | null
}
