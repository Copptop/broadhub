'use server'

import { prismaInstance } from "@/lib/prisma";

export const getUser_Email = async (email: string) => {
  if (!email) return null
  try {
    return await prismaInstance.user.findUnique({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getUser_ID = async (id: string) => {
  if (!id) return null
  try {
    return await prismaInstance.user.findUnique({ where: { id } })
  } catch (error) {
    return null
  }
}