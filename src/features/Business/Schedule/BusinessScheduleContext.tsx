import { createContext, useContext, useEffect, useState } from 'react';
import { getMonday, groupAppointments, getWeekEndDate, parseAppointmentResponse } from './utils';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../../api/endpoints';
import { useSelector } from 'react-redux';
import { useFetchAppointments, useFetchEmployees } from '../BusinessHooks';
import { getBrowserCache } from '../../../api/constants';

const ScheduleContext = createContext(null);

export const GetScheduleDates = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  
  const [durationState, setDurationState] = useState('Week')
  const [ selectedDate , setSelectedDate] = useState(new Date())
  const [ filterWeekStartDate , setFilterWeekStartDate] = useState(getMonday())
  const [ filterWeekEndDate , setFilterWeekEndDate] = useState(getWeekEndDate())
  
  const employees = useFetchEmployees()

  const estId = getBrowserCache("EstablishmentId")
  
  // console.log("estId", estId)
  const payload = 
    {
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
  const {isLoading, data: userInfo} = useFetchAppointments(payload)

  let appointmentData = [];
  if(!isLoading && userInfo){
    const { data: { data: {content, ...pageD} } } = userInfo
    appointmentData = parseAppointmentResponse(content)
  }
  
  //appointments will be filtered by date from API itself - only filter by employees in CS
  const [filteredAppointments, setFilteredAppointments] = useState(groupAppointments(durationState, appointmentData, selectedDate, filterWeekStartDate, filterWeekEndDate));

  useEffect(() => {
    if (userInfo) { 
      const newApp = groupAppointments(durationState, appointmentData, selectedDate, filterWeekStartDate, filterWeekEndDate)
      setFilteredAppointments(newApp)
    }
  }, [selectedDate, filterWeekStartDate, durationState, appointmentData, filterWeekEndDate, userInfo])

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
