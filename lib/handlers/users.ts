"use server"

import { prismaInstance } from '@/lib/prisma'
import { currentUser } from '@/lib/hooks/server/use-current-user'

export const changeUserInformation = async (id: string, name: string, email: string, role: string, officeLocation: string) => {
  const user = currentUser()
  if (!user) return { error: "Not Authenticated to perform this action" }
  if (!id || !name || !email || !role || !officeLocation) return { errror: "Missing required fields" }
  try {

    const location = await prismaInstance.location.findFirst({
      where: {
        name: officeLocation
      }
    })

    if (!location) return { error: "Invalid office location" }

    await prismaInstance.user.update({
      where: {
        id: id
      },
      data: {
        name: name,
        email: email,
        role: role as 'USER' || 'ADMIN' || 'MANAGER' || 'HR' || 'IT',
        basedInID: location.id
      }
    })
    return { success: "User information updated" }
  } catch (error) {
    return { error: "Failed to update user information" }
  }
}

export const updateUserImage = async (id: string, image: string) => {
  const user = currentUser()
  if (!user || id === '') return { error: "Not Authenticated to perform this action" }
  try {
    await prismaInstance.user.update({
      where: {
        id: id
      },
      data: {
        image: image
      }
    })
    return { success: "Profile picture updated" }
  } catch (error) {
    return { error: "Failed to update profile picture" }
  }
}