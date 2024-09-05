import React from 'react'
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import  './style.css'

const styles = {
    container : '',
    prevWeekArrow: '',
    nextWeekArrow: '',
    dayBox: '',
    dayCircleContainer: '',
    dayCicle: '',
    dayCircleTodayText: '',
    dayCircleUnavailable: '',
    dayCircleUnavailableText: '',
    dayCicleSelected: '',
  }

export const ReactWeeklyDatePicker = () => {
  return (
    <div>
        <ReactWeeklyDayPicker
            daysCount={7}  //How many days will be shown
            classNames={styles}  //Overrides classnames for custom classes (below example)
            startDay={new Date()} // First day as Date Object or 22 June 2016
            selectedDays={['22 June 2017', new Date()]} // Selected days list
            multipleDaySelect={false} //enables multiple day selection
            selectDay={function(day){ console.log('hi ', day)}}
            unselectDay={function(day){}}
            onPrevClick={function(startDay, selectedDays){}} // called with the new startDay
            onNextClick={function(startDay, selectedDays){}} // called with the new startDay
            unselectable={false} // if true allows to unselect a date once it has been selected. Only works when multipleDaySelect={false}
            format={'YYYY-MM-DD'} //format of dates that handled in selectDay and unselectDay functions
            firstLineFormat={'ddd'} // format for the first line of the day button
            secondLineFormat={'MMM D'} // format for the second line of the day button
            firstLineMobileFormat={'dddd'} // format for the first line of the day button mobile
            secondLineMobileFormat={'MMMM D, Y'} // format for the second line of the day button mobile
            
            beforeToday={false}   // all dates before today set as unavailable (default:true)
           
            todayText={"today"}  // replacing today text (default : - TODAY -)
            unavailableText={""}  // replacing unavailable text (default: unavailable )
            />
    </div>
  )
}
