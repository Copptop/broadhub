import NextAuth, { type DefaultSession } from "next-auth"
import { db } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"

import { UserRole } from "@prisma/client"

import { getUserViaId } from "@/lib/database/users"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub
      if (token.role && session.user) session.user.role = token.role as UserRole
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserViaId(token.sub)
      if (!user) return token

      token.role = user.role
      return token
    }
  },
  ...authConfig,
})