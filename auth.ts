import NextAuth, { type DefaultSession } from "next-auth"
import { prismaInstance } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"

import { UserRole } from "@prisma/client"

import { getUser_ID } from "@/lib/database/users"

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
  adapter: PrismaAdapter(prismaInstance),
  session: { strategy: "jwt", maxAge: 1 * 60 * 60 },
  events: {
    linkAccount: async ({ user }) => {
      await prismaInstance.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      const exisitingUser = await getUser_ID(user.id as string)
      if (!exisitingUser?.emailVerified) return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub
      if (token.role && session.user) session.user.role = token.role as UserRole
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUser_ID(token.sub)
      if (!user) return token

      token.role = user.role
      return token
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signin",
    newUser: "/auth/signup",
    error: "/auth/error",
  },
  ...authConfig,
})