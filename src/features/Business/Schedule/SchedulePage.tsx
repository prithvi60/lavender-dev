import React, { useEffect, useState } from 'react'
import { WeeklyCalendar } from './WeeklyCalender'
import { Button } from '../../../components/ui/button'
import { DayCalendar } from './DayCalender'
import GetIcon from '../../../assets/Icon/icon'
import { CalenderDateSelector } from './components/CalenderDateSelector'
import { GetScheduleDates, ScheduleProvider } from './BusinessScheduleContext'

function SchedulePage() {

  const { durationState, setDurationState } = GetScheduleDates()

  return (
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
          {durationState === 'Day' ? <DayCalendar/> : 
          //<WeeklyCalendar data={filteredAppointments}/>
          <></>
          }
        </div>
      </div>    
  )
}

function SchedulePageWrapper({children}) {
  return (
    <ScheduleProvider>
      <SchedulePage/>
    </ScheduleProvider>
  )
}
export default SchedulePageWrapper