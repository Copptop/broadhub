'use server'

import { prismaInstance } from "@/lib/prisma";
import { addDays, addMonths, format, parse, startOfToday } from "date-fns";
import { currentUser } from "../hooks/server/use-current-user";

// Function to get the statistics
export const getStatistics = async (id: string) => {
  const firstdayCurrentMonth = parse(format(startOfToday(), 'MMM yyyy'), 'MMM yyyy', new Date());
  const firstDayPreviousMonth = addMonths(firstdayCurrentMonth, -1)

  const user = await prismaInstance.user.findFirst({
    include: {
      Company: {
        select: {
          id: true
        }
      }
    },
    where: {
      id
    }
  })

  const numberOfBookings = (await prismaInstance.$queryRaw`
  select "Booking"."id"
  from "Booking"
  join "Resource" on "Booking"."resourceID" = "Resource"."id"
  join "Location" on "Resource"."locationID" = "Location"."id"
  where "Location"."companyID" = ${user?.Company?.id}` as any[]).length || 0

  const numberOfBookingsInLastMonth = (await prismaInstance.$queryRaw`
  select "Booking"."id"
  from "Booking"
  join "Resource" on "Booking"."resourceID" = "Resource"."id"
  join "Location" on "Resource"."locationID" = "Location"."id"
  where "Location"."companyID" = ${user?.Company?.id}
  and "Booking"."start" >= ${firstDayPreviousMonth}
  and "Booking"."start" < ${firstdayCurrentMonth}` as any[]).length || 1

  const numberOfBookingsInCurrentMonth = (await prismaInstance.$queryRaw`
  select "Booking"."id"
  from "Booking"
  join "Resource" on "Booking"."resourceID" = "Resource"."id"
  join "Location" on "Resource"."locationID" = "Location"."id"
  where "Location"."companyID" = ${user?.Company?.id}
  and "Booking"."start" >= ${firstdayCurrentMonth}` as any[]).length || 1

  const bookingsComparedToLastMonth = ((numberOfBookingsInCurrentMonth - numberOfBookingsInLastMonth) / numberOfBookingsInLastMonth) * 100

  const numberOfUsersLocally = (await prismaInstance.$queryRaw`
  select "User"."id"
  from "User"
  join "Location" on "User"."basedInID" = "Location"."id"
  where "Location"."id" = ${user?.basedInID}` as any[]).length || 0

  return {
    numberOfBookings,
    bookingsComparedToLastMonth,
    numberOfUsersLocally
  }
}

// Function to get the graph data
export const getGraphData = async (location: string, start: Date, end: Date) => {
  const user = currentUser()
  if (!user) return null;
  try {
    const _location = await prismaInstance.location.findFirst({
      where: {
        name: location
      }
    })

    if (!_location) return null

    const bookings = await prismaInstance.booking.findMany({
      include: {
        resource: {
          select: {
            type: true
          }
        }
      },
      where: {
        resource: {
          locationID: _location.id
        },
        start: {
          gte: start,
          lt: end
        },
      }
    })

    const DaysBetweenStartAndEnd = () => {
      const days = []
      let currentDate = start
      while (currentDate < end) {
        days.push(currentDate)
        currentDate = addDays(currentDate, 1)
      }
      return days
    }

    const data = DaysBetweenStartAndEnd().map((day: Date) => {
      const bookingsOnDay = bookings.filter((booking) => format(booking.start, 'dd-MM-yyyy') === format(day, 'dd-MM-yyyy'))
      const numberOfOfficeBookings = bookingsOnDay.filter((booking) => booking.resource.type === 'office').length
      const numberOfMeetingRoomBookings = bookingsOnDay.filter((booking) => booking.resource.type === 'meeting_room').length
      const numberOfDeskBookings = bookingsOnDay.filter((booking) => booking.resource.type === 'desk').length
      const numberOfParkingBookings = bookingsOnDay.filter((booking) => booking.resource.type === 'parking').length
      return {
        date: format(day, 'dd-MM-yyyy'),
        Office: numberOfOfficeBookings,
        MeetingRoom: numberOfMeetingRoomBookings,
        Desk: numberOfDeskBookings,
        Parking: numberOfParkingBookings
      }
    }
    )
    return JSON.parse(JSON.stringify(data))
  } catch (error) {
    return null
  }
}

// Function to get the donut data
export const getDonutData = async (location: string, start: Date, end: Date) => {
  const user = currentUser()
  if (!user) return null;
  try {
    const _location = await prismaInstance.location.findFirst({
      where: {
        name: location
      }
    })

    if (!_location) return null

    const bookings = await prismaInstance.booking.findMany({
      include: {
        resource: {
          select: {
            type: true
          }
        }
      },
      where: {
        resource: {
          locationID: _location.id
        },
        start: {
          gte: start,
          lt: end
        },
      }
    })

    const types = ['office', 'meeting_room', 'desk', 'parking']

    const data = types.map((type) => {
      return {
        name: type,
        count: bookings.filter((booking) => booking.resource.type === type).length
      }
    })

    return JSON.parse(JSON.stringify(data))

  } catch (error) {
    return null
  }
}