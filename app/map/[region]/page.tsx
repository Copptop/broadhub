import { usePathname, useSearchParams } from 'next/navigation'

import WorldMap from '@/app/(map)/worldmap'
import NA from '@/app/(map)/(NA)/NA'
import NENA from '@/app/(map)/(NA)/NENA'
import EMEA from '@/app/(map)/(EMEA)/EMEA'
import UK from '@/app/(map)/(EMEA)/UK'
import APAC from '@/app/(map)/(APAC)/APAC'


export default function Page({ params }: { params: { region: string } }) {

  var map_to_render = null

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
    <div className="h-[85vh] py-4">{map_to_render}</div>
    </>
  )
}