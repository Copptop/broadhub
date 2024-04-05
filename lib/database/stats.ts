'use server'

import { prismaInstance } from "@/lib/prisma";
import { addDays, addMonths, format, parse, startOfToday } from "date-fns";
import { currentUser } from "../hooks/server/use-current-user";

const stats = [
  { name: 'Total Bookings', stat: '135' },
  { name: 'Booking Compared to Last Month', stat: '78.4%' },
  { name: 'Total Avalibility', stat: '44.57%' },
]

export const getStatistics = async () => {
  const firstdayCurrentMonth = parse(format(startOfToday(), 'MMM yyyy'), 'MMM yyyy', new Date());
  const firstDayPreviousMonth = addMonths(firstdayCurrentMonth, -1)

  const numberOfBookings = await prismaInstance.booking.count()

  let numberOfBookingsInLastMonth = await prismaInstance.booking.count({
    where: {
      start: {
        gte: firstDayPreviousMonth,
        lt: firstdayCurrentMonth
      }
    }
  })
  if (numberOfBookingsInLastMonth === 0) {
    numberOfBookingsInLastMonth = 1
  }

  const numberOfBookingsInCurrentMonth = await prismaInstance.booking.count({
    where: {
      start: {
        gte: firstdayCurrentMonth
      }
    }
  })

  const bookingsComparedToLastMonth = ((numberOfBookingsInCurrentMonth - numberOfBookingsInLastMonth) / numberOfBookingsInLastMonth) * 100

  const totalAvailability = await prismaInstance.booking.count()

  return {
    numberOfBookings,
    bookingsComparedToLastMonth,
    totalAvailability
  }
}

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