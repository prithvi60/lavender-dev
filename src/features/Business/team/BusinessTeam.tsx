import { Button } from "../../../components/ui/button"
import { DataTable } from "./data-table"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"
import { teams } from "./teamsData"
import { columns } from "./columns"

export default function BusinessTeam() {
  const payload = {
    "pageNumber": 0,
    "pageSize": 0,
    "sortBy": "",
    "sortDirection": "",
    "establishmentId": "",
    "customerId": "",
    "customerName": "",
    "fromDate": "2024-05-10T10:56:01.819Z",
    "toDate": "2024-05-25T10:56:01.822Z",
    "fromCost": 0,
    "toCost": 0
  }

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["query-user-info"],
    queryFn: () => endpoint.getBusinessAppointments(payload)
  })

  console.log("teamss >>", userInfo, isLoading)
  const data = teams

  return (
    <div className="container mx-auto">
      <DataTable  columns={columns} data={data} />
    </div>
  )
}





