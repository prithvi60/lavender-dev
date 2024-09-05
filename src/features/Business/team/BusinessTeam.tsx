import { Button } from "../../../components/ui/button"
import { DataTable } from "./data-table"
import { useQuery } from '@tanstack/react-query'
import endpoint from "../../../api/endpoints"
import { columns } from "./columns"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useDrawer } from "../BusinessDrawerContext"
import "./style.css";

export default function BusinessTeam({inOnboard}) {
  
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

  const { openDrawer, isOpen } = useDrawer() || ''

  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["query-appointment"],
    queryFn: () => endpoint.getBusinessAppointments(payload)
  })
  const [employeeData, setEmloyeeData] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState(columns);
  const userDetails = useSelector((state: any) => state?.currentUserDetails);
  const establishmentId = userDetails?.establishmentId || "";

  const data = employeeData

  const getEstablishmentDetails = async () => {
    try {
      const establishmentData = await endpoint.getEstablishmentDetailsById(establishmentId);
      if (establishmentData?.data?.success) {
        setEmloyeeData([...establishmentData?.data?.data?.employees] || []);
      }
    } catch (error) {
      console.error("Error fetching establishment details:", error);
    }
  };
  
  useEffect(() => {
    getEstablishmentDetails();
  }, [establishmentId, isOpen]);


  useEffect(()=> {
    if(inOnboard){
      setFilteredResponse(columns?.filter(item => item.id !== 'edit'))
    }
  },[columns])
  //const filteredResponse = columns?.filter(item => item.id !== 'edit');

  return (
    <div className="containerBox mx-auto">
      <DataTable columns={filteredResponse} data={employeeData} inOnboard={inOnboard}/>
    </div>
  )
}





