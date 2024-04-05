'use server'

import { prismaInstance } from "@/lib/prisma";
import { currentUser } from "../hooks/server/use-current-user";


export const getLocations_Region = async (region: 'NA' | 'NENA' | 'APAC' | 'UK') => {
  const user = await currentUser()
  if (!user) return null
  try {
    const locations = await prismaInstance.location.findMany({
      where: {
        region: region
      }
    })
    return JSON.parse(JSON.stringify(locations))
  } catch (error) {
    return null
  }
}
export const getAllLocations = async () => {
  const user = await currentUser()
  if (!user) return null
  try {
    const locations = await prismaInstance.location.findMany()
    return JSON.parse(JSON.stringify(locations))
  } catch (error) {
    return null
  }
}