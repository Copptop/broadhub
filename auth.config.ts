export const runtime = 'node'
import Okta from "next-auth/providers/okta"
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { getUserViaEmail } from "./lib/database/users"

import bcrypt from "bcryptjs"
interface SignInValues {
  email: string
  password: string
}

export default {
  providers: [
    Okta({ clientId: process.env.OKTA_CLIENT_ID, clientSecret: process.env.OKTA_CLIENT_SECRET, issuer: process.env.OKTA_CLIENT_ISSUER }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let validData = true
        const { email, password } = credentials
        if (!email || !password) { validData = false }
        if (!validData) return null

        const user = await getUserViaEmail(email as string)
        if (!user || !user.password) return null

        const passCheck = await bcrypt.compare(password as string, user.password)
        if (!passCheck) return null

        return user
      }
    })],
} satisfies NextAuthConfig