import APAC from '@/app/(map)/(APAC)/APAC'
import EMEA from '@/app/(map)/(EMEA)/EMEA'
import UK from '@/app/(map)/(EMEA)/UK'
import NA from '@/app/(map)/(NA)/NA'
import NENA from '@/app/(map)/(NA)/NENA'
import WorldMap from '@/app/(map)/worldmap'
import Breadcrumb from '@/components/navigation/breadcrumbs'


export default function Page({ params }: { params: { region: string } }) {

  var map_to_render = null

  // Check the region and render the appropriate map
  if (params.region === 'NA') {
    map_to_render = <NA />
  } else if (params.region === 'NENA') {
    map_to_render = <NENA />
  } else if (params.region === 'EMEA') {
    map_to_render = <EMEA />
  } else if (params.region === 'UK') {
    map_to_render = <UK />
  } else if (params.region === 'APAC') {
    map_to_render = <APAC />
  }
  else {
    map_to_render = <WorldMap />
  }
  return (
    <>
      <Breadcrumb pages={[{ name: 'Map', href: '/map', current: false }, { name: params.region, href: `/map/${params.region}`, current: true }]} />
      <div className="h-[85vh] py-4">{map_to_render}</div>
    </>
  )
}