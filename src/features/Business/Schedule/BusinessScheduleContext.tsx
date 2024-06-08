import { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext(null);

export const GetScheduleDates = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const [ selectedDate , setSelectedDate] = useState(new Date())
  const [ filterWeekStartDate , setFilterWeekStartDate] = useState(new Date())
  const [ filterWeekEndDate , setFilterWeekEndDate] = useState('')
  

  return (
    <ScheduleContext.Provider 
      value={{ selectedDate, setSelectedDate, filterWeekStartDate, filterWeekEndDate, 
      setFilterWeekEndDate, setFilterWeekStartDate }}>
      {children}
    </ScheduleContext.Provider>
  );
};
