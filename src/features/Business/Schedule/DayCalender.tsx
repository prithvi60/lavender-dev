import { useEffect, useRef, useState } from "react";
import { range, getMonday, getCurrentTime12HrFormat } from "./utils";
import { EmployeeWrapper, HGrid, Hour, VGrid, Wrapper, HourLineWithLabel } from './components/CalenderComponents'
import GetIcon from "../../../assets/Icon/icon";
import { GetScheduleDates } from "./BusinessScheduleContext";
import { useDrawer } from "../BusinessDrawerContext";
import { Appointment } from "./components/Appointment";
import { CustomTooltip } from "../../../components/CustomTooltip";
import { Avatar, Tooltip } from "@mui/material";
import {Button} from "@mui/material";
import { useSelector } from "react-redux";
import endpoint from "../../../api/endpoints";
import { getBrowserCache } from "../../../api/constants";

// const setDragElement = (e) => {
//   const dragEle = e.target;
//   const bg = dragEle.parentElement.style.backgroundColor
//   var hideDragImage = dragEle.cloneNode(true);
//   hideDragImage.id = "hideDragImage-hide"
//   const nodeRect = dragEle.getBoundingClientRect();
//   // const offsetX = e.clientX - nodeRect.left;
//   // const offsetY = e.clientY - nodeRect.top;
//   // e.dataTransfer.setData('offsetX', offsetX);
//   // e.dataTransfer.setData('offsetY', offsetY);
//   // console.log("setDragElement called", offsetX, offsetY)

//   var dragImage = dragEle.cloneNode(true);
//   dragImage.id = "draggedimage";
//   dragImage.style.position = "absolute";

//   hideDragImage.style.opacity = 0;
//   // hideDragImage.style.width = nodeRect.width + 'px'
//   dragImage.style.width = nodeRect.width + 'px'
//   dragImage.style.height = nodeRect.height + 'px'
//   dragImage.style.backgroundColor = bg

//   document.body.appendChild(hideDragImage);
//   document.body.appendChild(dragImage);
//   e.dataTransfer.setDragImage(hideDragImage, 0, 0);
//   console.log("dragStart",e.target.parentElement, nodeRect, dragImage, hideDragImage, nodeRect.width)
// }

// const removeDragElement = () => {
//   var hideDragImage = document.getElementById('hideDragImage-hide');
//   var dragImage = document.getElementById('draggedimage');
//   hideDragImage.remove();
//   dragImage.remove();
// }

export const DayCalendar = () => {
  const { filteredAppointments, selectedDate, employees } = GetScheduleDates()
  const estId = getBrowserCache("EstablishmentId")

  // const [appointments, setAppointments] = useState(filteredAppointments)
  const [deleteIcon, showDeleteIcon] = useState(false)
  const [newAppointment, setNewAppointment] = useState('')
  const { openDrawer, isOpen } = useDrawer()
  const [employeeeName, setEmployeeName] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageUrls = async () => {
      setLoading(true);
      try {
        const urls = {};
        for (const employee of employees) {
          const response = await endpoint.getImages(employee.profileImage, estId);
          const imageUrl = URL.createObjectURL(response.data);
          urls[employee.profileImage] = imageUrl;
        }
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (employees && employees.length > 0) {
      fetchImageUrls();
    }
  }, [employees, estId]);

  const dragElementRef = useRef(null);

  const mondayDate = getMonday();

  const addNewAppointment = (employee, employeeId, hour, min) => {
    setNewAppointment(`${employee}-${hour}-${min}`)
    setEmployeeName(employee)
    // openDrawer()
  }

  const onDragStartDelete = (e, id, currentEmployee) => {
    showDeleteIcon(true)
    dragElementRef.current = e.target;
    e.dataTransfer.setData('eventId', id);
    e.dataTransfer.setData('currentEmployee', currentEmployee.employeeName);
    // const nodeRect = e.target.getBoundingClientRect();
    // const offsetX = e.clientX - nodeRect.left;
    // const offsetY = e.clientY - nodeRect.top;
    // e.dataTransfer.setData('offsetX', offsetX);
    // e.dataTransfer.setData('offsetY', offsetY);
    // console.log("setDragElement called", offsetX, offsetY)

    //setDragElement(e)
    
    //console.log("dragStart",e, dragElementRef)

    setTimeout(() => {
      dragElementRef.current.parentElement.style.display = 'none';
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
    showDeleteIcon(false)
    //removeDragElement()
    dragElementRef.current.parentElement.style.display = 'block';
  }

  const onDrag = (e) => {
    // const x = e.dataTransfer.getData('offsetX');
    // const y = e.dataTransfer.getData('offsetY');
    // const id = e.dataTransfer.getData('eventId');
    // console.log("onDrag called", x, y, id)

    // var dragImage = document.getElementById('draggedimage');
    // if(dragImage) {
    //     dragImage.style.left =( e.pageX )+ "px";//TRY offsetWidth
    //     dragImage.style.top = (e.pageY) + "px";
    // }
  }

  function handleAddAppointment(hour, min){
    const startTime = getCurrentTime12HrFormat(hour, (min) * 15, true)
    const payload = {
      start: startTime,
      employee: employeeeName,
      date: selectedDate
    }
    openDrawer('NewAppointment', payload)
  }

  console.log('employees : ', employees)

  return (
    <>
      <Wrapper>
        {/* <VGrid setTop={false}> */}
          {/* <HGrid className="fixed" cols={employees.length}>
            {employees.map((employee) => <div className="h-[120px] flex flex-col flex-grow-0 items-center justify-center font-bold border-b border-b-gray-400">
              <GetIcon svgWidth='80' svgHeight='80' className='' iconName={'ProfileIcon'}/>
              <>{employee.employeeName}</>
            </div>)}
          </HGrid>
             */}
        
          <HGrid  first={"60px"} cols={1}>
            <VGrid className="mb-[18px] " rows={24} >
              {range(24).map((hour) => (
                <Hour className="border-r border-[#CCCCCC]">
                  {`${!hour ? '12' : ((hour % 12) || '12')}.00`}
                  <br/>
                  {`${hour >= 12 ? 'PM' : 'AM'}`}
                </Hour>
              ))}
            </VGrid>
            <HGrid className='overflow-x-scroll' cols={employees?.length}>
              {employees ? 
                employees.map((employee, index) => (
                  <EmployeeWrapper>
                    <div className="h-[120px] flex flex-col flex-grow-0 items-center justify-center  font-bold border-b border-b-gray-400">
                      {
                        employee?.profileImage ? (
                          <Avatar src={imageUrls[employee.profileImage]} style={{ backgroundColor: '#1B1464', width: '80px', height: '80px' }} />
                        )
                        :
                        (
                          <GetIcon svgWidth='80' svgHeight='80' className='' iconName={'ProfileIcon'}/>
                        )
                      }
                      <div style={{fontSize: '18px', fontWeight: 700, color: '#4D4D4D'}}>{employee.employeeName}</div>
                    </div>
                    {range(24).map((hour) => (
                      <Hour className="flex flex-col border-r border-solid border-r-gray-400">
                        {range(4).map((min) => (
                          <div onClick={() => addNewAppointment(employee.employeeName, employee.employeeId, hour, min)} className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid">
                            {newAppointment === `${employee.employeeName}-${hour}-${min}` ? 
                            <div className="w-full h-full bg-white border-2 p-1 border-[#825FFF] rounded-xl text-left">
                                <Tooltip title={<div style={{display: 'flex', flexDirection: 'column'}} >
                                        <Button disableRipple variant="text" sx={styles.button} onClick={() => handleAddAppointment(hour, min)}><GetIcon style={{display: 'flex', padding: 1}} iconName='CalenderIcon' text={"Add appointment"}/></Button>
                                        <Button disableRipple variant="text" sx={styles.button} onClick={() => console.log("2")}><GetIcon style={{display: 'flex', padding:1}} iconName='AccessTimeFilledIcon' text={"Block this time"}/></Button>
                                      </div>} placement="right" arrow componentsProps={{
                                                                                          tooltip: {
                                                                                            sx: {
                                                                                              bgcolor: "white",
                                                                                              boxShadow: '2px 2px 5px 5px #EEEEEE',
                                                                                            }
                                                                                          },
                                                                                          arrow: {sx:{color: 'white'}},
                                                                                        }}>
                                
                                      <div className="ml-4 font-bold">{getCurrentTime12HrFormat(hour, (min) * 15, true)}</div>
                                </Tooltip>

                              {/* <CustomTooltip children={<div className="ml-4 font-bold">{getCurrentTime12HrFormat(hour, (min) * 15, true)}</div>} 
                              title={<div className="w-20 h-10 p-5 bg-white text-black rounded-lg">Hello - add or block app</div>} maxW={"100%"} arrowColor={"white"}/> */}
                            </div>
                            : <></>}
                          </div>
                        ))}
                      </Hour>
                    ))}
                    
                    {filteredAppointments[employee.employeeName]?.map( (appointmentGroup) => appointmentGroup.map(
                      (appointment, index, allAppointments) => {
                        const allAppointmentsCount = allAppointments.length
                        return (
                              <Appointment
                                data={appointment}
                                index={index}
                                count={allAppointmentsCount}
                                onDrag={onDrag}
                                onDragEnd={(e) => onDragEnd(e)}
                                elementRef={dragElementRef}
                                onDragStart = {(e) => {
                                  onDragStartDelete(e, appointment.service, employee)
                                }}
                                //disabled={true}//temp
                                disableHoverOnDrag={deleteIcon}
                              />
                        )
                      }
                    ))}
                  </EmployeeWrapper>
              )) 
              : 
              <div className="flex w-full h-full justify-center items-center text-white">
                No employees...
              </div>}
            </HGrid>
          </HGrid>
        {/* </VGrid> */}

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


const styles = {
  button: {
    color: '#4D4D4D',
    fontSize: '18px',
    fontWeight: 600,
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  }
}
