import { BookingCards } from "@/components/Cards";

interface Booking {
  id: number;
  resource: string;
  resourceType: string;
  href: string;
  datetime: string;
}

interface BookingCardsProps {
  data: Booking[];
}

const DashboardHeader = ({ data }: { data: Booking[] }) => {
  return (
    <>
      <div className="">
        <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">Welcome [user]</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-500">
          Here&apos;s your upcoming bookings
        </p>
      </div>
      <BookingCards data={data} />
    </>
  );
}

export default DashboardHeader;

