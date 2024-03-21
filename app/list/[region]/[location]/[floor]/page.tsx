import Breadcrumb from "@/components/navigation/breadcrumbs";

export default function Page({ params }: { params: { floor: string, location: string, region: string } }) {
  return (
    <>
      <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: false }, { name: params.location, href: `/list/${params.region}/${params.location}`, current: false }, { name: params.floor, href: `/list/EMEA/marshwall/${params.floor}`, current: true }]} />
    </>
  )
}
