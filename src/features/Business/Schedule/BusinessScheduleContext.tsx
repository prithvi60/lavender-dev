import { createContext, useContext, useEffect, useState } from 'react';
import { addTime, appointments, weekappointments, filterAppointmentsByDate, getMonday, groupAppointmentsByEmployee, getEmployeesList, groupAppointments, getWeekEndDate } from './utils';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../../api/endpoints';
import { useSelector } from 'react-redux';

const ScheduleContext = createContext(null);

export const GetScheduleDates = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {

  const [durationState, setDurationState] = useState('Day')
  const [ selectedDate , setSelectedDate] = useState(new Date())
  const [ filterWeekStartDate , setFilterWeekStartDate] = useState(getMonday())
  const [ filterWeekEndDate , setFilterWeekEndDate] = useState(getWeekEndDate())
  const employees = [{employeeName: 'John test'}, {employeeName: 'John two'}, {employeeName: 'John three'}, 
    {employeeName: 'John four'}, {employeeName: 'John five'}, {employeeName: 'John six'}]
  // API call for getting appointments for given date range
  // const payload = {
  //   "fromDate": "2024-06-01T23:27:00.000+00:00",
  //   "toDate": "2024-06-01T23:27:00.000+00:00"
  // }
  // const {isLoading, data: userInfo} = useQuery({queryKey: ["query-user-info"], queryFn: () => { return endpoint.getBusinessAppointments(payload)}})

  // !isLoading && console.log("userInfo ScheduleProvider >", userInfo)

  //gets establishmentState from store
  // const establishmentState = useSelector(
  //   (state: any) =>  state.businessEstablishment
  // );
  // const employees =(getEmployeesList(establishmentState))

  //appointments will be filtered by date from API itself - only filter by employees in CS
  const [filteredAppointments, setFilteredAppointments] = useState(groupAppointments(durationState, weekappointments, selectedDate, filterWeekStartDate, filterWeekEndDate));

  useEffect(() => {
    const newApp = groupAppointments(durationState, weekappointments, selectedDate, filterWeekStartDate, filterWeekEndDate)
    setFilteredAppointments(newApp)
    console.log("filterAppointmentsByDate >",newApp)
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
