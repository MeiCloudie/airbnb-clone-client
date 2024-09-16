// Request payload cho đăng ký (sign up)
export interface SignUpPayload {
  email: string
  password: string
  // Bạn có thể thêm các field khác nếu cần như name, phone, etc.
}

// Request payload cho đăng nhập (sign in)
export interface SignInPayload {
  email: string
  password: string
}

// User được trả về từ API sau khi đăng nhập hoặc đăng ký
export interface User {
  id: string
  name: string | null
  email: string
  password: string // Thông thường bạn sẽ không trả về password, nhưng theo response ở ví dụ của bạn
  phone?: string | null
  birthday?: string | null
  avatar?: string | null
  gender: boolean
  role: string
}

export interface UserWithToken extends User {
  token: string
}

// Response từ API sau khi đăng nhập (signin)
export interface SignInResponse {
  statusCode: number
  content: {
    user: User
    token: string
  }
  dateTime: string
}

// Response từ API sau khi đăng ký (signup)
export interface SignUpResponse {
  statusCode: number
  content: User
  dateTime: string
}
