'use server'

import { signOut } from "auth"

export const SignOutHandler = async () => {

  console.log("signing out - Sever side")
  await signOut()
}
