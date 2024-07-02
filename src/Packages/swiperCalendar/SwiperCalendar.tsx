import React from 'react';
import './App.css';
import DatePicker from './DatePicker.tsx';

function SwiperCalendar() {
  
  const selectedDay = (val) => {
    console.log('i swiprwrcalendar ; ', val)
  };

  return (
    <div className="App">
      <DatePicker startDate={new Date()}
        days={90}
        endDate={100}
        selectDate={new Date()}
        getSelectedDay={selectedDay}
        labelFormat={"MMMM"}
        color={"#374e8c"} />
    </div>
  );
}

export default SwiperCalendar;
