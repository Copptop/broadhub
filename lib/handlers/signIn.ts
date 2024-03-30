"use server"

import { GenerateVT } from "@/lib/handlers/token"
import { DefaultRedirectRoute } from "@/routes"
import { signIn } from "auth"
import { AuthError } from "next-auth"
import { getUser_Email } from "../database/users"
import { sendVT } from "@/lib/handlers/email"

interface SignInValues {
  email: string
  password: string
}

export const SignInHandler = async (values: SignInValues) => {
  let validData = true
  const { email, password } = values
  if (!email || !password) { validData = false }

  if (!validData) { return { error: "Please fill in all fields" } }

  const emailVerfied = await getUser_Email(email)
  if (!emailVerfied || !emailVerfied.email || !emailVerfied.password) { return { error: "User does not exist" } }

  if (!emailVerfied.emailVerified) {
    const vt_user = await GenerateVT(email)
    await sendVT(vt_user.email, vt_user.token)

    return { success: "Email not verified. Confirmation email sent" }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: DefaultRedirectRoute })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": return { error: "Invalid credentials" }
        default: return { error: "An error occurred" }
      }
    }

    throw error
  }
}

export const SignInWithProviderHandler = async (provider: 'okta' | 'github' | 'azure') => {
  try {
    await signIn(provider, {
      callbackUrl: DefaultRedirectRoute
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": return { error: "Invalid credentials" }
        default: return { error: "An error occurred" }
      }
    }

    throw error
  }
}

