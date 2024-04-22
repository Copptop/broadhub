export const runtime = 'node'
import Okta from "next-auth/providers/okta"
import Credentials from "next-auth/providers/credentials"

import type { NextAuthConfig } from "next-auth"
import { getUser_Email } from "./lib/database/users"

import bcrypt from "bcryptjs"

export default {
  providers: [
    Okta({ clientId: process.env.AUTH_OKTA_ID, clientSecret: process.env.AUTH_OKTA_SECRET, issuer: process.env.AUTH_OKTA_ISSUER }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Checks if the email and password are empty
        let validData = true
        const { email, password } = credentials
        if (!email || !password) { validData = false }
        if (!validData) return null

        // Checks if the user exists
        const user = await getUser_Email(email as string)
        if (!user || !user.password) return null

        // Checks if the password is correct
        const passCheck = await bcrypt.compare(password as string, user.password)
        if (!passCheck) return null

        // returns user instance to be stored in session
        return user
      }
    })],
} satisfies NextAuthConfig