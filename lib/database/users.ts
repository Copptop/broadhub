import { db } from "@/lib/prisma";

export const getUserViaEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } })
  } catch (error) {
    return null
  }
}

export const getUserViaId = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch (error) {
    return null
  }
}