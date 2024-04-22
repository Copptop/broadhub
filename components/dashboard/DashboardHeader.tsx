import { BookingCards } from "@/components/Cards";
import { currentUser } from "@/lib/hooks/server/use-current-user";

interface Booking {
  id: number;
  resource: string;
  resourceType: string;
  startDatetime: string;
  endDatetime: string;
  location: string;
  floor: number;
}

interface BookingCardsProps {
  data: Booking[];
}

const DashboardHeader = async ({ data }: BookingCardsProps) => {
  // Get the current user information
  const user = await currentUser()
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Welcome {user?.name}</h1>
        {data.length > 0 ? (
          <>
            <p className="text-sm text-zinc-600 dark:text-zinc-500">
              Here&apos;s your upcoming bookings
            </p>
            <BookingCards data={data} />
          </>
        ) : (
          <div className='text-md py-4 pb-6 text-zinc-600 dark:text-zinc-500'> You have no upcoming bookings</div>
        )}
      </div>
    </>
  );
}

export default DashboardHeader;

