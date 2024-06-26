'use server'

import { prismaInstance } from "@/lib/prisma";

// Function to return the user from the provided email
export const getUser_Email = async (email: string) => {
  if (!email) return null
  try {
    return await prismaInstance.user.findUnique({ where: { email } })
  } catch (error) {
    return null
  }
}

// Function to return the user from the provided ID
export const getUser_ID = async (id: string) => {
  if (!id) return null
  try {
    return await prismaInstance.user.findUnique({ where: { id } })
  } catch (error) {
    return null
  }
}

// Function to return all the users
export const getUsers = async () => {
  try {
    const user = await prismaInstance.user.findMany()
    if (!user) return null

    const location = await prismaInstance.location.findMany()

    user.forEach((user) => {
      user.password = user.password ? "true" : "false"
      if (user.basedInID) {
        const loc = location.find((loc) => loc.id === user.basedInID)
        if (loc) user.basedInID = loc.name
      }
    })

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    return null
  }
}

// Function to return the specific user
export const getSpecificUser = async (id: string) => {
  if (!id) return null
  try {
    const user = await prismaInstance.user.findUnique({ where: { id } })

    const location = await prismaInstance.location.findMany()

    if (!user) return null
    user.password = user.password ? "true" : "false"
    if (user.basedInID) {
      const loc = location.find((loc) => loc.id === user.basedInID)
      if (loc) user.basedInID = loc.name
    }

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    return null
  }
}

// Function to delete a user
export const deleteUser = async (id: string) => {
  if (!id) return null
  try {
    return await prismaInstance.user.delete({ where: { id } })
  } catch (error) {
    return null
  }
}