import { Button } from "../../../components/ui/button"
import { Appointments, columns } from "./columns"
import { DataTable } from "./data-table"
import { appointments } from "../../../constants/appointments"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"

function getData(): Appointments[] {
  // Fetch data from your API here. use await while calling in a async component
  return appointments 
}

export default function AppointmentsPage() {
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
  const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getBusinessAppointments(payload)}})

  console.log("Appointments >>", userInfo, isLoading)
  const data = getData()

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
 )
}
