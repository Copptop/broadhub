import { List_Table } from "@/components/Tables"

const headers = ['Regions']
const regions = [{ name: 'NA', href: `/list/NA` }, { name: 'NENA', href: `/list/NENA` }, { name: 'EMEA', href: `/list/EMEA` }, { name: 'UK', href: `/list/UK` }, { name: 'APAC', href: `/list/APAC` }]

export default function Page() {
  return (
    <>
      <List_Table headers={headers} data={regions} />
    </>
  )
}
