import { useEffect, useState } from "react";
import { range, addDateBy, getMonday } from "./utils";
import { DayWrapper, HGrid, Hour, VGrid, HOUR_HEIGHT, HOUR_MARGIN_TOP, Appointment, Wrapper, HourLineWithLabel } from './components/CalenderComponents'
import GetIcon from "../../../assets/Icon/icon";
import { GetScheduleDates } from "./BusinessScheduleContext";

export const DayCalendar = () => {

  const { filteredAppointments, employees } = GetScheduleDates()
  
  const mondayDate = getMonday();
  const appointments = filteredAppointments;

  console.log("appointment day", appointments)

  return (
    <>
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
          <HGrid className='overflow-x-scroll' cols={employees.length}>
            {employees ? 
            employees.map((employee, index) => (
                <DayWrapper
                  //onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                >
                  <div className="h-[120px] flex flex-col flex-grow-0 items-center justify-center font-bold border-b border-b-gray-400">
                    <GetIcon svgWidth='80' svgHeight='80' className='' iconName={'ProfileIcon'}/>
                    <>{employee.employeeName}</>
                  </div>
                  {range(24).map((hour) => (
                    <Hour className="flex flex-col border-r border-solid border-r-gray-400">
                      {range(4).map((block) => (
                        <div className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid"></div>
                      ))}
                    </Hour>
                  ))}
                  
                  {appointments.filter((appointment) => appointment.employee === employee.employeeName)[0]?.appointments?.map(
                    (appointment, data) =>
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
            )) 
            : 
            <div className="flex w-full h-full justify-center items-center bg-slate-950 text-white">
              No employees...
            </div>}
          </HGrid>
        </HGrid>

        <HourLineWithLabel/>

        </Wrapper>
    </>
  );
};

