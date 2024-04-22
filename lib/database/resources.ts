'use server'

import { prismaInstance } from "@/lib/prisma";
import { currentUser } from "@/lib/hooks/server/use-current-user";

// Function to get the resources by location and floor
export const getResources = async (location: string, floor: number) => {
  const user = await currentUser();
  if (!user) return null;
  try {
    const resources = await prismaInstance.resource.findMany({
      where: {
        location: {
          name: location
        },
        floor: floor
      }
    });

    if (!resources) return null;

    const filteredResources = resources.filter(resource => {
      if (resource.restrictedRoles.length !== 0) {
        if (resource.restrictedRoles.includes(user.role)) {
          return true;
        }
        return false;
      }
      return true;
    })

    let importantBookings = []

    for (const resource of filteredResources) {
      const booking = await prismaInstance.booking.findMany({
        where: {
          resourceID: resource.id,
        }
      });
      if (booking.length > 0) { importantBookings.push(booking); }
    }
    return [filteredResources, importantBookings];
  } catch (error) {
    return null;
  }
};

// Function to get the restricted resources by location and floor
export const getRestrictedResources = async (location: string, floor: number) => {
  const user = await currentUser();
  if (!user) return null;
  try {
    const resources = await prismaInstance.resource.findMany({
      where: {
        location: {
          name: location
        },
        floor: floor
      }
    });

    if (!resources) return null;

    const filteredResources = resources.filter(resource => {
      if (user.role == "ADMIN") return false;
      if (resource.restrictedRoles.length > 0) {
        if (resource.restrictedRoles.includes(user.role)) {
          return false;
        }
        return true;
      }
      return false;
    }).map(resource => {
      return {
        name: resource.name,
      }
    });

    return filteredResources;
  } catch (error) {
    return null;
  }
}

// Function to get the bookings by location and floor
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

// Function to add a favorite
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

// Function to remove a favorite
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