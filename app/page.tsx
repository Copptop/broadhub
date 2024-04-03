import DashboardHeader from '@/components/dashboard/DashboardHeader';
import Schedule from '@/components/dashboard/schedule/newSchedule';
import { getUsersBookings } from '@/lib/database/bookings';

export default async function Dashboard() {
  const _userbookings = await getUsersBookings()
  const _upcomingbookings = _userbookings.slice(0, 4)
  return (
    <>
      <div className='px-6 py-4 h-[95dvh] overflow-y-auto'>
        <DashboardHeader data={_upcomingbookings} />
        <Schedule data={_userbookings} />
      </div>
    </>
  )
}
