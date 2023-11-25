import NextAuth from 'next-auth'
import type { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const jwtSecret = process.env.NEXT_PUBLIC_MY_JWT_SECRET

        if (!jwtSecret) {
          throw new Error('MY_JWT_SECRET is not defined')
        }

        const jwtClaims = {
          sub: user.id,
          name: user.name,
          email: user.email,
        }
        const myToken = jwt.sign(jwtClaims, jwtSecret, {
          algorithm: 'HS256',
          expiresIn: '365d',
        })

        token.access_token = myToken
      }
      return { ...token }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
    async redirect() {
      return '/signup'
    },
  },
}

// idとloginが型宣言されていないので、型宣言を追加する
declare module 'next-auth' {
  interface Session {
    user: {
      access_token?: string
      sub?: string
    } & DefaultSession['user']
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string
  }
}

export default NextAuth(authOptions)
