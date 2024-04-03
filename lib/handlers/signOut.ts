'use server'

import { signOut } from "auth"

export const SignOutHandler = async () => {
  await signOut()
}
