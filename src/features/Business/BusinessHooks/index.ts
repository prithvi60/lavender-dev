import { useQuery } from "@tanstack/react-query"
import endpoint from "../../../api/endpoints"
import { parseAppointmentResponse } from "../Schedule/utils"
import { useSelector } from "react-redux"

export const useFetchAppointments = (payload) => {
    
    return useQuery({queryKey: ["query-get-appointments"],
        queryFn: () => { return endpoint.getBusinessAppointments(payload)}, 
        refetchOnWindowFocus: false,
        // select: (data) => {
        //     return parseAppointmentResponse(data.data)
        // }
    })
}

export const useFetchEmployees = () => {
    const employees = useSelector((state: any) => {
        return state?.businessEstablishment?.establishmentData?.employees
    })
    return employees
}

export const useFetchCategories = () => {
    const categories = useSelector((state: any) => {
        return state?.businessEstablishment?.establishmentData?.categories
    })
    return categories
}