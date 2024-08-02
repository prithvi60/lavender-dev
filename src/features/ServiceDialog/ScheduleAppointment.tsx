import * as React from 'react';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
// import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from '../../Packages/swiperCalendar/DatePicker.tsx'
import GetIcon from '../../assets/Icon/icon';
import { useQuery } from '@tanstack/react-query';
import endpoint from '../../api/endpoints.ts';
import { UpdateEmployeeId, UpdateSelectedDate, UpdateTimeOfDayAndTime } from '../../store/slices/Booking/ScheduleAppoinmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TimeOfDay } from '../../api/type';
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import  './style.css'
import { useEffect, useRef, useState } from 'react';
import Chip from '../../components/Chip.js';


export default function ScheduleAppointment(props) {
  const datePickerRef = useRef(null);
  const [selectedDateBtn, setSelectedDateBtn] = useState(new Date());
  const { estData, onSetActiveStep } = props
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<any>([]);
  const [clickedChipIndices, setClickedChipIndices] = React.useState(null);
  
  const [employee, setEmployee] = React.useState(['']);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [timePeriodValue, setTimePeriodValue] = React.useState([]);
  const [indexValue, setIndexValue] = React.useState([]);
  const [totalDurationValue, setTotalDurationValue] = useState(0);
  const[startTimeValue, setStartTimeValue] = useState('11:59 pm');
  const[dateClicked, setDateClicked] = useState(false);
  const [employeeList, setEmployeeList] = useState(props?.estData?.employees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [employeeSlot, setEmployeeSlot] = useState('');

  let appointmentTimings;
  const dispatch = useDispatch();
  const { selectedDate, timeOfDay, startTime, endTime, id, totalDuration} = useSelector(
    (state: any) => state.ScheduleAppoinment
  );

  // Function to fetch available slots
  const fetchAvailableSlots = async (day) => {
    const payLoad = {
      "startDate": day[0],
      "establishmentId": estData?.id,
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
  useEffect(() => { handleDateClick(new Date().toISOString())}, [])

  const [selectedPaymentChips, setSelectedPaymentChips] = useState([]);

  useEffect(()=>{

  },[totalDuration, totalDurationValue])

  const handleChipClick = (timePeriod, slot, index) => {
    const currentDate = new Date();
    const currentDateValue = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`
    // Parse time strings into Date objects
    const startTime: any = new Date(`${currentDateValue} ${slot.startTime}`);
    const endTime: any = new Date(`${currentDateValue} ${slot.endTime}`);

    // Calculate the difference in milliseconds
    const timeDiffInMilliseconds = Math.abs(endTime - startTime);

    const newTotalDurationValue = totalDurationValue + timeDiffInMilliseconds / (1000 * 60);
    setTotalDurationValue(newTotalDurationValue);

    if(totalDuration <= newTotalDurationValue){
      if(timePeriodValue === timePeriod && indexValue === index){
        setIsDisabled(false)
      }
      else{
        setIsDisabled(true)
      }
      
    }
    setTimePeriodValue([...timePeriodValue, timePeriod])
    setIndexValue([...indexValue, index])

    const item = `${slot.startTime} - ${slot.endTime}`;
    
    const updatedChips = selectedPaymentChips.includes(item)
      ? selectedPaymentChips.filter((chip) => chip !== item)
      : [...selectedPaymentChips, item];
    setSelectedPaymentChips(updatedChips);
    setEmployeeSlot(slot?.employeeId)

    dispatch(UpdateTimeOfDayAndTime({TimeOfDay: TimeOfDay[timePeriod],
      startTime : calculateTime(slot?.startTime),
      endTime: slot?.endTime,
    }));

  };

  function calculateTime(newStartTime){
    
    const convertTo24Hour = (time12h) => {
      const [time, period] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours);
      if (period === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period === 'am' && hours === 12) {
        hours = 0;
      }
      return hours * 60 + parseInt(minutes);
    };
    
    const startTimeInMinutes = convertTo24Hour(startTimeValue);
    const newStartTimeInMinutes = convertTo24Hour(newStartTime);
    
    // Compare times
    if (newStartTimeInMinutes < startTimeInMinutes) {
      setStartTimeValue(newStartTime)
      return newStartTime;
    }
    return startTimeValue;
  }

  const handleChipDelete = (timePeriod, slot, index) => {

    // Parse time strings into Date objects
    const startTime: any = new Date(`1970/01/01 ${slot.startTime}`);
    const endTime: any = new Date(`1970/01/01 ${slot.endTime}`);

    // Calculate the difference in milliseconds
    const timeDiffInMilliseconds = Math.abs(endTime - startTime);

    const newTotalDurationValue = totalDurationValue - timeDiffInMilliseconds / (1000 * 60);
    setTotalDurationValue(newTotalDurationValue);

    setIsDisabled(false)
    const item = `${slot.startTime} - ${slot.endTime}`;

    const updatedChips = selectedPaymentChips.filter((chip) => chip !== item);
    setSelectedPaymentChips(updatedChips);
  };

  // Handle employee selection
  const handleChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  useEffect(()=> {
    dispatch(UpdateEmployeeId({
      id: selectedEmployeeId ? selectedEmployeeId : employeeSlot,
    }))
  })

  return (

    <div className='mt-2 md:mx-16 my-10'>
      <div className='flex gap-3 mb-2 items-center'>
        <IconButton onClick={() => onSetActiveStep(0)}>
          <GetIcon iconName='BackIconArrow'  />
        </IconButton>
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
            selectDay={function(day){ handleDateClick(day); setDateClicked(true);}}
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

        {availableTimeSlots?.length > 0 ? Object.entries(availableTimeSlots[0]?.availableSlots).map(([timePeriod, slotsArray]:any) => {
          
          return (
            <div className='schedule-chips' key={timePeriod}>
              <p style={{fontSize: '20px', fontWeight: 600, color: '#4D4D4D'}}>{timePeriod}</p>
              <div className='flex items-center flex-wrap gap-2'>
                {slotsArray?.map((slot: any, index: any) => {
                  return (
                    <div className='cursor-pointer' key={index}>
                      {/* <Chip
                        disabled={isDisabled && ((timePeriodValue === timePeriod && indexValue === index) ? false : true) }
                        label={`${slot.startTime} - ${slot.endTime}`}
                        variant="outlined"
                        onClick={() => handleClick(timePeriod, slot, index)}
                        style={{ backgroundColor: clickedChipIndices === slot.startTime  ? '#E6E1FF' : 'inherit' }} /> */}


                      <Chip
                        disabled={isDisabled && ((timePeriodValue?.includes(timePeriod) && indexValue?.includes(index)) ? false : true) }
                        type={selectedPaymentChips.includes(`${slot.startTime} - ${slot.endTime}`) ? 'deletable' : 'clickable'}
                        label={`${slot.startTime} - ${slot.endTime}`}
                        onDelete={() => handleChipDelete(timePeriod, slot, index)}
                        deleteIcon={
                          selectedPaymentChips.includes(`${slot.startTime} - ${slot.endTime}`) ? (
                            <IconButton>
                              <GetIcon iconName='CloseIcon' />
                            </IconButton>
                          ) : undefined
                        }
                        onClick={() => handleChipClick(timePeriod, slot, index)}
                        style={{
                          margin: '5px',
                          backgroundColor: selectedPaymentChips.includes(`${slot.startTime} - ${slot.endTime}`)
                            ? '#E6E1FF'
                            : '#F2F2F2',
                        }}
                      />

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
          <div>
            {dateClicked ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
              <GetIcon onClick={
                () => {
                }}
                className='my-5 mx-16 p-1 cursor-pointer rounded-sm'
                iconName="SlotBoxesFilled" />
              <div id="title" className="font-bold text-xl mb-3 " style={{ color: '#4D4D4D' }}>We are fully booked</div>
              <div style={{ color: '#4D4D4D' }}>How about the next slot ?</div>
              <Button onClick={() => { }} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', borderRadius: '10px', fontSize: '16px', fontWeight: 600, textTransform: 'none' }} variant="contained" >Go to next slot</Button>
            </div>
            ) 
            : 
            (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                <GetIcon onClick={
                  () => {
                  }}
                  className='my-5 mx-16 p-1 cursor-pointer rounded-sm'
                  iconName="SlotBoxesFilled" />
                <div id="title" className="font-bold text-xl mb-3 " style={{ color: '#4D4D4D' }}>Select a date to book your slot</div>
            </div>
            )}
          </div>
        }

<Grid container spacing={2} sx={{marginTop: '10px'}}>
      <Grid item xs={3}>
        <p style={{fontSize: '20px', fontWeight: 600, color: '#4D4D4D', }}>Service by</p>
      </Grid>

      <Grid item xs={8}>
        <FormControl fullWidth>
          <Select
            id="employee-select"
            value={selectedEmployeeId}
            onChange={handleChange}
            sx={{width: '300px', height: '45px'}}
            
          >
            {employeeList?.map((employee) => (
              <MenuItem key={employee?.employeeId} value={employee?.employeeId}>
                {employee?.employeeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>

       </div>
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

// const MenuItem = styled(BaseMenuItem)(
//   ({ theme }) => `
//   list-style: none;
//   padding: 8px;
//   border-radius: 8px;
//   cursor: default;
//   user-select: none;

//   &:last-of-type {
//     border-bottom: none;
//   }

//   &:focus {
//     outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
//     background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
//     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   }

//   &.${menuItemClasses.disabled} {
//     color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
//   }
//   `,
// );



