import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: { email: { label: "email", type: "text" }, password: { label: "Password", type: "password" } },
      async authorize(credentials) {
        const loginUser = await prisma.user.findUnique({ where: { email: credentials?.email } })

        if (loginUser && loginUser.password === credentials?.password) {
          return loginUser
        } else {
          throw new Error("Login failed, user not found or password incorrect.")
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
