import { styled } from '@mui/material/styles';
import { HTMLAttributes } from "react";

interface EventProps extends HTMLAttributes<HTMLDivElement> {
    fromTop?: number;
    howLong?: number;
    isToday?: boolean;
    first?: any;
    cols?: any;
    rows?: any
}

export const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const HOUR_HEIGHT = 60;
export const HOUR_MARGIN_TOP = 15;
export const Wrapper = styled('div')(({theme}) => `
  width: calc(100% - 30px);
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
`);

export const Hour = styled('span')(({theme}) => `
  height: ${HOUR_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: right;
  border: 1px solid black;
`);

export const HourLine = styled('div')<EventProps>(({theme, fromTop}) => `
  position: absolute;
  width: 100%;
  top: ${fromTop}px;
  border: 1px solid orange;
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

export const Appointment = styled('div')<EventProps>(({theme, fromTop, howLong}) => `
  position: absolute;
  top: ${fromTop}px;
  background: green;
  height: ${howLong * HOUR_HEIGHT}px;
  color: white;
  width: calc(100% -10px);
  margin: 0px 5px;
  padding: 5px;
  border-radius: 6px;
  margin-top: -15px;
`);