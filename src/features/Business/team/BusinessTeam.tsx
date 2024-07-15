import { Button } from "../../../components/ui/button"
import { DataTable } from "./data-table"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"
import { columns } from "./columns"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDrawer } from "../BusinessDrawerContext"

export default function BusinessTeam() {
  const payload = {
    "pageNumber": 0,
    "pageSize": 30,
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
  const [employeeData, setEmloyeeData] = useState([]);

  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  const data = employeeData
  
  useEffect(() => {
    const getEstablishmentDetails = async () => {
      try {
        const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
        if (establishmentData?.data?.success) {
          setEmloyeeData(establishmentData?.data?.data?.employees || []);
        }
      } catch (error) {
        console.error("Error fetching establishment details:", error);
      }
    };

    getEstablishmentDetails();
  }, [establishmentId]);

  return (
    <div className="container mx-auto">
      <DataTable  columns={columns} data={data} />
    </div>
  )
}





