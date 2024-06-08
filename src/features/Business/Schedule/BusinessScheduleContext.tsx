import { createContext, useContext, useState } from 'react';
import { addTime, getMonday } from './utils';

const ScheduleContext = createContext(null);

export const GetScheduleDates = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const [ selectedDate , setSelectedDate] = useState(new Date())
  const [ filterWeekStartDate , setFilterWeekStartDate] = useState(getMonday())
  const [ filterWeekEndDate , setFilterWeekEndDate] = useState(addTime(filterWeekStartDate, 'days', 6))
  

  return (
    <ScheduleContext.Provider 
      value={{ selectedDate, setSelectedDate, filterWeekStartDate, filterWeekEndDate, 
      setFilterWeekEndDate, setFilterWeekStartDate }}>
      {children}
    </ScheduleContext.Provider>
  );
};
