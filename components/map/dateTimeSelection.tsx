import { CalendarIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { format, parseISO } from "date-fns";
import { ListBox } from "../InputFields";

export default function DateTimeSelection({
  onDateChange,
  onTime1Change,
  onTime2Change,
  selectedTime1,
  selectedTime2
}: {
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onTime1Change: (value: string) => void,
  onTime2Change: (value: string) => void,
  selectedTime1: string,
  selectedTime2: string
}) {
  const defaultMeetingDate = new Date().toISOString();

  return (
    <>
      <nav className="flex border-b border-zinc-200 dark:border-none bg-white dark:bg-zinc-800 shadow-sm dark:shadow-md py-3">
        <div className="mr-auto flex w-full mar-w-screen-xl space-r-4 px-4 sm:pr-6 lg:pr-8 font-semibold text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center self-center space-r-4 ">
            <CalendarIcon className="h-6 w-6 flex" />
            <div className="pd-3 mx-4">
              <input
                type="date"
                name="meetingDate"
                id="meetingDate"
                onChange={onDateChange}
                className="block text-center w-full pl-2 pr-2 py-1.5 rounded-lg border-0   bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-sm ring-1 ring-inset ring-zinc-300 dark:ring-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-mainlilac-50 sm:text-sm sm:leading-6"
                defaultValue={defaultMeetingDate ? format(parseISO(defaultMeetingDate), 'yyyy-MM-dd').toString() : ''}
              />
            </div>
          </div>

          <div className="flex items-center self-center space-r-4 ml-4">
            <ClockIcon className="h-6 w-6 flex" />
            <ListBox onChange={onTime1Change} selectedTime={selectedTime1} />
            <ArrowRightIcon className="h-5 w-5 flex self-center" />
            <ListBox onChange={onTime2Change} selectedTime1={selectedTime1} selectedTime={selectedTime2} />
          </div>
        </div>
      </nav >
    </>
  );
}