import { Button } from "../../../components/ui/button"
import { Appointments, columns } from "./columns"
import { DataTable } from "./data-table"
import { appointments } from "../../../constants/appointments"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"
import { BookingResponse } from "../../../api/type"
import { useEffect, useState } from "react"
import { getDifferenceInMinutes } from "../Schedule/utils"
import { useFilterContext } from "../FilterContext"


// function getData(): Appointments[] {
//   // Fetch data from your API here. use await while calling in a async component
//   return appointments 
// }

function parseAppointmentResponse(response: any) {
  
  const parsedResponse: Appointments[] = []

  response?.forEach((booking): any => {
    const {bookingId, customerName, startTime, endTime, serviceName,
      employeeName, serviceCost, bookingStatus, bookingType } = booking
    const bookingTemp: Appointments = {
      id: bookingId,
      client: customerName,
      scheduledDate: startTime,
      duration: getDifferenceInMinutes(endTime, startTime),
      service: serviceName,
      bookingDate: startTime,
      bookedBy: employeeName,
      teamMember: employeeName,
      price: serviceCost,
      status: bookingStatus,
      bookingType: bookingType,
    }
    parsedResponse.push(bookingTemp)
  })
  return parsedResponse
}

export default function AppointmentsPage({estId}) {
  
  const [customerName, setCustomerName] = useState('')
  const { confirmedText } = useFilterContext();
  const payload = {
      "pageNumber": 0,
      "pageSize": 10,
      "establishmentId": estId === "" ? "" : estId,
      "fromCost": 0,
      "toCost": 1000,
      // "sortBy": "",
      // "sortDirection": "",
      // "establishmentId": "",
      // "customerId": "",
      // "customerName": customerName,
      // "fromDate": "2024-05-10T10:56:01.819Z",
      // "toDate": "2024-05-25T10:56:01.822Z",
    }
  const controllerObj = {customerName: (value) => setCustomerName(value)}
  const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getBusinessAppointments(payload)}})

  let appointmentData = [];
  let pageData;
  if(!isLoading && userInfo){
    
    const { data: { data: {content, ...pageD} } } = userInfo
    pageData = pageD
    appointmentData = confirmedText.length > 0 ? parseAppointmentResponse(content).filter(appointment => confirmedText.includes(appointment.status)) : parseAppointmentResponse(content)
  }
  useEffect(() => {
    // console.log("context", confirmedText);
  }, [confirmedText]);
  return (
    <div>
      {!isLoading ? <DataTable controllers={controllerObj} columns={columns} data={appointmentData} pageData={pageData} /> : <>Loading...</>}
    </div>
 )
}
