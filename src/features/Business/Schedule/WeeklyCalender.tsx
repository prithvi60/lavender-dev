import { styled } from '@mui/material/styles';
import { HTMLAttributes, useState } from "react";
import { range, addDateBy, areDatesSame, getMonday } from "./utils";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface EventProps extends HTMLAttributes<HTMLDivElement> {
    fromTop?: number;
    howLong?: number;
    isToday?: boolean;
    first?: any;
    cols?: any;
    rows?: any
}

const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

const HOUR_HEIGHT = 60;
const HOUR_MARGIN_TOP = 15;

export const WeeklyCalendar = () => {
  const [mondayDate, setMondayDate] = useState(getMonday());
  const [events, setEvents] = useState([
    { date: new Date(2024, 4, 26, 10), text: "first hi", howLong: 3 },
    { date: new Date(2024, 4, 26, 15), text: "second", howLong: 2 },
    { date: new Date(2024, 4, 26, 11), text: "third", howLong: 2 },
    { date: new Date(2024, 0, 2, 13), text: "forth", howLong: 2 },
    { date: new Date(2024, 5, 25, 0), text: "HBD", howLong: 2 },

  ]);

  const hourNow = new Date().getHours();
  const minutesNow = new Date().getMinutes();

  const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
  const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));

  const onAddEvent = (date) => {
    const text = "Hello"
    const from = 10;
    const to = 12;

    date.setHours(from);
    // date.setMinutes(from)

    setEvents((prev) => [...prev, { text, date, howLong: to - from }]);
  };

  return (
    <>
      <FlexBox>
        <p>today: {new Date().toDateString()}</p>
        <p>from: {mondayDate?.toDateString()}</p>
        <p>to: {addDateBy(mondayDate, 6).toDateString()}</p>

        <button onClick={prevWeek}>
            <ChevronLeft/>
        </button>
        <button onClick={nextWeek}>
           <ChevronRight/>
        </button>
      </FlexBox>
      <div className="w-[calc(100%-30px)] border border-red-500 m-[15px] relative">
        <HGrid first={"60px"} cols={1}>
          <VGrid rows={24}>
            {range(24).map((hour) => (
              <Hour>{hour}</Hour>
            ))}
          </VGrid>
          <HGrid cols={7}>
            {DAYS.map((day, index) => (
              <DayWrapper
                onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                isToday={areDatesSame(new Date(), addDateBy(mondayDate, index))}
              >
                <p>{day}</p>
                {events.map(
                  (event) =>
                    areDatesSame(addDateBy(mondayDate, index), event.date) && (
                      <Event
                        howLong={event.howLong}
                        fromTop={
                          event.date.getHours() * HOUR_HEIGHT +
                          HOUR_HEIGHT / 2 +
                          event.date.getMinutes() / 2
                        }
                      >
                        {event.text}
                      </Event>
                    )
                )}
              </DayWrapper>
            ))}
          </HGrid>
        </HGrid>
        <HourLine
          fromTop={
            hourNow * HOUR_HEIGHT +
            HOUR_MARGIN_TOP +
            HOUR_HEIGHT / 2 +
            minutesNow / 2
          }
        />
      </div>
    </>
  );
};

const Wrapper = styled('div')(({theme}) => `
  width: calc(100% - 30px);
  border: 1px solid red;
  margin: 15px;
  position: relative;
`);

const HGrid = styled('div')<EventProps>(({theme, first, cols}) => `
  display: grid;
  grid-template-columns: ${first || ""} repeat(
      ${cols},
      1fr
    );
  width: 100%;
`);

const VGrid = styled('div')<EventProps>(({theme, rows}) => `
  display: grid;
  grid-template-rows: repeat(${rows}, 1fr);

  &:first-child {
    margin-top: ${HOUR_MARGIN_TOP}px;
  }
`);

const DayWrapper = styled('span')<EventProps>(({theme, isToday}) => `
  border: 1px solid red;
  display: relative;
  background: ${(isToday ? "#F2CEE6" : "")};
`);

const Hour = styled('span')(({theme}) => `
  height: ${HOUR_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: right;
  border: 1px solid black;
`);

const HourLine = styled('div')<EventProps>(({theme, fromTop}) => `
  position: absolute;
  width: 100%;
  top: ${fromTop}px;
  border: 1px solid orange;
`);

const FlexBox = styled('div')(({theme}) => `
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

const Event = styled('div')<EventProps>(({theme, fromTop, howLong}) => `
  position: relative;
  top: ${fromTop}px;
  background: green;
  height: ${howLong * HOUR_HEIGHT}px;
  color: white;
  /* width: calc(100% -10px); */
  margin: 0px 5px;
  padding: 5px;
  border-radius: 6px;
  margin-top: -10px;
`);


// import React, { useState } from "react";
// import { range, addDateBy, areDatesSame, getMonday } from "./utils";
// import { ChevronLeft, ChevronRight } from "@mui/icons-material";

// const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

// const HOUR_HEIGHT = 30;
// const HOUR_MARGIN_TOP = 15;

// const WeeklyCalendar = () => {
//   const [mondayDate, setMondayDate] = useState(getMonday());
//   const [events, setEvents] = useState([
//     { date: new Date(2022, 11, 20, 10), text: "first hi", howLong: 3 },
//     { date: new Date(2022, 11, 22, 15), text: "second", howLong: 2 },
//     { date: new Date(2022, 11, 27, 11), text: "third", howLong: 2 },
//     { date: new Date(2023, 0, 2, 13), text: "forth", howLong: 2 }
//   ]);

//   const hourNow = new Date().getHours();
//   const minutesNow = new Date().getMinutes();

//   const nextWeek = () => setMondayDate(addDateBy(mondayDate, 7));
//   const prevWeek = () => setMondayDate(addDateBy(mondayDate, -7));

//   const onAddEvent = (date) => {
//     const text = prompt("text");
//     const from = prompt("from");
//     const to = prompt("to");

//     date.setHours(from);

//     setEvents((prev) => [...prev, { text, date, howLong: to - from }]);
//   };

//   return (
//     <>
//     hello
//       <div className="flex justify-around text-lg mt-5">
//         <p>today: {new Date().toDateString()}</p>
//         <p>from: {mondayDate?.toDateString()}</p>
//         <p>to: {addDateBy(mondayDate, 6).toDateString()}</p>

//         <button onClick={prevWeek}>
//           <ChevronLeft/>
//         </button>
//         <button onClick={nextWeek}>
//           <ChevronRight/>
//         </button>
//       </div>
//       <div className="relative border-2 border-black m-5">
//         <div className="grid grid-cols-8">
//           {range(24).map((hour) => (
//             <div className="h-30 flex flex-col items-center">{hour}</div>
//           ))}
//         </div>
//         <div className="grid grid-cols-8 gap-4">
//           {DAYS.map((day, index) => (
//             <div
//               className={`relative border border-red-500 ${
//                 areDatesSame(new Date(), addDateBy(mondayDate, index))
//                   ? "bg-gray-300"
//                   : ""
//               }`}
//               onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
//             >
//               <p>{day}</p>
//               {events.map(
//                 (event) =>
//                   areDatesSame(addDateBy(mondayDate, index), event.date) && (
//                     <div
//                       className="absolute bg-green-500 text-white rounded p-1"
//                       style={{
//                         top: `${
//                           event.date.getHours() * HOUR_HEIGHT +
//                           HOUR_HEIGHT / 2 +
//                           event.date.getMinutes() / 2
//                         }px`,
//                         height: `${event.howLong * HOUR_HEIGHT}px`
//                       }}
//                     >
//                       Hi
//                     </div>
//                   )
//               )}
//             </div>
//           ))}
//         </div>
//         <div
//           className="absolute border border-orange-500"
//           style={{
//             top: `${
//               hourNow * HOUR_HEIGHT +
//               HOUR_MARGIN_TOP +
//               HOUR_HEIGHT / 2 +
//               minutesNow / 2
//             }px`,
//             width: "100%"
//           }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default WeeklyCalendar;
