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

export const SignInHandler = async (values: SignInValues, callbackUrl?: string) => {
  let validData = true
  const { email, password } = values // Unpacks the values
  if (!email || !password) { validData = false }   // Checks if the email and password are empty

  if (!validData) { return { error: "Please fill in all fields" } } // Returns an error if the email or password are empty

  // Checks for a user with the email passed in and handels the state of the user
  const emailVerfied = await getUser_Email(email)
  if (!emailVerfied || !emailVerfied.email || !emailVerfied.password) { return { error: "User does not exist" } }
  // ^^ checks that the user exists and has an email and password (filters out OAuth users )

  // Checks if the email is verified and sends a verification token if it is not
  if (!emailVerfied.emailVerified) {
    // Generates a verification token and sends it to the user
    const vt_user = await GenerateVT(email)
    await sendVT(vt_user.email, vt_user.token)

    return { success: "Email not verified. Confirmation email sent" }
  }

  try {
    // Attempts to sign in the user with the email and password
    await signIn("credentials", { email, password, redirectTo: callbackUrl || DefaultRedirectRoute })
  } catch (error) {
    if (error instanceof AuthError) {
      // Handles the error if the error is a CredentialsSignin error
      switch (error.type) {
        case "CredentialsSignin": return { error: "Invalid credentials" }
        default: return { error: "An error occurred" }
      }
    }
    throw error
  }
}

// Function to handle the sign in with a provider
export const SignInWithProviderHandler = async (provider: 'okta' | 'azure', callbackUrl?: string) => {
  try {
    // Attempts to sign in the user with the provider provided
    await signIn(provider, {
      callbackUrl: callbackUrl || DefaultRedirectRoute
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

