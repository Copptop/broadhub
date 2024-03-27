import React from 'react';
import { auth, signOut } from '@/auth';

import ScheduleSection from '@/components/dashboard/schedule/ScheduleSection'
import CalendarSection from '@/components/dashboard/calendar/CalendarSection'
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { json } from 'stream/consumers';

const ondaybookings = [
  { id: 1, resource: 'Desk 1', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 2, resource: 'Desk 2', resourceType: "desk", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 3, resource: 'Room 1', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
  { id: 4, resource: 'Room 2', resourceType: "room", resourceLocation: 'Marsh Wall, Canary Wharf', href: 'bookings/1', startDateTime: '2024-01-21T09:00', endDateTime: '2024-01-21T17:00' },
]

const upcomingbookings = [
  { id: 1, resource: 'Desk 1', resourceType: "desk", href: 'bookings/1', datetime: '2024-01-21T13:00' },
  { id: 2, resource: 'Desk 2', resourceType: "desk", href: 'bookings/1', datetime: '2024-01-21T13:00' },
  { id: 3, resource: 'Room 1', resourceType: "room", href: 'bookings/1', datetime: '2024-01-21T13:00' },
  { id: 4, resource: 'Room 2', resourceType: "room", href: 'bookings/1', datetime: '2024-01-21T13:00' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function Dashboard() {
  const session = await auth()
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form action={async () => { "use server"; await signOut() }}>
        <button type="submit">logout</button>
      </form>
      <div className='px-6 py-4 h-[95dvh] overflow-y-auto'>
        <DashboardHeader data={upcomingbookings} />
        <div className="py-4 md:grid md:grid-cols-2 md:divide-x md:divide-zinc-200 dark:md:divide-zinc-500">
          <CalendarSection />
          <section className="mt-12 md:mt-0 md:pl-14">
            <ScheduleSection schedules={ondaybookings} />
          </section>
        </div>
      </div>
    </>
  )
}