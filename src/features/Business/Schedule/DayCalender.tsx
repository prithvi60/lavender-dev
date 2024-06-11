import { useEffect, useState } from "react";
import { range, addDateBy, getMonday, addTime } from "./utils";
import { DayWrapper, HGrid, Hour, VGrid, HOUR_HEIGHT, HOUR_MARGIN_TOP, Appointment, Wrapper, HourLineWithLabel } from './components/CalenderComponents'
import GetIcon from "../../../assets/Icon/icon";
import { GetScheduleDates } from "./BusinessScheduleContext";

export const DayCalendar = () => {

  const { filteredAppointments, employees } = GetScheduleDates()

  const [appointments, setAppointments] = useState(filteredAppointments)
  
  const mondayDate = getMonday();

  console.log("appointment day", appointments)

  const onDragStart = (e, id, currentEmployee) => {
    e.dataTransfer.setData('eventId', id);
    e.dataTransfer.setData('currentEmployee', currentEmployee);
    const rectTop = e.target.getBoundingClientRect().top;

    e.dataTransfer.setData('initialTop', rectTop);
    console.log("updated time onDragStart", rectTop, id)

  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, newEmployee) => {
    const id = e.dataTransfer.getData('eventId');
    const currentEmployee = e.dataTransfer.getData('currentEmployee');

    const initialTop = e.dataTransfer.getData('initialTop');

    const finalTop = e.target.getBoundingClientRect().top;
    const minutesPerPixel = 0.5;
    const updatedMinutes = Math.round((initialTop - finalTop) * minutesPerPixel);

    console.log("updated time onDrop", updatedMinutes, initialTop, finalTop, newEmployee)

    const updatedAppointments = appointments

    updatedAppointments.map(empAppointment => {

      if (empAppointment.employee === newEmployee) {
        empAppointment.appointments.map((app) => {
          if(app.text === id) {
            const newTime = addTime(app.date, 'minutes', updatedMinutes * -1)
            console.log("newTime >>", newTime)
            return { ...app, date: newTime };
          }
         return app
        })
      }
      else {
        //appointment[]
      }
      return empAppointment;
    });

    // setAppointments(updatedAppointments);
  };

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
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, employee.employeeName)}
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
                          draggable
                          onDragStart = {(e) => {
                            onDragStart(e, appointment.text, employee)
                          }}
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

