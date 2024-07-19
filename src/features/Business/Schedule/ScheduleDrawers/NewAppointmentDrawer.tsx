import React, { useEffect, useState } from "react";
import { CalendarHeaderComponent, Selector } from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { Button } from "../../../../components/ui/button";
import { useDrawer } from "../../BusinessDrawerContext";
import { addTime, getCurrentTime12HrFormat, getMonthAndDayNames, getTimeIntervals, range } from "../utils";
import { Tooltip } from "@mui/material";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import CustomSelect from "../../../../components/ui/select";


const clients = [{key: 1, value: [{ name: 'vamsi'}, {phNumber: '999999122'}, {mailId: 'vamsitest@gamil.com'}]}, 
{key: 2, value: [{ name: 'mark'}, {phNumber: '999999122'}, {mailId: 'amrktest@gamil.com'}]},
{key: 3, value: [{ name: 'andy'}, {phNumber: '999999122'}, {mailId: 'andytest@gamil.com'}]},
]

export default function NewAppointmentDrawer({payload}) {
  
  const { closeDrawer } = useDrawer();
debugger
  const {date, client, employee, service, status, price, start } = payload
  console.log("payload : ", payload)
  debugger
  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  const [selectedClient, setClient] = useState(client || '');
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat")
  const [startTime, setStartTime] = useState(start);
  const [selectedDate, setSelectedDate] = useState(date)
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] = useState([]);
  const [timeInterval, setTimeInterval] = useState(getTimeIntervals(start))

  const resetData = () => {
    setSelectedTeamMember("");
    setClient("");
    setSelectedBookingStatusFilters([]);
    setSelectedDate(new Date(2024, 2,21))
  };

  useEffect(() => {
    debugger
    setStartTime(start)
    setSelectedDate(date)
    return () => {
      //resetData()
    }
  },[payload])

  const serviceTagList = ['serv1', 'serv2']

  const handleFilterDrawerSubmit = () => {
    closeDrawer()
  };
  console.log('startTime : ',startTime)
  return (
    <div className="flex-col h-full">
        <div className="flex-col text-lg text-center p-4 mb-2 bg-blue-950">
            <CustomTooltip 
              placement="bottom" style={{ opacity: 1 }} 
              title={
                <div className='shadow-xl'>
                  <CalendarHeaderComponent date={selectedDate} onChange={setSelectedDate} />
                </div>
              } 
              children={
                <div className="text-white">
                  {getMonthAndDayNames(selectedDate)}
                </div>} 
              maxW={"95%"} arrowColor={""}
            />
            
            <div className="flex flex-row justify-around mt-3">
                <Selector
                  onSelect={setStartTime}
                  placeholder={start}
                  options={timeInterval}
                  // options={range(5).map((i,index) => 
                  //   getCurrentTime12HrFormat(parseInt(startTime.split(':')[0]), index * 15)
                  // )}
                  className={" mb-4 shadow-lg rounded"}
                />
                {/* <CustomSelect/> */}
                <Selector
                  onSelect={setOccuranceState}
                  placeholder={occuranceState}
                  options={["Doesn't repeat", "Every day", "Every week", "Every month"]}
                  className={" mb-4 shadow-lg rounded"}
                />
            </div>
            
        </div>
      <div className="flex-col mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          onSelect={setClient}
          placeholder={'Search client'}
          options={["vamsi", "mark", "andy"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Client"}
        />
        <div>
          {client}
        </div>
        <Divider />
        <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Booked by"}
        />
        <Divider />
        
      </div>
      <div className="absolute bottom-4 mx-7">
        <Button
          onClick={resetData}
          className="mx-10"
          variant="ghost"
          color="#825FFF"
        >
          Reset
        </Button>
        <Button onClick={handleFilterDrawerSubmit}>
          Done
        </Button>
      </div>
    </div>
  );
}
