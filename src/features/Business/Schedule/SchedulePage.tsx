import React, { useEffect, useState } from 'react'
import { WeeklyCalendar } from './WeeklyCalender'
import { Button } from '../../../components/ui/button'
import { DayCalendar } from './DayCalender'
import GetIcon from '../../../assets/Icon/icon'
import { CalenderDateSelector } from './components/CalenderDateSelector'
import { GetScheduleDates, ScheduleProvider } from './BusinessScheduleContext'
import { addTime, getMonday } from './utils'
import { useDrawer } from '../BusinessDrawerContext'

function SchedulePage() {

  const { durationState, setDurationState, setSelectedDate, setFilterWeekEndDate, setFilterWeekStartDate } = GetScheduleDates()
  const { openDrawer } = useDrawer()

  const setCurrentDuration = () => {
    if(durationState === 'Day') {
      setSelectedDate(new Date())
    }else {
      const monday = getMonday()
      setFilterWeekStartDate(monday)
      setFilterWeekEndDate(addTime(monday, 'days', 6))
    }
  }

  return (
      <div>
        <div id='Header' className='flex justify-between m-3 
        overflow-x-auto' 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#888 #f1f1f1',
        }}
        >
          <div className='flex  items-center'>
            <Button className='bg-white mr-10 font-bold' variant='outline' onClick={setCurrentDuration} 
            
            style={{color: '#4D4D4D', fontWeight: 700, fontSize: '18px'}}>
              {durationState === 'Day' ? 'Today' : 'This Week'}
            </Button>
            <div>
              <CalenderDateSelector />
            </div>
          </div>

          <div className='flex items-center'>
            <Button onClick={() => openDrawer('FilterDrawer')} variant='outline' className='w-10 border-2'>
              <GetIcon iconName='FilterIcon'/>
            </Button>
            <div className='flex border rounded w-60 ml-10'>
              <Button onClick={() => setDurationState('Day')} className={`w-full font-bold text-lg`} style={{backgroundColor: durationState === 'Day' ? '#825FFF' : '', color: durationState === 'Day' ? 'white' : '#616161'}} variant='null'>Day</Button>
              <Button onClick={() => setDurationState('Week')} className={`w-full font-bold text-lg`} style={{backgroundColor: durationState === 'Week' ? '#825FFF' : '', color: durationState === 'Week' ? 'white' : '#616161'}} variant='null'>Week</Button>
            </div>
          </div>

        </div>
        <div className='overflow-x-auto'>
          {durationState === 'Day' ? <DayCalendar/> : 
          <WeeklyCalendar/>
          }
        </div>
      </div>    
  )
}

function SchedulePageWrapper() {
  return (
    <ScheduleProvider>
      <SchedulePage/>
    </ScheduleProvider>
  )
}
export default SchedulePageWrapper