import { List_Table } from "@/components/Tables"

const regions = ['NA', 'NENA', 'EMEA', 'UK', 'APAC']
const headers = ['Regions']

export default function Page() {
  return (
    <>
      <List_Table headers={headers} data={regions} />
    </>
  )
}
