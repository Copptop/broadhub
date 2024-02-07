'use client'

import { useState } from 'react';
import { InvertedSubmitButton, SubmitButton } from "@/components/Buttons";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { format } from "date-fns";
import Link from "next/link";
import { InputField } from '@/components/InputFields';

interface BookingProps {
  id: string;
  user: string;
  resource: string;
  resourceType: string;
  resourceLocation: string;
  startDateTime: string;
  endDateTime: string;
}

const Booking = {
  id: "1",
  user: "John Doe",
  resource: "Room 1",
  resourceType: "Meeting Room",
  resourceLocation: "London",
  startDateTime: "2024-08-01T09:00:00",
  endDateTime: "2024-08-01T10:00:00",
}

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      // Revert changes on cancel
      setEditedUser(Booking.user);
      setEditedStartDateTime(Booking.startDateTime);
      setEditedEndDateTime(Booking.endDateTime);
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    console.log('Updated Booking Details:', {
      id: Booking.id,
      user: editedUser,
      resource: Booking.resource, // Non-editable
      resourceType: Booking.resourceType, // Non-editable
      resourceLocation: Booking.resourceLocation, // Non-editable
      startDateTime: editedStartDateTime,
      endDateTime: editedEndDateTime,
    });

    setIsEditing(false);
  };

  const {
    id,
    user,
    resource,
    resourceType,
    resourceLocation,
    startDateTime: initialStartDateTime,
    endDateTime: initialEndDateTime,
  } = Booking;

  const [editedUser, setEditedUser] = useState(user);
  const [editedStartDateTime, setEditedStartDateTime] = useState(initialStartDateTime);
  const [editedEndDateTime, setEditedEndDateTime] = useState(initialEndDateTime);

  const startDateTime = format(editedStartDateTime, 'dd MMM yyyy h:mm a');
  const endDateTime = format(editedEndDateTime, 'h:mm a');

  const pages = [
    { name: 'Bookings', href: '/bookings', current: false },
    { name: 'Booking Details', href: `/bookings/${id}`, current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="px-6 py-4">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Booking Details</h1>
          <p className="mt-1 max-w-2xl text-lg italic leading-6 text-zinc-500">#{id}</p>
        </div>
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-500">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-500">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Booked For</span>
              {isEditing ? (
                <InputField name='name' placeholder={editedUser} type='text' onChange={(e) => setEditedUser(e.target.value)} />
              ) : (
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{editedUser}</span>
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Resource</span>
              <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{resource}</span>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Resource Type</span>
              <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{resourceType}</span>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Location</span>
              <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{resourceLocation}</span>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Date & Time</span>
              {isEditing ? (
                <div className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">
                  {startDateTime} --&gt; {endDateTime}
                </div>
              ) : (
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{startDateTime} --&gt; {endDateTime}</span>
              )}
            </div>
            <div className="flex flex-auto py-4 space-x-5">
              {isEditing ? (
                <>
                  <SubmitButton onClick={handleUpdate}>Update</SubmitButton>
                  <InvertedSubmitButton onClick={handleEditToggle}>Cancel</InvertedSubmitButton>
                </>
              ) : (
                <>
                  <SubmitButton onClick={handleEditToggle}>Edit</SubmitButton>
                  <InvertedSubmitButton >Cancel</InvertedSubmitButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
