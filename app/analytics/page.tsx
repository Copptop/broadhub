import { getAllLocations } from '@/lib/database/locations';
import { getStatistics } from '@/lib/database/stats';
import { currentUser } from '@/lib/hooks/server/use-current-user';
import { redirect } from 'next/navigation';
import DynamicStatistics from './dynamicStatistics';

// Stats to be displayed on the page
const stats = [
  { name: 'Total Local Bookings', stat: '' },
  { name: 'Local Booking Compared to Last Month', stat: '' },
  { name: 'Number of Users based Locally', stat: '' },
]

export default async function Page() {
  // Ensure correct user role for access
  const user = await currentUser()
  if (!user || !user.id || user.role !== 'HR' && user.role !== 'ADMIN') {
    redirect('/')
  }

  // Get the statistics from the database
  const _stats = await getStatistics(user.id)
  stats[0].stat = _stats.numberOfBookings.toString()
  stats[1].stat = `${_stats.bookingsComparedToLastMonth.toString()} %`
  stats[2].stat = _stats.numberOfUsersLocally.toString()

  // Get all locations
  const locations = (await getAllLocations()).map((location: any) => {
    return {
      id: location.id,
      name: location.name,
      region: location.region
    }
  })

  return (
    <>
      <div className="px-6 py-4 h-[85dvh] w-full overflow-auto">
        <h3 className="text-xl font-semibold leading-6 text-zinc-700 dark:text-zinc-300">Last 30 days Locally</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-md shadow-lg bg-white dark:border-zinc-800 dark:bg-darkBgSecondary px-4 py-5 sm:p-6">
              <dt className="truncate text-sm font-medium text-zinc-700 dark:text-zinc-300">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-zinc-600 dark:text-zinc-400">{item.stat}</dd>
            </div>
          ))}
        </dl>
        <DynamicStatistics locations={locations} />
      </div>
    </>
  )
}
