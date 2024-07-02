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

export default function ScheduleAppointment(props) {
  const { estData, onSetActiveStep } = props
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<any>([]);
  const [clickedChipIndices, setClickedChipIndices] = React.useState({});
  const dispatch = useDispatch();
  const { selectedDate, timeOfDay, startTime, endTime, id} = useSelector(
    (state: any) => state.ScheduleAppoinment
  );
  
  console.log("id ;: ", id)
  // useQuery with enabled option that depends on selectedDate
  const { isLoading, data: appointmentTimings } = useQuery({ queryKey:
    ['query-appointment-timing'],
    queryFn: () => fetchAvailableSlots()}
  );


  // Function to fetch available slots
  const fetchAvailableSlots = async () => {
    // const payLoad = { date }; // Adjust payload as needed
    // const currentDate = new Date();

  const payLoad = {
    "startDate": new Date(),
    "establishmentId": estData.id,
    "employeeId": "string",
    "totalDuration": 30,
    "serviceTags": [
      "hair"
    ]
  }
    return await endpoint.getAvailableSlots(payLoad);
  };



  const selectedDay = (val) => {
    const date = new Date(val);
    // Extract year, month, and day
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if month < 10
    const day = ("0" + date.getDate()).slice(-2); // Adding leading zero if day < 10

    // Concatenate the formatted parts
    const formattedDate = `${year}-${month}-${day}`;
    
    const test = appointmentTimings?.data?.data?.filter(slot => slot.availableDate === formattedDate);
console.log('test : ',test)
    setAvailableTimeSlots(test);
    //TODO set date value in store redux
    dispatch(UpdateSelectedDate({selectedDate: date}));

  };
  

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  const handleClick = (timePeriod, slot, index) => {
    console.log('slot L : ', slot)
    console.log(`Clicked chip Start Time ${timePeriod},- ${slot.startTime}, End Time - ${slot.endTime}`);
    dispatch(UpdateTimeOfDayAndTime({TimeOfDay: TimeOfDay[timePeriod],
      startTime : slot.startTime,
      endTime: slot.endTime,
      id:slot.id
    }));
  };
  React.useEffect(() => { }, [availableTimeSlots])
  return (

    <div className='mt-2 md:mx-16 my-10'>
      <div className='flex gap-3 mb-2 items-center'>
        <GetIcon iconName='BackIcon' onClick={() => onSetActiveStep(0)} />
        <div className='font-bold text-3xl'>Schedule</div>
      </div>

      <div className='mb-4'>

        <DatePicker getSelectedDay={selectedDay}
          endDate={30}
          selectDate={selectedDate}
          labelFormat={"MMMM"}
          color={"black"}
        />

      </div>

      <div className='mt-4'>

        {!isLoading && availableTimeSlots?.length > 0 ? Object.entries(availableTimeSlots[0]?.availableSlots).map(([timePeriod, slotsArray]) => {
          debugger
          return (
            <div className='schedule-chips' key={timePeriod}>
              <p className='font-semibold capitalize'>{timePeriod}</p>
              <div className='flex items-center flex-wrap gap-2'>
                {slotsArray?.map((slot: any, index) => {
                  return (
                    <div className='cursor-pointer' key={index}>
                      <Chip
                        label={`${slot.startTime} - ${slot.endTime}`}
                        variant="outlined"
                        onClick={() => handleClick(timePeriod, slot, index)}
                        style={{ backgroundColor: slot.id === id  ? '#E6E1FF' : 'inherit' }} />
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
                console.log("filter icon clicked")
              }}
              className='my-5 mx-16 p-1 cursor-pointer rounded-sm'
              iconName="SlotBoxesFilled" />
            <div id="title" className="font-bold text-xl mb-3 " style={{ color: '#4D4D4D' }}>We are fully booked</div>
            <div style={{ color: '#4D4D4D' }}>How about the next slot on 20th March ?</div>
            <Button onClick={() => { }} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} variant="contained" >Go to 20th March</Button>
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
                value={'age'}
                label="Age"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
