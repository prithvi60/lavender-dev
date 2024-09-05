import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HTMLAttributes, useState, useEffect } from "react";
import { areDatesSame, getCurrentTime12HrFormat, range } from '../utils'
import GetIcon from '../../../../assets/Icon/icon';

interface EventProps extends HTMLAttributes<HTMLDivElement> {
    fromTop?: number;
    howLong?: number;
    isToday?: boolean;
    first?: any;
    cols?: any;
    rows?: any;
    statusColor?: string;
    setTop?: boolean
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const HOUR_HEIGHT = 120;
export const HOUR_MARGIN_TOP = 120;
export const Wrapper = styled('div')(({theme}) => `
  width: 100%;
  border: 1px solid #CCCCCC;
  // margin: 15px;
  position: relative;
`);

export const HGrid = styled('div')<EventProps>(({theme, first, cols}) => `
  display: grid;
  grid-template-columns: ${first || ""} repeat(
      ${cols},
      1fr
    );
  width: 100%;
  height: 100%
`);

export const VGrid = styled('div')<EventProps>(({theme, rows, setTop = true}) => `
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr); 
  background: #F2F2F2;
  &:first-child {
    margin-top: ${setTop && HOUR_MARGIN_TOP}px;
  }
`);

export const EmployeeWrapper = styled('span')<EventProps>(({theme, isToday}) => `
  display: grid;
  grid-template-rows: repeat(${24}, 1fr); 
  //background: #F2F2F2;
  position: relative;
  // background: ${(isToday ? "#F2CEE6" : "")};
  // border: 1px solid #CCCCCC;
  max-width: 100%;
  min-width: 317px;

`);

export const DayWrapper = styled('span')<EventProps>(({theme, isToday}) => `
  display: grid;
  grid-template-rows: repeat(${24}, 1fr); 
  background: #F2F2F2;
  position: relative;
  // background: ${(isToday ? "#F2CEE6" : "")};
  // border: 1px solid #CCCCCC;
  //max-width: 100%;
  //min-width: 181px;

`);

export const Hour = styled('div')(({theme}) => `
  height: ${HOUR_HEIGHT}px;
  display: flex;
  align-items: flex-start;
  justify-content: right;
  text-align: end;
  // border: 1px solid #CCCCCC;
`);

export const HourLine = styled('div')<EventProps>(({theme, fromTop}) => `
  position: absolute;
  width: 100%;
  top: ${fromTop}px;
  border: 1px solid #FFA10B;
  left: 21px;
`);

export const FlexBox = styled('div')(({theme}) => `
  display: flex;
  justify-content: space-around;
  font-size: 1.2rem;
  margin-top: 20px;

  button {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`);

export const AppointmentHover = (appointmentData) => {
  const { appointment: {client, bookedThrough, status, estimatedDuration, howLong, service, price} } = appointmentData
  return (
    <div className='flex w-96 h-36 rounded-2xl shadow-2xl'>
      <div className='flex flex-col justify-center items-center w-4/12 bg-[#C9C5FF] rounded-xl text-black font-bold'>
        <GetIcon svgWidth='80' svgHeight='80' className='mb-1' iconName={'ProfileIcon'}/>
        <div>{client}</div>
        <div>{bookedThrough}</div>
      </div>
      <div className='w-8/12 flex flex-col justify-between m-5 text-black'>
         <div className='rounded-3xl w-fit p-1 flex items-center bg-gray-200'>
          <GetIcon svgWidth='30' svgHeight='30' iconName={'SelectedIcon'}/>
          <div className='text-lg mx-2'>{status}</div>
        </div>
         <div className='flex w-full'>
          <div className='flex flex-col w-3/4'>
            <div className='font-bold text-lg'>{service}</div>
            <div>{`${estimatedDuration} | ${Math.round(howLong/60)}`}</div>
          </div>
          <div className='w-1/4 font-bold flex items-center justify-end'>{price}</div>
         </div>
      </div>
    </div>
  )
}

export const HourLineWithLabel: React.FC = () => {

  const [time, setTime] = useState(new Date())
  const hourNow = time.getHours();
  const minutesNow = time.getMinutes();

  const fromTop = 
    (hourNow * HOUR_HEIGHT) + HOUR_MARGIN_TOP + (minutesNow * 2)

  const label= getCurrentTime12HrFormat(hourNow, minutesNow)

  useEffect(() => {

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [time]);
  
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" 
        style={{ width: '45px', zIndex: 20, position:'absolute', 
        top: (fromTop-12) + 'px', color: 'white', backgroundColor: '#FFA10B'|| '#825FFF', 
        left: '17px', borderRadius: '5px',   padding: '5px'}}
      >
        {label}
      </Typography>
      <HourLine fromTop={fromTop} />
    </Box>
  );
};

export const DayHeader = ({currentDay}) => {
  const {day, date} = currentDay
  const selected = areDatesSame(new Date, date)
  return (
    <div className={`h-[120px] flex flex-col  flex-grow-0 items-center justify-center font-bold border-b border-b-gray-400 ${selected ? 'bg-tertiary' : 'bg-white'}`}>
      <div className={`flex justify-center items-center w-20 h-20 rounded-full text-4xl border border-gray-200 font-semibold text-[#4D4D4D]`} style={{backgroundColor: selected ? '#E0B8FF' : '#E6E1FF'}}>
        {date.getDate()}
      </div>
      <div className={`mt-1 ${selected ? 'text-white' : 'text-[#4D4D4D]'}`} style={{fontSize: '18px', fontWeight: 700}}>{day}</div>
    </div>
  )
}

export const HourTimeline = () => {
  return (
    <>
      {range(24).map((hour) => (
        <Hour className="border-r border-[#CCCCCC]">
          {`${!hour ? '12' : ((hour % 12) || '12')}.00`}
          <br/>
          {`${hour >= 12 ? 'PM' : 'AM'}`}
        </Hour>
      ))}
    </>
  )
}