import MapSelection from '@/components/map/mapSection'
import Breadcrumb from '@/components/navigation/breadcrumbs'
import { getAllBookingsGoingForward } from '@/lib/database/bookings'
import { getFavorites, getRestrictedResources } from '@/lib/database/resources'

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

interface restictedProps {
  name: string
}


export default async function Page({ params }: { params: { floor: string, location: string, region: string } }) {
  const data = await getAllBookingsGoingForward(params.location)
  const favs = await getFavorites(params.location)
  const restrictedResources = await getRestrictedResources(params.location, parseInt(params.floor.replace('floor', '')))

  return (
    <>
      <Breadcrumb pages={[{ name: 'Map', href: '/map', current: false }, { name: params.region, href: `/map/${params.region}`, current: false }, { name: params.location, href: `/map/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/map/${params.region}/${params.location}/${params.floor}`, current: true }]} />
      <MapSelection data={data as dataProps[]} favs={favs as favsProps[]} params={params} restrictedResources={restrictedResources as restictedProps[]} />
    </>
  )
}