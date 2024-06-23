import { useRef, useState } from "react";
import { range, getMonday } from "./utils";
import { EmployeeWrapper, HGrid, Hour, VGrid, Appointment, Wrapper, HourLineWithLabel } from './components/CalenderComponents'
import GetIcon from "../../../assets/Icon/icon";
import { GetScheduleDates } from "./BusinessScheduleContext";

export const DayCalendar = () => {

  const { filteredAppointments, employees } = GetScheduleDates()

  // const [appointments, setAppointments] = useState(filteredAppointments)
  const [deleteIcon, showDeleteIcon] = useState(false)

  const dragElementRef = useRef(null);

  const mondayDate = getMonday();


  const onDragStartDelete = (e, id, currentEmployee) => {
    showDeleteIcon((prevState) => !prevState)
    dragElementRef.current = e.target;

    const dragEle = dragElementRef.current.parentElement;
    const nodeRect = dragEle.getBoundingClientRect();

    // const ghostEle: HTMLElement = dragEle.cloneNode(true);
    // ghostEle.style.display = 'block';
    // ghostEle.style.width = nodeRect.width
    //document.body.appendChild(ghostEle);

    // console.log(currentEmployee, e, dragElementRef, nodeRect, ghostEle)

    // e.dataTransfer.setDragImage(
    //     ghostEle,
    //     e.clientX - nodeRect.left,
    //     e.clientY - nodeRect.top
    // );

    e.dataTransfer.setData('eventId', id);
    e.dataTransfer.setData('currentEmployee', currentEmployee.employeeName);
    //e.dataTransfer.setDragImage(e.target, 310,0)
    //e.target.style.opacity = 100
    setTimeout(() => {
      const parentElement = dragElementRef.current.parentElement;
      if (parentElement) {
        parentElement.style.display = 'none';
      }
      //dragElementRef.current.style.display = 'none';
    }, 0);
  }

  const onDragDropDelete = (e) => {
    const id = e.dataTransfer.getData('eventId');
    e.target.style.backgroundColor = 'red'
    const currentEmployee = e.dataTransfer.getData('currentEmployee');
  }

  const onDragOverDelete = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = 'red'
  };

  const onDragEnd = (e) => {
    e.preventDefault()
    showDeleteIcon((prevState) => !prevState)
    const parentElement = dragElementRef.current.parentElement;
      if (parentElement) {
        parentElement.style.display = 'block';
      }
      console.log(parentElement)
    //dragElementRef.current.style.display = 'block';
  }

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
                <EmployeeWrapper
                  //onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
                >
                  <div className="h-[120px] flex flex-col flex-grow-0 items-center justify-center font-bold border-b border-b-gray-400">
                    <GetIcon svgWidth='80' svgHeight='80' className='' iconName={'ProfileIcon'}/>
                    <>{employee.employeeName}</>
                  </div>
                  {range(24).map((_) => (
                    <Hour className="flex flex-col border-r border-solid border-r-gray-400">
                      {range(4).map((_) => (
                        <div className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid"></div>
                      ))}
                    </Hour>
                  ))}
                  
                  {filteredAppointments[employee.employeeName]?.appointments?.map(
                    (appointment, index, allAppointments) => {
                      console.log("render day >", allAppointments.length, index)
                      const allAppointmentsCount = allAppointments.length
                      return (
                          <Appointment
                            data={appointment}
                            index={index}
                            count={allAppointmentsCount}
                            onDragEnd={(e) => onDragEnd(e)}
                            elementRef={dragElementRef}
                            onDragStart = {(e) => {
                              onDragStartDelete(e, appointment.text, employee)
                            }}
                          />
                      )
                    }
                  )
                  }
                </EmployeeWrapper>
            )) 
            : 
            <div className="flex w-full h-full justify-center items-center bg-slate-950 text-white">
              No employees...
            </div>}
          </HGrid>
        </HGrid>

        <HourLineWithLabel/>

        </Wrapper>
        {deleteIcon ? 
        <div
          onDragOver={onDragOverDelete}
          onDrop={(e) => onDragDropDelete(e)}
          id='appointment-delete'
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full p-3 border-2 fixed top-80 end-10`}
        >
            <GetIcon iconName='DeleteIcon'/>
        </div> : <></>}
    </>
  );
};

