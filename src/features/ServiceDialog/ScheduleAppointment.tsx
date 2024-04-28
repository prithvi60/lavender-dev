import * as React from 'react';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { Button, Chip, Divider, Grid, Select } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DatePicker from '../../Packages/swiperCalendar/DatePicker.tsx'
import GetIcon from '../../assets/Icon/icon';

export default function ScheduleAppointment(props) {
  
  const {onSetActiveStep} =props
  const selectedDay = (val) => {
    console.log(val)
    //TODO set date value in store redux
  };

  const Timings = {
    morning: ['8:00 am', '9:00 am', '10:00 am'],
    afternoon: ['8:00 am', '9:00 am', '10:00 am'],
    evening: ['8:00 am', '9:00 am', '10:00 am']
  }

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (

    <div className='mt-2 md:mx-16 my-10'>
      <div className='flex gap-3 mb-2 items-center'>
      <GetIcon iconName='BackIcon' onClick={()=>onSetActiveStep(0)}/>
      <div className='font-bold text-3xl'>Schedule</div>
      </div>

      <div className='mb-4'>

      <DatePicker getSelectedDay={selectedDay}
        endDate={30}
        selectDate={new Date("2020-04-30")}
        labelFormat={"MMMM"}
        color={"#FFFFFFFF"}
      />
        
      </div>

      <div className='mt-4'>

        {Object.entries(Timings).map((item,index) => {
          
          console.log('item :', item)
          return <>
            <div className='schedule-chips'>
              <p className='font-semibold capitalize'>{item[0]}</p>
              <div className='flex items-center flex-wrap gap-2'>
                {item[1].map((item,index) => {
                  return <>
                    <div className='cursor-pointer' key={index}>
                      <Chip label={item} variant="outlined" />
                    </div>
                  </>
                })}
              </div>
              {/* TODO */}
            <Divider />
            </div>
          </>
        })
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

        <Button onClick={()=>onSetActiveStep(2)} variant="outlined">Next</Button>      </div>
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
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
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
