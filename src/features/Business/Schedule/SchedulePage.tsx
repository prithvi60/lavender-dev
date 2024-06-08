import React, { useState } from 'react'
import { WeeklyCalendar } from './WeeklyCalender'
import { Button } from '../../../components/ui/button'
import { DayCalendar } from './DayCalender'
import GetIcon from '../../../assets/Icon/icon'
import { CalenderDateSelector } from './CalenderComponents'
import { ScheduleProvider } from './BusinessScheduleContext'
const appointments = [
  { date: new Date(2024, 5, 2, 0, 30), text: "first hi", howLong: 3, status: '#8280BA', employee: 'John test' },
  { date: new Date(2024, 4, 26, 19, 15), text: "second", howLong: 2, status: '#35AFAC', employee: 'John test' },
  { date: new Date(2024, 5, 1, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John two' },
  { date: new Date(2024, 0, 2, 13), text: "forth", howLong: 2, status: '#E6E1FF', employee: 'John test' },
  { date: new Date(2024, 5, 1, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John three' },
  { date: new Date(2024, 5, 1, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John four' },
  { date: new Date(2024, 0, 2, 13), text: "forth", howLong: 2, status: '#E6E1FF', employee: 'John five' },
  { date: new Date(2024, 5, 1, 11), text: "third", howLong: 2, status: '#FF83B0', employee: 'John six' },
  // { date: new Date(), text: "Current appointment", howLong: 2, status: '#', employee: 'John four' },
]

function filterAppointmentsByDate(appointments) {
  const filteredAppointments = []
  
  return filteredAppointments
}

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
    <ScheduleProvider>
      <div>
        <div id='Header' className='flex justify-between m-3' >
          <div className='flex  items-center'>
            <Button className='shadow-lg bg-white mr-10' variant='outline' color='inherit' style={{fontWeight:'bold'}}>Today</Button>
            <div>
              <CalenderDateSelector 
                  view={durationState}
              />
            </div>
          </div>

          <div className='flex items-center'>
            <Button variant='outline' className='w-10 border-2'>
              <GetIcon iconName='FilterIcon'/>
            </Button>
            <div className='flex border rounded w-40 ml-10'>
              <Button onClick={() => setDurationState('Day')} className={`w-1/2 font-bold  ${durationState === 'Day' ? 'bg-primary text-white' : ''}`} variant='null'>Day</Button>
              <Button onClick={() => setDurationState('Week')} className={`w-1/2 font-bold ${durationState === 'Week' ? 'bg-primary text-white' : ''}`} variant='null'>Week</Button>
            </div>
          </div>

        </div>
        <div >
          {durationState === 'Day' ? <DayCalendar data={filteredAppointments}/> : <WeeklyCalendar data={appointments}/>}
        </div>
    </div>

    </ScheduleProvider>
    
  )
}

export default SchedulePage