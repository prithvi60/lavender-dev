import React from 'react'
import { Button } from '../../components/ui/button'
import Divider from '@mui/material/Divider'
import { Selector } from './Appointments/AppointmentControllers'

function AppointmentEdit() {
  return (
    <div className="flex-col h-full">
        <div className="text-lg h-14 p-4 mb-2 text-white bg-[#1B1464]">Filters</div>
      <div className="flex-col mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          onSelect={() => {}}
          placeholder={"Everyone"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-56 mb-4 shadow-lg rounded"}
          label={"Team member"}
        />
        <Divider />
        {/* <Selector
          onSelect={setClient}
          placeholder={"All Bookings"}
          options={["Content", "bContent", "cContent", "dContent"]}
          className={"w-56 mb-4 shadow-lg rounded"}
          label={"Booked by"}
        /> */}
        <Divider />
        <div>
          {/* <StatusFilter
            label={"Status"}
            options={selectedBookingStatusFilters}
            selectOptionHandler={setSelectedBookingStatusFilters}
          /> */}
        </div>
      </div>
      <div className="absolute bottom-4 mx-7">
        <Button
          onClick={() => {}}
          className="mx-10"
          variant="ghost"
          color="#825FFF"
        >
          Reset
        </Button>
        <Button onClick={
            () => {}
            //handleFilterDrawerSubmit
        }>
          Done
        </Button>
      </div>
    </div>
  )
}

export default AppointmentEdit