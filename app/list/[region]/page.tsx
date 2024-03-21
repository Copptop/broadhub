import Breadcrumb from "@/components/navigation/breadcrumbs";

export default function Page({ params }: { params: { region: string } }) {
  return (
    <>
      <div>
        <Breadcrumb pages={[{ name: 'List', href: '/list', current: false }, { name: params.region, href: `/list/${params.region}`, current: true }]} />
      </div>
    </>
  )
}
