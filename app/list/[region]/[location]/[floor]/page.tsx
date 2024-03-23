'use client'

import { Fragment, useState } from 'react'
import { BookingListTable } from "@/components/Tables";
import DateTimeSelection from "@/components/map/dateTimeSelection";
import Breadcrumb from "@/components/navigation/breadcrumbs";
import { set } from 'date-fns';
import { SubmitButton, InvertedSubmitButton } from '@/components/Buttons';
import BookingNotification from '@/components/popups/Notfication';
import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon, ComputerDesktopIcon, HeartIcon } from '@heroicons/react/24/solid';

const headers = ['Resources', 'Type', 'Status']
interface clickedData {
  id: string;
  name: string;
  type: string;
  isFavorite: boolean;
  bookings: bookingData[];
}

interface bookingData {
  startDateTime: string;
  endDateTime: string;
}


export default function Page({ params }: { params: { region: string, location: string, floor: string } }) {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [selectedTime1, setSelectedTime1] = useState("07:00");
  const [selectedTime2, setSelectedTime2] = useState("19:00");
  const [clickedData, setClickedData] = useState<clickedData>();
  const [showNotification, setShowNotification] = useState(false);

  const resources = [
    { name: 'Resource 1', type: 'Desk', status: 'Available', isFavourite: true },
    { name: 'Resource 2', type: 'Desk', status: 'Available' },
    { name: 'Resource 3', type: 'Desk', status: 'Available' },
    { name: 'Resource 4', type: 'Desk', status: 'Available' },
    { name: 'Resource 5', type: 'Desk', status: 'booked' },
    { name: 'Resource 6', type: 'Desk', status: 'booked' },
    { name: 'Resource 7', type: 'Desk', status: 'booked' },
    { name: 'Resource 8', type: 'Desk', status: 'booked' },
    { name: 'Resource 9', type: 'Desk', status: 'booked' },
    { name: 'Resource 10', type: 'Desk', status: 'booked' },

    { name: 'aResource 2', type: 'Desk', status: 'Available' },
    { name: 'aResource 1', type: 'Desk', status: 'Available' },
    { name: 'aResource 3', type: 'Desk', status: 'Available' },
    { name: 'aResource 4', type: 'Desk', status: 'Available' },
    { name: 'aResource 5', type: 'Desk', status: 'booked' },
    { name: 'aResource 6', type: 'Desk', status: 'booked' },
    { name: 'aResource 7', type: 'Desk', status: 'booked' },
    { name: 'aResource 8', type: 'Desk', status: 'booked' },
    { name: 'aResource 9', type: 'Desk', status: 'booked' },
    { name: 'aResource 10', type: 'Desk', status: 'booked' },
  ]

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    updateDataArray(event.target.value, selectedTime1, selectedTime2);
  };

  const handleTime1Change = (value: string) => {
    setSelectedTime1(value);
    const [hour, minute] = value.split(':');
    if (parseInt(minute) === 30) {
      const newHour = (parseInt(hour) + 1).toString().padStart(2, '0');
      setSelectedTime2(`${newHour}:00`);
    } else {
      setSelectedTime2(`${hour}:30`);
    }
    updateDataArray(selectedDate, value, selectedTime2);
  };

  const handleTime2Change = (value: string) => {
    setSelectedTime2(value);
    updateDataArray(selectedDate, selectedTime1, value);
  };

  const updateDataArray = (date: string, time1: string, time2: string) => {
    const newData = [{ date, time1, time2 }];
  };

  const loadClickedData = (id: string) => {
    let type = document.getElementById(id)?.getAttribute("class")?.split(" ")[0] ?? "";
    if (type === "desk") {
      type = "Desk";
    } else if (type === "meeting_room") {
      type = "Meeting Room";
    } else if (type === "office") {
      type = "Office";
    } else if (type === "parking") {
      type = "Parking";
    } else {
      type = "";
    }

    const data: clickedData = {
      id: id,
      name: id.charAt(0).toUpperCase() + id.slice(1).split("-").join(" "),
      isFavorite: true,
      type: type,
      bookings: [
        { startDateTime: "2022-01-01 10:00", endDateTime: "2022-01-01 11:00" },
        { startDateTime: "2022-01-01 11:00", endDateTime: "2022-01-01 12:00" },
        { startDateTime: "2022-01-01 12:00", endDateTime: "2022-01-01 13:00" },
        { startDateTime: "2022-01-01 13:00", endDateTime: "2022-01-01 14:00" },
        { startDateTime: "2022-01-01 14:00", endDateTime: "2022-01-01 15:00" },
        { startDateTime: "2022-01-01 15:00", endDateTime: "2022-01-01 16:00" },
        { startDateTime: "2022-01-01 16:00", endDateTime: "2022-01-01 17:00" },
        { startDateTime: "2022-01-01 17:00", endDateTime: "2022-01-01 18:00" },
      ]
    }
    return data;
  }

  const faveHandler = () => {
    if (clickedData) {
      setClickedData({ ...clickedData, isFavorite: !clickedData.isFavorite });
      console.log(clickedData.isFavorite);
    }
  }

  const toggleSlideOver = (clickedID: String) => {
    setClickedData(loadClickedData(clickedID.toString()));
    setOpen(true);
  };

  return (
    <>
      <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: false }, { name: params.location, href: `/list/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/list/EMEA/marshwall/${params.floor}`, current: true }]} />
      <DateTimeSelection onDateChange={handleDateChange} onTime1Change={handleTime1Change} onTime2Change={handleTime2Change} selectedTime1={selectedTime1} selectedTime2={selectedTime2} />
      <div>
        <BookingListTable headers={headers} data={resources} toggleSlideOver={toggleSlideOver} />
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-30" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto relative w-96">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute left-0 top-[70px] -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                          <SubmitButton
                            type="button"
                            className=""
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </SubmitButton>
                        </div>
                      </Transition.Child>
                      <div className=" h-screen pt-[70px]  overflow-y-auto bg-white dark:bg-zinc-800 p-8">
                        <div className="space-y-6 pb-16">
                          <>
                            <div>
                              <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                                <ComputerDesktopIcon width={420} height={320} className=' fill-zinc-200' />
                              </div>
                              <div className="mt-4 flex items-start justify-between">
                                <div>
                                  <h2 className="text-base font-semibold leading-6 text-zinc-800 dark:text-zinc-300">
                                    <span className="sr-only">Details for </span>{clickedData?.id}
                                  </h2>
                                  <p className="text-sm font-medium text-zinc-500">{clickedData?.type}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={faveHandler}
                                  className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <span className="absolute -inset-1.5" />
                                  <HeartIcon className={clickedData?.isFavorite ? "h-6 w-6 text-blue-600" : "h-6 w-6"} aria-hidden="true" />
                                  <span className="sr-only">Favorite</span>
                                </button>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium text-zinc-800 dark:text-zinc-300">Todays Bookings</h3>
                              <dl className="mt-2 divide-y divide-zinc-200 border-b border-t border-zinc-200">
                                {clickedData?.bookings.map((booking, index) => (
                                  <div key={index} className="py-3 flex justify-between text-sm font-medium">
                                    <dt className="text-zinc-800 dark:text-zinc-300">{booking.startDateTime}</dt>
                                    <dd className="flex items-center space-x-2 text-zinc-500">to</dd>
                                    <dd className="text-zinc-800 dark:text-zinc-300">{booking.endDateTime}</dd>
                                  </div>
                                ))}
                              </dl>
                            </div>
                            <div className="flex">
                              <SubmitButton
                                type="button"
                                className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                onClick={() => {
                                  setOpen(false);
                                  setShowNotification(true)
                                }}
                              >
                                Book
                              </SubmitButton>
                              <InvertedSubmitButton
                                type="button"
                                className="ml-3 flex-1 rounded-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-semibold text-zinc-800 dark:text-zinc-300 shadow-sm ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </InvertedSubmitButton>
                            </div>
                          </>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        {showNotification && <BookingNotification show={showNotification} onClose={() => setShowNotification(false)} resources={clickedData?.id} datetime={'test'} />}
      </div>
    </>
  )
}
