export interface Reservation {
  id: number
  maPhong: number
  ngayDen: string
  ngayDi: string
  soLuongKhach: number
  maNguoiDung: number
}

export interface GetAllReservationsResponse {
  statusCode: number
  content: Reservation[]
  dateTime: string
}

export interface ReservationPayload {
  maPhong: number
  ngayDen: string
  ngayDi: string
  soLuongKhach: number
  maNguoiDung: number
}

export interface ReservationResponse {
  statusCode: number
  message: string
  content: Reservation
  dateTime: string
}

export interface PutReservationPayload {
  id: number // type number theo PUT api cung cấp
  maPhong: number
  ngayDen: string
  ngayDi: string
  soLuongKhach: number
  maNguoiDung: number
}

export interface PutReservationResponse {
  statusCode: number // 200 - Thành Công
  message: string
  content: Reservation
  dateTime: string
}

export interface ReservationByUserIdPayload {
  userId: string
}

export interface ReservationByUserIdResponse {
  statusCode: number
  content: Reservation[]
  dateTime: string
}

export interface ReservationError {
  statusCode: number
  message: string
  content: string
  dateTime: string
}
