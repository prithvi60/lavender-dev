import React, { useState } from "react";
import { Selector } from "./Appointments/AppointmentControllers";
import { SelectSeparator } from "../../components/ui/select";
import StatusFilter from "../../components/FilterButtons";
import Divider from "@mui/material/Divider";
import { Button } from "../../components/ui/button";
import { useDrawer } from "../../pages/BusinessDrawerContext";

export default function FilterDrawer() {
  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [selectedClient, setClient] = useState("");
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] = useState([]);

  const resetFilter = () => {
    setSelectedTeamMember("");
    setClient("");
    setSelectedBookingStatusFilters([]);
  };

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = () => {
    console.log(
      "filterDrawer",
      selectedBookingStatusFilters,
      selectedClient,
      selectedTeamMember
    );
    closeDrawer()
  };
  return (
    <div className="flex-col h-full">
        <div className="text-lg h-14 p-4 mb-2 text-white bg-blue-950">Filters</div>
      <div className="flex-col mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          onSelect={setSelectedTeamMember}
          placeholder={"Everyone"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-56 mb-4 shadow-lg rounded"}
          label={"Team member"}
        />
        <Divider />
        <Selector
          onSelect={setClient}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-56 mb-4 shadow-lg rounded"}
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
      <div className="absolute bottom-4 mx-7">
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
