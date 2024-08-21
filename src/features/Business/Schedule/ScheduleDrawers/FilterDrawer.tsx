import React, { useEffect, useState } from "react";
import { Selector } from "../../Appointments/AppointmentControllers";
import { SelectSeparator } from "../../../../components/ui/select";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { Button } from "../../../../components/ui/button";
import { useDrawer } from "../../BusinessDrawerContext";
import { useFilterContext } from "../../FilterContext";
export default function FilterDrawer() {
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [selectedClient, setClient] = useState("");
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] = useState([]);
  const { confirmedText,setConfirmedText } = useFilterContext(); 

  useEffect(()=>{
    setConfirmedText(selectedBookingStatusFilters)
  },[selectedBookingStatusFilters])
  
  const resetFilter = () => {
    setSelectedTeamMember("");
    setClient("");
    setSelectedBookingStatusFilters([]);
  };

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = () => {
 
    closeDrawer()
  };
  return (
    <div className="flex flex-col justify-between h-full relative">
        <div className="text-lg h-14 p-4 mb-2 sticky w-full top-0 right-0 text-white bg-[#1B1464]">Filters</div>
      <div className="flex-1 mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"Everyone"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Team member"}
        />
        <Divider />
        <Selector
          onSelect={setClient}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Booked by"}
        />
        <Divider />
        <div>
          <StatusFilter
            label={"Status"}
            options={selectedBookingStatusFilters}
            selectOptionHandler={setSelectedBookingStatusFilters}
          />
        </div>
      </div>
      <div className="mx-7">
        <Button
          onClick={resetFilter}
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
