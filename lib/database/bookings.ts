'use server'

import { prismaInstance } from "@/lib/prisma";
import { currentUser } from "../hooks/server/use-current-user";

export const getUsersUpcomingBookings = async () => {
  const user = await currentUser()
  if (currentUser() === null) return null
  try {
    const upcomingBookings = await prismaInstance.$queryRaw`
      SELECT "Booking"."id" as "id", "Resource"."name" as "resource", "Resource"."type" as "resourceType","Booking"."start" as "datetime"
      FROM "Booking" 
      join "Resource" on "Booking"."resourceID" = "Resource"."id"
      WHERE "userID" = ${user?.id}
      AND "start" >= NOW() 
      ORDER BY "start" ASC
      limit 4
    `
    return JSON.parse(JSON.stringify(upcomingBookings))

  } catch (error) {
    return null
  }
}

export const getUsersBookings = async () => {
  const user = await currentUser()
  if (currentUser() === null) return null
  try {
    const upcomingBookings = await prismaInstance.$queryRaw`
      SELECT "Booking"."id" as "id", "Resource"."name" as "resource", "Resource"."type" as "resourceType","Booking"."start" as "startDatetime","Booking"."end" as "endDatetime", "Location"."name" as "location"
      FROM "Booking" 
      join "Resource" on "Booking"."resourceID" = "Resource"."id"
      join "Location" on "Resource"."locationID" = "Location"."id"
      WHERE "userID" = ${user?.id}
      AND "start" >= NOW() 
      ORDER BY "start" ASC
    `
    console.log(upcomingBookings)
    return JSON.parse(JSON.stringify(upcomingBookings))
  } catch (error) {
    return null
  }
}