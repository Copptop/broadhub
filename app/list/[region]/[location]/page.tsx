import Breadcrumb from "@/components/navigation/breadcrumbs";

export default function Page({ params }: { params: { region: string, location: string } }) {
  return (
    <>
      <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: false }, { name: params.location, href: `/list/${params.region}/${params.location}`, current: true }]} />
    </>
  )
}
