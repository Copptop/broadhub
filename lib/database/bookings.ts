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
      SELECT "Booking"."id" as "id", "Resource"."name" as "resource", "Resource"."type" as "resourceType","Booking"."start" as "startDatetime","Booking"."end" as "endDatetime", "Location"."name" as "location", "Resource"."floor" as "floor"
      FROM "Booking" 
      join "Resource" on "Booking"."resourceID" = "Resource"."id"
      join "Location" on "Resource"."locationID" = "Location"."id"
      WHERE "userID" = ${user?.id}
      AND "start" >= NOW() 
      ORDER BY "start" ASC
    `

    return JSON.parse(JSON.stringify(upcomingBookings))
  } catch (error) {
    return null
  }
}

export const getSpecificBooking = async (id: string) => {
  const user = await currentUser()
  if (currentUser() === null) return null
  try {
    const booking = await prismaInstance.$queryRaw`
      SELECT "Booking"."id" as "id", "User"."name" as "user", "Resource"."name" as "resource", "Resource"."type" as "resourceType","Booking"."start" as "startDatetime","Booking"."end" as "endDatetime", "Location"."name" as "location", "Resource"."floor" as "floor"
      FROM "Booking" 
      join "Resource" on "Booking"."resourceID" = "Resource"."id"
      join "Location" on "Resource"."locationID" = "Location"."id"
      join "User" on "Booking"."userID" = "User"."id"
      WHERE "userID" = ${user?.id}
      AND "Booking"."id" = ${id}
      limit 1
    ` as Array<any>
    return booking[0]
  } catch (error) {
    return null
  }
}

export const deleteBooking = async (id: string) => {
  const user = await currentUser()
  if (currentUser() === null || id === '') return null
  try {
    console.log(id)
    console.log(user?.id)
    const booking = await prismaInstance.booking.delete({
      where: {
        id: id,
        userID: user?.id
      }
    })
    return
  } catch (error) {
    return null
  }
}