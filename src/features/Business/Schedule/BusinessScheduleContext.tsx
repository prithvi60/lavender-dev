import { createContext, useContext, useEffect, useState } from 'react';
import { getMonday, groupAppointments, getWeekEndDate, parseAppointmentResponse } from './utils';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../../api/endpoints';
import { useSelector } from 'react-redux';

const ScheduleContext = createContext(null);

export const GetScheduleDates = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {

  let employees = []
  
  const [durationState, setDurationState] = useState('Day')
  const [ selectedDate , setSelectedDate] = useState(new Date())
  const [ filterWeekStartDate , setFilterWeekStartDate] = useState(getMonday())
  const [ filterWeekEndDate , setFilterWeekEndDate] = useState(getWeekEndDate())
  employees = useSelector((state: any) => state.businessEstablishment.establishmentData.employees)
  const payload = 
    {
      "pageNumber": 0,
      "pageSize": 10,
      "establishmentId":"EST00002507",
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
  const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getBusinessAppointments(payload)}})

  let appointmentData = [];
  let pageData;
  if(!isLoading && userInfo){
    const { data: { content, ...pageD } } = userInfo
    pageData = pageD
    appointmentData = parseAppointmentResponse(userInfo.data)
  }
  
  //appointments will be filtered by date from API itself - only filter by employees in CS
  const [filteredAppointments, setFilteredAppointments] = useState(groupAppointments(durationState, appointmentData, selectedDate, filterWeekStartDate, filterWeekEndDate));

  useEffect(() => {
    const newApp = groupAppointments(durationState, appointmentData, selectedDate, filterWeekStartDate, filterWeekEndDate)
    setFilteredAppointments(newApp)
  }, [selectedDate, filterWeekStartDate, durationState])

  const value = { selectedDate, setSelectedDate, filterWeekStartDate, filterWeekEndDate, 
    setFilterWeekEndDate, setFilterWeekStartDate, filteredAppointments, setFilteredAppointments, 
    durationState, setDurationState, employees}

  return (
    <ScheduleContext.Provider 
      value={value}>
      {children}
    </ScheduleContext.Provider>
  );
};
