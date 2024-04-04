import ListSection from '@/components/list/listSection'
import Breadcrumb from '@/components/navigation/breadcrumbs'
import { getAllBookingsGoingForward } from '@/lib/database/bookings'
import { getFavorites, getResources } from '@/lib/database/resources'

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

  const _data = await getResources(params.location, parseInt(params.floor.split('floor', 2)[1]))
  const bookings = _data ? _data[1].flat() : null;
  const resources = _data ? _data[0] : [];
  return (
    <>
      <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: false }, { name: params.location, href: `/list/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/list/${params.region}/${params.location}/${params.floor}`, current: true }]} />
      <ListSection bookings={bookings} resources={resources} favs={favs as favsProps[]} params={params} />
    </>
  )
}