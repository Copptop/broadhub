import MapSelection from '@/components/map/mapSelection'
import Breadcrumb from '@/components/navigation/breadcrumbs'
import { getAllBookingsGoingForward, getFavorites } from '@/lib/database/bookings'

interface dataProps {
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

export default async function Page({ params }: { params: { floor: string, location: string, region: string } }) {
  const data = await getAllBookingsGoingForward(params.location)
  const favs = await getFavorites(params.location)

  return (
    <>
      <Breadcrumb pages={[{ name: 'Map', href: '/map', current: false }, { name: params.region, href: `/map/${params.region}`, current: false }, { name: params.location, href: `/map/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/map/${params.region}/${params.location}/${params.floor}`, current: true }]} />
      <MapSelection data={data as dataProps[]} favs={favs as favsProps[]} params={params} />
    </>
  )
}