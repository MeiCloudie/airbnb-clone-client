import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { SignInPayload, SignInResponse } from '@/types/auth.type'
import { JWT } from 'next-auth/jwt'
import { DefaultSession, Session, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'

const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'me@gmail.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<AdapterUser | null> {
        try {
          const payload: SignInPayload = {
            email: credentials?.email as string,
            password: credentials?.password as string
          }

          const response = await axios.post<SignInResponse>(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
            payload,
            {
              headers: {
                tokenCyberSoft: process.env.NEXT_PUBLIC_CYBERSOFT_TOKEN
              }
            }
          )

          const { user, token } = response.data.content

          if (user && token) {
            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
              role: user.role, // Bạn có thể thêm role nếu cần
              token: token // Thêm token vào AdapterUser
            } as AdapterUser // Trả về kiểu AdapterUser mở rộng
          }

          return null
        } catch (error) {
          console.error('Login failed', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({
      token,
      user
    }: {
      token: JWT
      user?: AdapterUser | User // Điều chỉnh kiểu của user
    }) {
      // Nếu user tồn tại, thêm thông tin user vào token
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = (user as AdapterUser).role // Thêm role vào token
        token.accessToken = (user as AdapterUser).token // Thêm token vào JWT
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // session.user và session.accessToken giờ đã tồn tại
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET
}

export default authConfig

// Mở rộng kiểu AdapterUser trong next-auth
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      email: string
      name?: string | null
      role?: string // Thêm thuộc tính role
    } & DefaultSession['user']
    accessToken?: string // Thêm thuộc tính accessToken
  }

  interface User {
    id?: string // Cho phép undefined để khớp với khai báo gốc
    role: string
    token: string
  }

  // Mở rộng AdapterUser để thêm role và token
  interface AdapterUser {
    role: string
    token: string
  }
}
