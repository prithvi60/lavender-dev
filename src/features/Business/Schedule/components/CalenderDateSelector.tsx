import { getMonthAndDayNames, addTime, getWeekDateRangeFormat } from '../utils'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { CalendarHeaderComponent } from '../../Appointments/AppointmentControllers';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { GetScheduleDates } from '../BusinessScheduleContext';

export const CalenderDateSelector = ({ view }) => {

    const { selectedDate, setSelectedDate, filterWeekStartDate, filterWeekEndDate, 
      setFilterWeekEndDate, setFilterWeekStartDate } = GetScheduleDates()
    console.log("CalenderDateSelector 2", selectedDate, filterWeekStartDate, filterWeekEndDate)
  
    const handleLeftClick = () => {
      if(view === 'Day') {
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
      if(view === 'Day') {
        setSelectedDate(addTime(selectedDate, 'days', 1))
      }
      else {
        const newStartDate = addTime(filterWeekStartDate, 'days', 7)
        setFilterWeekStartDate(newStartDate)
        const newEndDate = addTime(filterWeekEndDate, 'days', 7)
        setFilterWeekEndDate(newEndDate)
      }
    }
    
    return (
        <div>
            <DropdownMenu>
                
                  <div className='w-72 flex justify-between font-bold border border-gray-400 border-solid rounded-lg'>
                    <button className='p-2 border-r border-r-gray-400 border-solid' onClick={handleLeftClick}>
                      <ChevronLeft/>
                    </button>
                      <DropdownMenuTrigger>
                        {
                          view === 'Day' ? 
                          <div>
                            {getMonthAndDayNames(selectedDate)}
                          </div>
                          :
                          <div>
                            {getWeekDateRangeFormat(filterWeekStartDate, filterWeekEndDate)}
                          </div>
                        }
                      </DropdownMenuTrigger>
  
                    <button className='p-2 border-l border-l-gray-400 border-solid' onClick={handleRightClick}>
                      <ChevronRight/>
                    </button>
  
                  </div>
                <DropdownMenuContent className='bg-white relative z-50 '>
                  <CalendarHeaderComponent date={selectedDate} onChange={setSelectedDate}/>
                </DropdownMenuContent>
            </DropdownMenu>
  
        </div>
    )
  }