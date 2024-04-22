'use server'

import { signOut } from "auth"

// Function to sign out the user
export const SignOutHandler = async () => {
  await signOut()
}
