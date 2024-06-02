import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { HTMLAttributes } from "react";

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
export const HOUR_MARGIN_TOP = 128;
export const Wrapper = styled('div')(({theme}) => `
  // width: calc(100% - 30px);
  border: 1px solid red;
  margin: 15px;
  position: relative;
`);

export const HGrid = styled('div')<EventProps>(({theme, first, cols}) => `
  display: grid;
  grid-template-columns: ${first || ""} repeat(
      ${cols},
      1fr
    );
  width: 100%;
`);

export const VGrid = styled('div')<EventProps>(({theme, rows}) => `
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr); 

  &:first-child {
    margin-top: ${HOUR_MARGIN_TOP}px;
  }
`);

export const DayWrapper = styled('span')<EventProps>(({theme, isToday}) => `
  border: 1px solid red;
  display: relative;
  background: ${(isToday ? "#F2CEE6" : "")};
  width: 317px;
`);

export const Hour = styled('span')(({theme}) => `
  height: ${HOUR_HEIGHT}px;
  display: flex;
  align-items: flex-start;
  justify-content: right;
  border: 1px solid black;
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
  width: 305px;
  margin: 0px 5px;
  padding: 5px;
  border-radius: 6px;
`);

interface HourLineWithLabelProps extends EventProps {
  label: string;
}

export const HourLineWithLabel: React.FC<HourLineWithLabelProps> = ({ label, fromTop }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body2" 
      style={{ zIndex: 20, position:'absolute', marginRight: '10px', 
      top: (fromTop-12) + 'px', color: 'white', backgroundColor: '#825FFF', 
      left: '17px', borderRadius: '5px',   padding: '5px'}}>
        {label}
      </Typography>
      <HourLine fromTop={fromTop} />
    </Box>
  );
};

