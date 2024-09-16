import { http } from './http.service'
import { SignInPayload, SignUpPayload, SignInResponse, SignUpResponse } from '@/types/auth.type'

export const authService = {
  signIn: (data: SignInPayload) => {
    return http.post<SignInResponse>('/auth/signin', data)
  },
  signUp: (data: SignUpPayload) => {
    return http.post<SignUpResponse>('/auth/signup', data)
  }
}
