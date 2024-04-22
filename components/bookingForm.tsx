'use client'

// Import the necessary modules
const ics = require('ics')

import { InvertedSubmitButton } from '@/components/Buttons';
import { ConfirmModal } from '@/components/popups/Modals';
import { useCurrentUser } from '@/lib/hooks/use-current-user';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { useState } from 'react';

interface BookingProps {
  id: string;
  user: string;
  resource: string;
  resourceType: string;
  startDatetime: Date;
  endDatetime: Date;
  location: string;
  region: string;
  floor: string;
}

// Booking form component
export default function BookingForm(data: BookingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useCurrentUser()

  // Function to handle the save button
  const handleSave = (data: BookingProps) => {
    const duration = ((data.endDatetime.getTime() - data.startDatetime.getTime()) / 1000 / 60 / 60).toString()
    const durationHours = parseInt(duration.split('.')[0])
    const durationMinutes = parseInt(duration.split('.')[1]) * 6

    // Create the event object
    const event = {
      start: [data.startDatetime.getFullYear(), data.startDatetime.getMonth(), data.startDatetime.getDay(), data.startDatetime.getHours(), data.startDatetime.getMinutes()],
      duration: { hours: durationHours, minutes: durationMinutes },
      title: 'Resource Booking',
      description: `This is you booking for ${data.resource}`,
      location: `Floor ${data.floor} at ${data.location}`,
      url: `https://broadhub.vercel.app/bookings/${data.id}`,
      geo: {},
      categories: [],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
      attendees: [
        { name: user!.name, email: user!.email || '', rsvp: true, partstat: 'ACCEPTED', role: 'REQ-PARTICIPANT' },
      ]
    }

    // Create the .ics file
    ics.createEvent(event, (error: any, value: any) => {
      if (error) {
        return
      }
      // Save the file to the user's device via file-saver
      const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "event-schedule.ics")
    })
  }

  return (
    <>
      <div className="px-6 py-4 ">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Booking Details</h1>
          <p className="mt-1 max-w-2xl text-lg italic leading-6 text-zinc-500">#{data.id}</p>
        </div>
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-500">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-500">
            <div className="px-4 py-6 flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Booked For</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32 grow ">{data.user}</span>
            </div>
            <div className="px-4 py-6 flex flex-row sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Resource</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32 grow ">{data.resource}</span>
            </div>
            <div className="px-4 py-6 flex flex-row sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Resource Type</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32 grow ">{data.resourceType}</span>
            </div>
            <div className="px-4 py-6 flex flex-row sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Location</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32 grow ">{data.location}, Floor {data.floor}</span>
            </div>
            <div className="px-4 py-6 flex flex-row sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Date & Time</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32 grow ">{format(data.startDatetime, 'hh:mm dd/MM/yyyy')} --&gt; {format(data.endDatetime, 'hh:mm dd/MM/yyyy')}</span>
              <button className="pr-4 text-sm text-right leading-6 text-blue-700 hover:text-compDarkBlue dark:hover:text-compLightBlue w-60 flex-none" onClick={() => { handleSave(data) }}>Import to Calendar</button>
            </div>
            {data.startDatetime <= new Date() ? (
              <Link className="flex flex-auto py-4 space-x-5" href={`/map/${data.region}/${data.location}/floor${data.floor}`}>
                <InvertedSubmitButton>Rebook</InvertedSubmitButton>
              </Link>
            ) : (
              <div className="flex flex-auto py-4 space-x-5">
                <InvertedSubmitButton onClick={() => setIsModalOpen(true)}>Cancel Booking</InvertedSubmitButton>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmModal open={isModalOpen} onClose={() => setIsModalOpen(false)} type='booking' id={data.id}>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-darkBgTertiary">
            <ExclamationCircleIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
              Cancel Booking
            </h3>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
          </div>
        </ConfirmModal>
      )}
    </>
  )
}
