import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HTMLAttributes, useState, useEffect } from "react";
import { getCurrentTime12HrFormat } from '../utils'

interface EventProps extends HTMLAttributes<HTMLDivElement> {
    fromTop?: number;
    howLong?: number;
    isToday?: boolean;
    first?: any;
    cols?: any;
    rows?: any;
    statusColor?: string;
}

export const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

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

export const VGrid = styled('div')<EventProps>(({theme, rows}) => `
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr); 
  background: #F2F2F2;
  &:first-child {
    margin-top: ${HOUR_MARGIN_TOP}px;
  }
`);

export const DayWrapper = styled('span')<EventProps>(({theme, isToday}) => `
  display: grid;
  grid-template-rows: repeat(${24}, 1fr); 
  background: #F2F2F2;
  position: relative;
  // background: ${(isToday ? "#F2CEE6" : "")};
  // border: 1px solid #CCCCCC;
  max-width: 100%;
  min-width: 317px;

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
  border: 1px solid #825FFF;
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

export const Appointment = styled('div')<EventProps>(({theme, fromTop, howLong, statusColor}) => `
  position: absolute;
  top: ${fromTop}px;
  background: ${statusColor};
  height: ${howLong * HOUR_HEIGHT}px;
  color: ${statusColor === '#E6E1FF' ? 'black' : 'white'};
  width: 98%;
  margin: 0px 2px;
  padding: 5px;
  border-radius: 12px;
`);

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
        top: (fromTop-12) + 'px', color: 'white', backgroundColor: '#825FFF', 
        left: '17px', borderRadius: '5px',   padding: '5px'}}
      >
        {label}
      </Typography>
      <HourLine fromTop={fromTop} />
    </Box>
  );
};
