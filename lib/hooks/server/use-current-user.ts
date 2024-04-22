"use server"

import { auth } from "auth"

// Function to get the current user as per NextAuth specification for server side components
export const currentUser = async () => {
  const session = await auth()
  return session?.user
}

// Function to get the current user role as per NextAuth specification for server side components
export const currentRole = async () => {
  const session = await auth()
  return session?.user?.role
}