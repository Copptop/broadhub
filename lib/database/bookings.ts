'use server'

import { prismaInstance } from "@/lib/prisma";
import { currentUser } from "../hooks/server/use-current-user";

function formattedDateTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const newDateTime = new Date(date!.toISOString());
  newDateTime.setHours(hours + 1, minutes, 0, 0);
  const formattedDateTime = newDateTime.toISOString();
  return formattedDateTime;
}

export const getUsersUpcomingBookings = async () => {
  const user = await currentUser()
  if (!user) return null
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
  if (!user) return null
  try {
    const upcomingBookings = await prismaInstance.$queryRaw`
      SELECT "Booking"."id" as "id", "Resource"."name" as "resource", "Resource"."type" as "resourceType","Booking"."start" as "startDatetime","Booking"."end" as "endDatetime", "Location"."name" as "location", "Resource"."floor" as "floor"
      FROM "Booking" 
      join "Resource" on "Booking"."resourceID" = "Resource"."id"
      join "Location" on "Resource"."locationID" = "Location"."id"
      WHERE "userID" = ${user.id}
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
  if (!user) return null
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

export const createBooking = async (resourceName: string, location: string, date: Date, start: string, end: string) => {
  const startDT = formattedDateTime(date, start)
  const endDT = formattedDateTime(date, end)

  const user = await currentUser()
  if (!user) return null
  try {
    const resource = JSON.parse(JSON.stringify(await prismaInstance.$queryRaw`
    SELECT "Resource"."id"
    FROM "Resource"
    join "Location" on "Resource"."locationID" = "Location"."id"
    WHERE "Location"."name" = ${location} and "Resource"."name" = ${resourceName}
    `))[0]

    if (!resource) return null

    console.log(startDT, endDT)

    const existingBookings = await prismaInstance.booking.findMany({
      where: {
        resourceID: resource.id,
        AND: [{ start: { lt: endDT } }, { end: { gt: startDT } }]
      }
    });

    console.log(existingBookings)

    if (existingBookings.length > 0) {
      return { error: "Booking conflict" }
    }

    await prismaInstance.booking.create({
      data: {
        userID: user.id!,
        resourceID: resource.id,
        start: startDT,
        end: endDT,
        lastModifed: new Date()
      }
    })
  } catch (error) {
    return null
  }
}

export const deleteBooking = async (id: string) => {
  const user = await currentUser()
  if (!user || id === '') return null
  try {
    await prismaInstance.booking.delete({
      where: {
        id: id,
        userID: user.id
      }
    })
    return
  } catch (error) {
    return null
  }
}

export const getAllBookingsGoingForward = async (locationName: string) => {
  const user = await currentUser()
  if (!user) return null
  try {
    const booking = await prismaInstance.$queryRaw`
    SELECT 
    "Booking"."id" as "id", "Booking"."start" as "startDateTime" ,"Booking"."end" as "endDateTime" ,"Resource"."name" as "resource",  "Resource"."type" as "resourceType", "Location"."name" as "location"
    FROM "Booking"
    join "Resource" on "Booking"."resourceID" = "Resource"."id"
    join "Location" on "Resource"."locationID" = "Location"."id"
    join "User" on "Booking"."userID" = "User"."id"
    WHERE ("start" >= NOW() or "end" >= NOW()) and ("start" <= NOW() + interval '3 month' or "end" <= NOW() + interval '3 month') and "Location"."name" = ${locationName}
    ORDER BY "start" ASC
    `
    return booking
  } catch (error) {
    return null
  }
}

export const getFavorites = async (locationName: string) => {
  const user = await currentUser()
  if (!user) return null
  try {
    const favorites = prismaInstance.$queryRaw`
    SELECT "Favorite"."id", "Resource"."name" as "resource", "Resource"."type" as "resourceType", "Location"."name" as "location" 
    FROM "Favorite"
    join "Resource" on "Favorite"."resourceID" = "Resource"."id"
    join "Location" on "Resource"."locationID" = "Location"."id"
    WHERE ("userID" = ${user?.id}) and ("Location"."name" = ${locationName})
    `
    return favorites
  } catch (error) {
    return null

  }
}

export const addFavorite = async (resourceName: string, location: string) => {
  const user = await currentUser()
  if (!user) return null
  try {
    const resource = JSON.parse(JSON.stringify(await prismaInstance.$queryRaw`
    SELECT "Resource"."id"
    FROM "Resource"
    join "Location" on "Resource"."locationID" = "Location"."id"
    WHERE "Location"."name" = ${location} and "Resource"."name" = ${resourceName}
    `))[0]

    if (!resource) return null

    await prismaInstance.favorite.create({
      data: {
        userID: user!.id!,
        resourceID: resource.id
      }
    })
  } catch (error) {
    return null
  }
}

export const removeFavorite = async (resourceName: string, location: string) => {
  const user = await currentUser()
  if (!user) return null
  try {
    const resource = JSON.parse(JSON.stringify(await prismaInstance.$queryRaw`
    SELECT "Resource"."id"
    FROM "Resource"
    join "Location" on "Resource"."locationID" = "Location"."id"
    WHERE "Location"."name" = ${location} and "Resource"."name" = ${resourceName}
    `))[0]

    if (!resource) return null

    const _favorite = await prismaInstance.favorite.findFirst({
      where: {
        userID: user!.id,
        resourceID: resource.id
      }
    })
    if (!_favorite) return null

    await prismaInstance.favorite.delete({
      where: {
        id: _favorite!.id
      }
    })
  } catch (error) {
    return null
  }
}