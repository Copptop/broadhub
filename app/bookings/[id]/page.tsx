import { InvertedSubmitButton, SubmitButton } from "@/components/Buttons";
import Breadcrumb from "@/components/navigation/breadcrumb";
import { format } from "date-fns";

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
  const startDateTime = format(Booking.startDateTime, 'dd MMM yyyy h:mm a');
  const endDateTime = format(Booking.endDateTime, 'h:mm a');

  const pages = [
    { name: 'Bookings', href: '/bookings', current: false },
    { name: 'Booking Details', href: `/bookings/${Booking.id}`, current: true },
  ];

  return (
    <>
      <div className="h-[90vh] overflow-y-auto">
        <Breadcrumb pages={pages} />
        <div className="px-6 py-4 ">
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Booking Details</h1>
            <p className="mt-1 max-w-2xl text-lg italic leading-6 text-zinc-500">#{Booking.id}</p>
          </div>
          <div className="mt-6 border-t border-zinc-200 dark:border-zinc-500">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-500">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Booked For</span>
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{Booking.user}</span>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Resource</span>
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{Booking.resource}</span>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Resource Type</span>
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{Booking.resourceType}</span>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Location</span>
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{Booking.resourceLocation}</span>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300">Date & Time</span>
                <span className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-500 sm:col-span-1 sm:mt-0">{Booking.startDateTime} --&gt; {Booking.endDateTime}</span>
                <span className="mt-1 pr-4 text-sm text-right leading-6 text-blue-700 hover:text-compDarkBlue dark:hover:text-compLightBlue sm:col-span-1 sm:mt-0">Import to Calendar</span>
              </div>
              <div className="flex flex-auto py-4 space-x-5">
                <InvertedSubmitButton >Cancel Booking</InvertedSubmitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
