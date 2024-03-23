import { List_Table } from "@/components/Tables";
import Breadcrumb from "@/components/navigation/breadcrumbs";

const headers = ['Locations']

export default function Page({ params }: { params: { region: string } }) {
  const locations = [
    { name: 'Marshwall', href: `/list/${params.region}/marshwall` },
    { name: 'Hammersmith', href: `/list/${params.region}/hammersmith` },
    { name: 'Birmingham', href: `/list/${params.region}/birmingham` },
    { name: 'Manchester', href: `/list/${params.region}/manchester` },
    { name: 'Glasgow', href: `/list/${params.region}/glasgow` },
  ]
  return (
    <>
      <div>
        <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: true }]} />
        <List_Table headers={headers} data={locations} />
      </div>
    </>
  )
}
