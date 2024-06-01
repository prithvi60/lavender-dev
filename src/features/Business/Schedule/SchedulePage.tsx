import React, { useState } from 'react'
import { WeeklyCalendar } from './WeeklyCalender'
import { Button } from '../../../components/ui/button'
import { DayCalendar } from './DayCalender'
import GetIcon from '../../../assets/Icon/icon'

const appointments = [
  { date: new Date(2024, 4, 26, 10), text: "first hi", howLong: 3, employee: 'John test' },
  { date: new Date(2024, 4, 26, 19), text: "second", howLong: 2, employee: 'John test' },
  { date: new Date(2024, 5, 1, 11), text: "third", howLong: 2, employee: 'John two' },
  { date: new Date(2024, 0, 2, 13), text: "forth", howLong: 2, employee: 'John test' },
  { date: new Date(), text: "Current appointment", howLong: 2, employee: 'John four' },
]

function groupAppointmentsByEmployee(appointments) {
  const grouped = {};
  
  appointments.forEach(appointment => {
    const employee = appointment.employee;
    
    if (!grouped[employee]) {
      grouped[employee] = { employee, appointments: [] };
    }
    
    grouped[employee].appointments.push(appointment);
  });

  return Object.values(grouped);
}

function SchedulePage() {

  const [durationState, setDurationState] = useState('Day')

  const filteredAppointments = groupAppointmentsByEmployee(appointments)
  return (
    <div>
      <div id='Header' className='flex justify-between m-3' >
        <div className='flex  items-center'>
          <Button className='shadow-lg bg-white' variant='outline' color='inherit' style={{fontWeight:'bold'}}>Today</Button>
          <div>Calender date range picker</div>
        </div>

        <div className='flex items-center'>
          <Button variant='outline' className='w-10 border-2'>
            <GetIcon iconName='FilterIcon'/>
          </Button>
          <div className='flex border rounded w-40'>
            <Button onClick={() => setDurationState('Day')} className={`w-1/2 font-bold  ${durationState === 'Day' ? 'bg-primary text-white' : ''}`} variant='null'>Day</Button>
            <Button onClick={() => setDurationState('Week')} className={`w-1/2 font-bold ${durationState === 'Week' ? 'bg-primary text-white' : ''}`} variant='null'>Week</Button>
          </div>
        </div>

      </div>
      {durationState === 'Day' ? <DayCalendar data={filteredAppointments}/> : <WeeklyCalendar data={appointments}/>}
    </div>
  )
}

export default SchedulePage