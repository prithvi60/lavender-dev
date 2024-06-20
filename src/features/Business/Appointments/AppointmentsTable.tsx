import { Button } from "../../../components/ui/button"
import { Appointments, columns } from "./columns"
import { DataTable } from "./data-table"
import { appointments } from "../../../constants/appointments"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"
import { BookingResponse } from "../../../api/type"
import { useState } from "react"

function getData(): Appointments[] {
  // Fetch data from your API here. use await while calling in a async component
  return appointments 
}

function parseAppointmentResponse(response: BookingResponse) {
  const parsedResponse: Appointments[] = []

  response?.content?.forEach((booking) => {
    const {bookingId, customerName, startTime, 
      totalDuration, services, employeeName, totalCost, bookingStatus } = booking
    const bookingTemp: Appointments = {
      id: bookingId,
      client: customerName,
      scheduledDate: startTime,
      duration: totalDuration,
      service: services.map((service) => service.serviceName).join(''),
      bookingDate: startTime,
      bookedBy: employeeName,
      teamMember: employeeName,
      price: totalCost,
      status: bookingStatus
    }
    parsedResponse.push(bookingTemp)
  })
  return parsedResponse
}

export default function AppointmentsPage() {
  const [customerName, setCustomerName] = useState('')

  const payload = {
    "pageNumber": 0,
    "pageSize": 10,
    // "sortBy": "",
    // "sortDirection": "",
    // "establishmentId": "",
    // "customerId": "",
    // "customerName": customerName,
    // "fromDate": "2024-05-10T10:56:01.819Z",
    // "toDate": "2024-05-25T10:56:01.822Z",
    "fromCost": 0,
    "toCost": 1000
  }
  const controllerObj = {customerName: (value) => setCustomerName(value)}
  const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getBusinessAppointments(payload)}})

  let appointmentData = [];
  let pageData;
  if(!isLoading && userInfo){
    const { data: { content, ...pageD } } = userInfo
    pageData = pageD
    appointmentData = parseAppointmentResponse(userInfo.data)
  }

  return (
    <div className="container mx-auto">
      {!isLoading ? <DataTable controllers={controllerObj} columns={columns} data={appointmentData} pageData={pageData} /> : <>Loading...</>}
    </div>
 )
}
