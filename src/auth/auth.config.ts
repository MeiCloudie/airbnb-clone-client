import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { SignInPayload, SignInResponse } from '@/types/auth.type'
import { JWT } from 'next-auth/jwt'
import { DefaultSession, Session, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import NextAuth from 'next-auth'

export const { auth, handlers, signOut, signIn } = NextAuth({
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
              role: user.role,
              token: token
            } as AdapterUser
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
    async jwt({ token, user }: { token: JWT; user?: AdapterUser | User }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = (user as AdapterUser).role
        token.accessToken = (user as AdapterUser).token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        session.accessToken = token.accessToken as string
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in'
  }
})

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      email: string
      name?: string | null
      role?: string
    } & DefaultSession['user']
    accessToken?: string
  }

  interface User {
    id?: string
    role: string
    token: string
  }

  interface AdapterUser {
    role: string
    token: string
  }
}
