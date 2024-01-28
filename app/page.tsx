'use client'

import React from 'react';
import ScheduleSection from '@/components/dashboard/schedule/ScheduleSection'
import CalendarSection from '@/components/dashboard/calendar/CalendarSection'

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-01-21T13:00',
    endDatetime: '2022-01-21T14:30',
  },
  {
    id: 2,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-01-21T13:00',
    endDatetime: '2022-01-21T14:30',
  },
  {
    id: 3,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    startDatetime: '2022-01-21T13:00',
    endDatetime: '2022-01-21T14:30',
  },
  // More meetings...
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  return (
    <div className='p-6'>
      <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <CalendarSection />
        <section className="mt-12 md:mt-0 md:pl-14">
          <ScheduleSection meetings={meetings} />
        </section>
      </div>
    </div>
  )
}
