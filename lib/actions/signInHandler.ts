"use server"

import { signIn } from "auth"
import { DefaultRedirectRoute } from "@/routes"
import { AuthError } from "next-auth"
interface SignInValues {
  email: string
  password: string
}

export const SignInHandler = async (values: SignInValues) => {
  let validData = true
  const { email, password } = values
  if (!email || !password) { validData = false }

  if (!validData) { return { error: "Please fill in all fields" } }

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
    await signIn('github', {
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