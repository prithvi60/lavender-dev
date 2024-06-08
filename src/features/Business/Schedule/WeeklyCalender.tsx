import { useState } from "react";
import { range, addDateBy, areDatesSame, getMonday } from "./utils";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DAYS, DayWrapper, FlexBox, HGrid, Hour, HourLine, VGrid, HOUR_HEIGHT, HOUR_MARGIN_TOP, Appointment } from './components/CalenderComponents'


export const WeeklyCalendar = ({data}) => {

  const [mondayDate, setMondayDate] = useState(getMonday());
  const [appointments, setAppointments] = useState(data);

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

    setAppointments((prev) => [...prev, { text, date, howLong: to - from }]);
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
                {appointments.map(
                  (appointment) =>
                    areDatesSame(addDateBy(mondayDate, index), appointment.date) && (
                      <Appointment
                        howLong={appointment.howLong}
                        fromTop={
                          appointment.date.getHours() * HOUR_HEIGHT +
                          HOUR_HEIGHT / 2 +
                          appointment.date.getMinutes() / 2
                        }
                      >
                        {appointment.text}
                      </Appointment>
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

