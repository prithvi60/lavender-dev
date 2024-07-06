import * as React from 'react';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Button, Chip, Divider, Grid, Select } from '@mui/material';
import DatePicker from '../../Packages/swiperCalendar/DatePicker.tsx'
import GetIcon from '../../assets/Icon/icon';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';
import { UpdateSelectedDate, UpdateTimeOfDayAndTime } from '../../store/slices/Booking/ScheduleAppoinmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TimeOfDay } from '../../api/type';
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import  './style.css'
import { useEffect, useRef, useState } from 'react';

export default function ScheduleAppointment(props) {
  console.log("props : ", props)
  const datePickerRef = useRef(null);
  const [selectedDateBtn, setSelectedDateBtn] = useState(new Date());
  const { estData, onSetActiveStep } = props
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<any>([]);
  const [clickedChipIndices, setClickedChipIndices] = React.useState(null);
  
  const [employee, setEmployee] = React.useState('');

  let appointmentTimings;
  const dispatch = useDispatch();
  const { selectedDate, timeOfDay, startTime, endTime, id, totalDuration} = useSelector(
    (state: any) => state.ScheduleAppoinment
  );

  // Function to fetch available slots
  const fetchAvailableSlots = async (day) => {

    const payLoad = {
      "startDate": day[0],
      "establishmentId": estData.id,
      // "employeeId": "",
      "totalDuration": 30,
      "serviceTags": [
        "hair"
      ]
    }
    return await endpoint.getAvailableSlots(payLoad);
  };

  async function handleDateClick(day){
    setSelectedDateBtn(day[0]);
  appointmentTimings = await fetchAvailableSlots(day);
  setTimeout(()=>{
    selectedDay(day[0])
  }, 1000)
}

  const selectedDay = (val) => {
    
    const date = new Date(val);
    // Extract year, month, and day
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if month < 10
    const day = ("0" + date.getDate()).slice(-2); // Adding leading zero if day < 10
    // Concatenate the formatted parts
    const formattedDate = `${year}-${month}-${day}`;
    const test = appointmentTimings?.data?.data?.filter(slot => slot.availableDate === formattedDate);
    setAvailableTimeSlots(test);
    setEmployee(id);
    //TODO set date value in store redux
    dispatch(UpdateSelectedDate({selectedDate: formattedDate}));
  };
  

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
    };
  };

  const handleClick = (timePeriod, slot, index) => {
    setClickedChipIndices(slot.startTime)
    dispatch(UpdateTimeOfDayAndTime({TimeOfDay: TimeOfDay[timePeriod],
      startTime : slot.startTime,
      endTime: slot.endTime,
      id:slot.employeeId
    }));
  };
  useEffect(() => { }, [availableTimeSlots])


  return (

    <div className='mt-2 md:mx-16 my-10'>
      <div className='flex gap-3 mb-2 items-center'>
        <GetIcon iconName='BackIcon' onClick={() => onSetActiveStep(0)} />
        <div className='font-bold text-3xl'>Schedule</div>
      </div>

      <div className='mb-4'>

        {/* <DatePicker getSelectedDay={selectedDay}
          endDate={30}
          selectDate={selectedDate}
          labelFormat={"MMMM"}
          color={"black"}
        /> */}
        <ReactWeeklyDayPicker
        ref={datePickerRef} 
            daysCount={7}  //How many days will be shown
            startDay={new Date()} // First day as Date Object or 22 June 2016
            selectedDays={[selectedDateBtn]} // Selected days list
            multipleDaySelect={false} //enables multiple day selection
            selectDay={function(day){ handleDateClick(day)}}
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

      <div className='mt-4'>

        {availableTimeSlots?.length > 0 ? Object.entries(availableTimeSlots[0]?.availableSlots).map(([timePeriod, slotsArray]) => {
          
          return (
            <div className='schedule-chips' key={timePeriod}>
              <p className='font-semibold capitalize'>{timePeriod}</p>
              <div className='flex items-center flex-wrap gap-2'>
                {slotsArray?.map((slot: any, index: any) => {
                  
                  return (
                    <div className='cursor-pointer' key={index}>
                      <Chip
                        label={`${slot.startTime} - ${slot.endTime}`}
                        variant="outlined"
                        onClick={() => handleClick(timePeriod, slot, index)}
                        style={{ backgroundColor: clickedChipIndices === slot.startTime  ? '#E6E1FF' : 'inherit' }} />
                    </div>
                  );
                })}
              </div>
              {/* TODO */}
              <Divider />
            </div>
          );
        })
          :
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <GetIcon onClick={
              () => {
              }}
              className='my-5 mx-16 p-1 cursor-pointer rounded-sm'
              iconName="SlotBoxesFilled" />
            <div id="title" className="font-bold text-xl mb-3 " style={{ color: '#4D4D4D' }}>We are fully booked</div>
            <div style={{ color: '#4D4D4D' }}>How about the next slot ?</div>
            <Button onClick={() => { }} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} variant="contained" >Go to next slot</Button>
          </div>
        }

        <Grid key={100} container item spacing={2}>

          <Grid item xs={3}>
            <p className='font-semibold capitalize'>Service by</p>
          </Grid>

          <Grid container columnSpacing={2} item xs={8}>
            <Grid item>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={employee}
                label="employee"
              >
                <MenuItem value={employee}>{employee}</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>

        <Button onClick={() => onSetActiveStep(2)} variant="outlined">Next</Button>      </div>
    </div>

  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);
