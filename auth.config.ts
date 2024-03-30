export const runtime = 'node'
import Okta from "next-auth/providers/okta"
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { getUser_Email } from "./lib/database/users"

import bcrypt from "bcryptjs"
interface SignInValues {
  email: string
  password: string
}

export default {
  providers: [
    Okta({ clientId: process.env.AUTH_OKTA_ID, clientSecret: process.env.AUTH_OKTA_SECRET, issuer: process.env.AUTH_OKTA_ISSUER }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
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

        const user = await getUser_Email(email as string)
        if (!user || !user.password) return null

        const passCheck = await bcrypt.compare(password as string, user.password)
        if (!passCheck) return null

        return user
      }
    })],
} satisfies NextAuthConfig