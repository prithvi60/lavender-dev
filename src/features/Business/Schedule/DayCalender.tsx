import { useState } from "react";
import { range, addDateBy, areDatesSame, getMonday, getCurrentTime12HrFormat } from "./utils";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { DAYS, DayWrapper, FlexBox, HGrid, Hour, HourLine, VGrid, HOUR_HEIGHT, HOUR_MARGIN_TOP, Appointment, Wrapper, HourLineWithLabel } from './CalenderComponents'
import GetIcon from "../../../assets/Icon/icon";

export const DayCalendar = ({data}) => {

  const [mondayDate, setMondayDate] = useState(getMonday());
  const [appointments, setAppointments] = useState(data);
//   const employees = filterByEmployees(appointments)


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
      {/* <FlexBox>
        <p>today: {new Date().toDateString()}</p>
        <p>from: {mondayDate?.toDateString()}</p>
        <p>to: {addDateBy(mondayDate, 6).toDateString()}</p>

        <button onClick={prevWeek}>
            <ChevronLeft/>
        </button>
        <button onClick={nextWeek}>
           <ChevronRight/>
        </button>
      </FlexBox> */}
      <Wrapper>
        <HGrid  first={"60px"} cols={1}>
          <VGrid className="mb-[18px]" rows={24}>
            {range(24).map((hour) => (
              <Hour className="border-r border-[#CCCCCC]">
                {`${!hour ? '12' : ((hour % 12) || '12')}.00`}
                <br/>
                {`${hour >= 12 ? 'PM' : 'AM'}`}
              </Hour>
            ))}
          </VGrid>
          <HGrid className='overflow-x-scroll' cols={appointments.length}>
            {appointments.map((employee, index) => (
                <DayWrapper
                  onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                >
                  <div className="h-[120px] flex flex-col flex-grow-0 items-center justify-center font-bold border-b border-b-gray-400">
                    <GetIcon svgWidth='80' svgHeight='80' className='' iconName={'ProfileIcon'}/>
                    <>{employee.employee}</>
                  </div>
                  {range(24).map((hour) => (
                    <Hour className="flex flex-col border-r border-solid border-r-gray-400">
                      {range(4).map((block) => (
                        <div className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid"></div>
                      ))}
                    </Hour>
                  ))}
                  
                  {employee.appointments.map(
                    (appointment) =>
                      // areDatesSame(addDateBy(mondayDate, index), appointment.date) && 
                    (
                        <Appointment
                          statusColor={appointment.status}
                          howLong={appointment.howLong}
                          fromTop={
                            (appointment.date.getHours() * HOUR_HEIGHT) + HOUR_MARGIN_TOP + (appointment.date.getMinutes() * 2)
                          }
                        >
                          {appointment.text}
                          <br/>
                          {appointment.date.toString()}
                        </Appointment>
                      )
                  )}
                </DayWrapper>
            ))}
          </HGrid>
        </HGrid>

        <HourLineWithLabel/>

        </Wrapper>
    </>
  );
};

