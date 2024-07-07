import React, { useEffect, useState } from "react";
import { CalendarHeaderComponent, Selector } from "../../Appointments/AppointmentControllers";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { Button } from "../../../../components/ui/button";
import { useDrawer } from "../../BusinessDrawerContext";
import { getCurrentTime12HrFormat, getMonthAndDayNames, range } from "../utils";
import { CustomTooltip } from "../../../../components/CustomTooltip";
import ClientSearchFilter from "../../../../components/SearchInputFilter";
import ServiceSelector from "../../../../components/ServiceSelector";


export default function AppointmentDrawer() {
  const { closeDrawer, payload } = useDrawer();

  const { date, client, employee, service, status, price, start } = payload
  const [selectedTeamMember, setSelectedTeamMember] = useState(employee);
  const [selectedClient, setSelectedClient ] = useState({name: client || 'Walk In', email: 'default', phone: ''})
  const [selectedServices, setSelectedServices] = useState([])
  const [occuranceState, setOccuranceState] = useState("Doesn't repeat")
  const [startTime, setStartTime] = useState(getCurrentTime12HrFormat(date.getHours(), date.getMinutes()));
  const [selectedDate, setSelectedDate] = useState(date)
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] = useState([]);
  console.log("AppointmentDrawer >", date, selectedDate, getCurrentTime12HrFormat(date.getHours(), date.getMinutes()))

  const dataObj = [
    { name: 'asd', phone: '+91 981184838', email: 'asd@gmail.com' },
    { name: 'qwe', phone: '+91 982284838', email: 'qwe@gmail.com' },
    { name: 'bnm', phone: '+91 983384838', email: 'bnm@gmail.com' },
    { name: 'fgh', phone: '+91 981184838', email: 'asd@gmail.com' },
    { name: 'jkl', phone: '+91 982284838', email: 'qwe@gmail.com' },
    { name: 'rty', phone: '+91 983384838', email: 'bnm@gmail.com' }
  ]

  const resetData = () => {
    setSelectedTeamMember("");
    setSelectedClient({
      name: '',
      email:'',
      phone: ''
    });
    setSelectedBookingStatusFilters([]);
    setSelectedDate(new Date(2024, 2, 21))
  };

  useEffect(() => {
    setStartTime(getCurrentTime12HrFormat(date.getHours(), date.getMinutes()))
    setSelectedDate(date)
  }, [payload])

  const serviceTagList = ['serv1', 'serv2']

  const handleFilterDrawerSubmit = () => {
    closeDrawer()
  };
  return (
    <div className="flex-col h-full">
      <div className='overflow-y-scroll flex-col h-full'>
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
            placeholder={startTime}
            options={range(5).map((i, index) =>
              getCurrentTime12HrFormat(parseInt(startTime.split(':')[0]), index * 15)
            )}
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
      {/* <div className="mx-5 my-3">
        <ClientSearchFilter data={dataObj} client={selectedClient} handler={setSelectedClient}/>
      </div> */}

      <div className="flex-col mx-3">
        {/* <SelectSeparator className='bg-black'/> */}
        <div className="mb-3">
          <ClientSearchFilter data={dataObj} client={selectedClient} handler={setSelectedClient}/>
        </div>

        <Divider />

        <div className="mb-3">
          <ServiceSelector selectedServices={selectedServices} setSelectedServices={setSelectedServices}/>
        </div>
        
        {/* <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Booked by"}
        /> */}
        <Divider />

      </div>
      </div>
      <div className="relative bottom-4 mx-7 bg-gray-800">
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
