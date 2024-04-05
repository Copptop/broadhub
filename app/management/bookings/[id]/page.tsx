'use client'

// TODO: MAKE IT PROTECTED ROUTE
import { InvertedSubmitButton, SubmitButton } from "@/components/Buttons";
import { InputField } from '@/components/InputFields';
import Breadcrumb from "@/components/navigation/breadcrumbs";
import { ConfirmModal } from "@/components/popups/Modals";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { format } from "date-fns";
import { useState } from 'react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const startDateTime = format(new Date(editedStartDateTime), 'dd MMM yyyy h:mm a');
  const endDateTime = format(new Date(editedEndDateTime), 'h:mm a');

  const pages = [
    { name: 'Bookings', href: '/management/bookings', current: false },
    { name: 'Booking Details', href: `/bookings/${id}`, current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="px-6 py-4 h-[85dvh] overflow-y-auto">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Booking Details</h1>
          <p className="mt-1 max-w-2xl text-lg italic leading-6 text-zinc-500">#{id}</p>
        </div>
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-500">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-500">
            <div className="px-4 py-6 flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Booked For</span>
              {isEditing ? (
                <InputField name='name' placeholder={editedUser} type='text' onChange={(e) => setEditedUser(e.target.value)} />
              ) : (
                <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">{editedUser}</span>
              )}
            </div>
            <div className="px-4 py-6  flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Resource</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">{resource}</span>
            </div>
            <div className="px-4 py-6  flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Resource Type</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">{resourceType}</span>
            </div>
            <div className="px-4 py-6  flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Location</span>
              <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">{resourceLocation}</span>
            </div>
            <div className="px-4 py-6  flex flex-row sm:px-1">
              <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">Date & Time</span>
              {isEditing ? (
                <div className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">
                  {startDateTime} --&gt; {endDateTime}
                </div>
              ) : (
                <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">{startDateTime} --&gt; {endDateTime}</span>
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
                  <InvertedSubmitButton onClick={() => setIsModalOpen(true)}>Cancel Booking</InvertedSubmitButton>
                </>
              )}
            </div>
            {isModalOpen && (
              <ConfirmModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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

          </div>
        </div>
      </div>
    </>
  );
}