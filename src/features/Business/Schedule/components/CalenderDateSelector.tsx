import React, { useState } from 'react';
import { getMonthAndDayNames, addTime, getWeekDateRangeFormat } from '../utils'
import { GetScheduleDates } from '../BusinessScheduleContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Divider } from '@mui/material';
const LeftArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const CalenderDateSelector = () => {
  const { selectedDate, setSelectedDate, filterWeekStartDate, filterWeekEndDate, 
    setFilterWeekEndDate, setFilterWeekStartDate, durationState } = GetScheduleDates()
 
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const handleLeftClick = () => {
    if(durationState === 'Day') {
      setSelectedDate(addTime(selectedDate, 'days', -1))
    }
    else {
      const newStartDate = addTime(filterWeekStartDate, 'days', -7)
      setFilterWeekStartDate(newStartDate)
      const newEndDate = addTime(filterWeekEndDate, 'days', -7)
      setFilterWeekEndDate(newEndDate)
    }
  }
  
  const handleRightClick = () => {
    if(durationState === 'Day') {
      setSelectedDate(addTime(selectedDate, 'days', 1))
    }
    else {
      const newStartDate = addTime(filterWeekStartDate, 'days', 7)
      setFilterWeekStartDate(newStartDate)
      const newEndDate = addTime(filterWeekEndDate, 'days', 7)
      setFilterWeekEndDate(newEndDate)
    }
  }
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(addTime(currentMonth, 'months', -1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addTime(currentMonth, 'months', 1));
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
      <button className='p-2 border-r border-r-gray-400 border-solid' onClick={handleLeftClick}>
                      <ChevronLeft/>
                    </button>
                      <DropdownMenuTrigger className='w-full'>
                        {
                          durationState === 'Day' ? 
                          <div style={{color: '#4D4D4D', fontWeight: 700, fontSize: '18px', paddingLeft: '10px', paddingRight: '10px'}}>
                            {getMonthAndDayNames(selectedDate)}
                          </div>
                          :
                          <div style={{color: '#4D4D4D', fontWeight: 700, fontSize: '18px', paddingLeft: '10px', paddingRight: '10px'}}>
                            {getWeekDateRangeFormat(filterWeekStartDate, filterWeekEndDate)}
                          </div>
                        }
                      </DropdownMenuTrigger>
  
                    <button className='p-2 border-l border-l-gray-400 border-solid' onClick={handleRightClick}>
                      <ChevronRight/>
                    </button>
  
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white rounded-xl shadow-lg p-4 w-[320px] z-50">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-1">
            <LeftArrowIcon />
          </button>
          <h2 className="text-sm font-semibold text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button onClick={handleNextMonth} className="p-1">
            <RightArrowIcon />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <Divider className='border-b-gray-300 border-solid' />
        <div className="grid grid-cols-7 gap-1">
          {[...Array((firstDayOfMonth + 6) % 7).keys()].map((_, index) => (
            <div key={`empty-${index}`} className="h-8"></div>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => {
            const date = day + 1;
            const isSelected = date === selectedDate.getDate() && 
                               currentMonth.getMonth() === selectedDate.getMonth() && 
                               currentMonth.getFullYear() === selectedDate.getFullYear();
            const isToday = date === new Date().getDate() &&
                            currentMonth.getMonth() === new Date().getMonth() &&
                            currentMonth.getFullYear() === new Date().getFullYear();
            return (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`h-8 w-8 flex items-center justify-center rounded-[6px] text-sm ${
                  isSelected
                    ? 'bg-[#7F56D9] text-white font-semibold'
                    : isToday
                    ? 'bg-[#F4EBFF] text-[#7F56D9] font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {date}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};