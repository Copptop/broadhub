'use client'

import { createBooking } from "@/lib/database/bookings";
import { addFavorite, removeFavorite } from "@/lib/database/resources";
import { Transition } from "@headlessui/react";
import { ArrowRightIcon, ClockIcon, ComputerDesktopIcon, HeartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { DatePicker, DatePickerValue, Dialog, Select, SelectItem } from '@tremor/react';
import { addMinutes, addMonths, isAfter, isBefore, isWithinInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { InvertedSubmitButton, SubmitButton } from "../Buttons";
import BookingNotification from "../popups/Notfication";

const headers = ['Resources', 'Type', 'Status', 'Actions']
const times = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00"
];

interface resourceProps {
  id: string,
  name: string,
  type: string,
  restrictedRoles: string[],
  locationID: string,
  floor: number
}

interface bookingsaProps {
  id: string,
  startDateTime: Date,
  endDateTime: Date,
  resource: string,
  resourceType: string,
  location: string,
}

interface favsProps {
  id: string,
  resource: string,
  resourceType: string,
  location: string
}


interface clickedData {
  id: string;
  name: string;
  type: string;
  location: string;
  favID: string;
  isFavorite: boolean;
}

interface bookingData {
  startDateTime: string;
  endDateTime: string;
}

function formattedDateTime(date: Date, time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  const newDateTime = new Date(date!.toISOString());
  newDateTime.setHours(hours, minutes, 0, 0);
  const formattedDateTime = newDateTime.toISOString();
  return formattedDateTime;
}

export default function ListSection({ resources, bookings, favs, params }: { resources: Array<any>, bookings: Array<any> | null, favs: Array<favsProps>, params: { floor: string, location: string, region: string } }) {
  const [selectedDate, setSelectedDate] = useState<DatePickerValue>(new Date());
  const [selectorValue1, setSelectorValue1] = useState("08:00");
  const [selectorValue2, setSelectorValue2] = useState("18:00");
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [clickedData, setClickedData] = useState<clickedData>();
  const [showNotification, setShowNotification] = useState(false);

  const [_resources, setResources] = useState(resources.filter((resource) => {
    const selectedStartTime = new Date();
    const selectedEndTime = new Date();

    if (bookings === null) return true;

    for (const booking of bookings) {
      const startDateTime = booking.start;
      const endDateTime = booking.end;

      const startWithinRange = isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) });
      const endWithinRange = isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) });
      const startsBeforeEndsIn = !startWithinRange && endWithinRange;
      const endsAfterStartsIn = startWithinRange && !endWithinRange;
      const bothInRange = startWithinRange && endWithinRange;
      const coversRange = isBefore(startDateTime, selectedStartTime) && isAfter(endDateTime, addMinutes(selectedEndTime, -1));

      if (
        startsBeforeEndsIn ||
        endsAfterStartsIn ||
        bothInRange ||
        coversRange
      ) {
        if (booking.resourceID === resource.id) {
          return false;
        }
      }
    }

    return true;
  }));

  const [_favs, setFavs] = useState(favs);

  function onclick() {
    if (!selectedDate) {
      alert("Please ensure a date is selected ");
      return;
    }
    const pos1 = times.indexOf(selectorValue1);
    const pos2 = times.indexOf(selectorValue2);
    if (pos1 >= pos2) {
      alert("Please ensure the start time is before the end time of the selected time");
      return;
    }

    const dateTime1 = formattedDateTime(selectedDate, times[pos1]);
    const dateTime2 = formattedDateTime(selectedDate, times[pos2]);

    if (dateTime1 < new Date().toISOString() || dateTime2 < new Date().toISOString()) {
      alert("Please ensure the selected time is in the future");
      return;
    }

    setResources(resources.filter((resource) => {
      const selectedStartTime = new Date(dateTime1);
      const selectedEndTime = new Date(dateTime2);

      if (bookings === null) return true;

      for (const booking of bookings) {
        const startDateTime = booking.start;
        const endDateTime = booking.end;

        const startWithinRange = isWithinInterval(startDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) });
        const endWithinRange = isWithinInterval(endDateTime, { start: selectedStartTime, end: addMinutes(selectedEndTime, -1) });
        const startsBeforeEndsIn = !startWithinRange && endWithinRange;
        const endsAfterStartsIn = startWithinRange && !endWithinRange;
        const bothInRange = startWithinRange && endWithinRange;
        const coversRange = isBefore(startDateTime, selectedStartTime) && isAfter(endDateTime, addMinutes(selectedEndTime, -1));

        if (
          startsBeforeEndsIn ||
          endsAfterStartsIn ||
          bothInRange ||
          coversRange
        ) {
          if (booking.resourceID === resource.id) {
            console.log("flagged" + resource.name);
            return false; // If the resource is booked during this time, filter it out
          }
        }
      }

      return true; // Resource is available during this time
    }));
  }

  const loadClickedData = (id: string, dataArray: Array<resourceProps>) => {
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
      favID: (favs.find((fav: favsProps) => fav.resource === id)) ? favs.find((fav: favsProps) => fav.resource === id)!.id : "",
      isFavorite: favs.some((fav) => fav.resource === id)!!!,
      type: type,
      location: params.location
    }
    return data;
  }

  const onClickSlideOverHandler = (resourceName: string) => {
    setClickedData(loadClickedData(resourceName, _resources))
    setOpen(true);
  }

  async function setFav(id: string, location: string) {
    console.log(clickedData?.isFavorite)
    if (clickedData?.isFavorite) {
      console.log("removing")
      await removeFavorite(id, location)
    } else {
      console.log("adding")
      await addFavorite(id, location)
    }
  }

  async function handleBooking(resourceName: string) {
    await createBooking(resourceName, params.location, selectedDate as Date, selectorValue1, selectorValue2)
      .then((data) => {
        if (!data?.error) {
          setOpen(false);
          setShowNotification(true)
          router.push(`/list/${params.region}/${params.location}/${params.floor}`)
          router.refresh()
        } else {
          alert(data.error)
        }
      })
  }

  return (
    <>
      <nav className="flex border-b border-zinc-200 dark:border-none bg-white dark:bg-zinc-800 shadow-sm dark:shadow-md py-3 ">
        <div className="mr-auto flex w-full mar-w-screen-xl space-r-4 px-4 sm:pr-6 lg:pr-8 font-semibold text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center self-center space-r-4">
            <DatePicker className="w-full z-20 " minDate={new Date()} maxDate={addMonths(new Date(), 3)} defaultValue={new Date()} value={selectedDate} onValueChange={setSelectedDate} />
          </div>

          <div className="flex items-center self-center space-r-4 ml-4">
            <ClockIcon className="size-6 flex-none" />
            <Select id="distance" name="distance" value={selectorValue1} onValueChange={setSelectorValue1} className="pl-3 z-20 " >
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </Select>
            <div className="pl-3"><ArrowRightIcon className="size-5 flex self-center" /></div>
            <Select id="distance" name="distance" value={selectorValue2} onValueChange={setSelectorValue2} className="pl-3 z-20 ">
              {times.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="px-3 w-1/6 " >
            <SubmitButton onClick={() => onclick()}>Update</SubmitButton>
          </div>
        </div>
      </nav>
      <div className="flex my-8 h-[80dvh] overflow-auto">
        <div className="w-full my-2 overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-500 font-semibold text-zinc-700 dark:text-zinc-300">
              <thead className="sticky text-left top-0 bg-white dark:bg-zinc-900 z-10 ">
                <tr>
                  {headers.map((header) => (
                    header !== "Actions" ? (
                      <th key={header.toString()} scope="col" className="sticky top-0 py-3.5 px-4 text-sm sm:px-1 ">
                        <span>{header}</span>
                      </th>
                    ) : (
                      <th key={header.toString()} scope="col" className="sticky top-0 py-3.5 px-4 text-sm sm:px-1 text-center">
                        <span >{header}</span>
                      </th>
                    )
                  ))}
                </tr>
              </thead>
              <tbody className="max-h-[85dvh] divide-y divide-zinc-200 dark:divide-zinc-500 text-zinc-500 dark:text-zinc-500 font-normal">
                {_resources.toSorted().map((resource: resourceProps) => (
                  <tr key={resource.name.toString()} id={resource.name.toString()}>
                    {(favs.some((fav) => fav.resource === resource.name)) ?
                      (<>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm text-indigo-400">
                          {resource.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm text-indigo-400">
                          {resource.type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm text-indigo-400">
                          Available
                        </td>
                        <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                          <div className="flex justify-center">
                            <button
                              onClick={() => onClickSlideOverHandler(resource.name.toString())}
                              className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap"
                            >
                              Book
                            </button>
                          </div>
                        </td>
                      </>)
                      :
                      (<>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {resource.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          {resource.type}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 sm:px-1 text-sm">
                          Available
                        </td>
                        <td className="relative whitespace-nowrap py-4 px-4 text-right text-sm sm:px-1">
                          <div className="flex justify-center">
                            <button
                              onClick={() => onClickSlideOverHandler(resource.name.toString())}
                              className="px-4 py-1 text-sm font-medium text-blue-700 dark:text-blue-500 hover:text-compDarkBlue dark:hover:text-compLightBlue whitespace-nowrap"
                            >
                              Book
                            </button>
                          </div>
                        </td>
                      </>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog className="relative z-30" open={open} onClose={setOpen}>
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
                  <div className="pointer-events-auto relative w-96">
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
                                onClick={() => { setFav(clickedData!.id, clickedData!.location) }}
                                className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <span className="absolute -inset-1.5" />
                                <HeartIcon className={clickedData?.isFavorite ? "h-6 w-6 text-blue-600" : "h-6 w-6"} aria-hidden="true" />
                                <span className="sr-only">Favorite</span>
                              </button>
                            </div>
                          </div>
                          <div className="flex">
                            <SubmitButton
                              type="button"
                              className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              onClick={() => {
                                handleBooking(clickedData?.id || "");
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
                  </div>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {showNotification && <BookingNotification show={showNotification} onClose={() => setShowNotification(false)} resources={clickedData?.id} date={selectedDate as Date} from={selectorValue1} to={selectorValue2} />}
    </>
  )
}
