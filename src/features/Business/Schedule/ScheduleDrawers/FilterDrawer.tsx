import React, { useEffect, useState } from "react";
import { Selector } from "../../Appointments/AppointmentControllers";
import { SelectSeparator } from "../../../../components/ui/select";
import StatusFilter from "../../../../components/FilterButtons";
import Divider from "@mui/material/Divider";
// import { Button } from "../../../../components/ui/button";
import { useDrawer } from "../../BusinessDrawerContext";
import { useFilterContext } from "../../FilterContext";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../../../api/endpoints";
import { Button } from "@mui/material";
export default function FilterDrawer() {
  const {
    statusFilter,
    setStatusFilter,
    setBookingFilter,
    setTeamFilter,
    teamFilter,
    bookingFilter,
  } = useFilterContext();
  const [selectedTeamMember, setSelectedTeamMember] = useState(teamFilter);
  const [selectedClient, setClient] = useState(bookingFilter);
  const [selectedBookingStatusFilters, setSelectedBookingStatusFilters] =
    useState(statusFilter);

  const resetFilter = () => {
    setSelectedTeamMember("");
    setClient("");
    setSelectedBookingStatusFilters([]);
  };

  const { closeDrawer } = useDrawer();

  const handleFilterDrawerSubmit = () => {
    setStatusFilter(selectedBookingStatusFilters);
    setBookingFilter(selectedClient);
    setTeamFilter(selectedTeamMember);
    closeDrawer();
  };
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("Token")) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails();
            const userDetails = response?.data;
            setUserDetails(userDetails);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
        fetchCurrentUserDetails();
      }
    }, [1000]);
  }, []);

  let appointmentData = [];
  let pageData;
  let estId = userDetails?.data?.establishmentId;

  const payload = {
    pageNumber: 0,
    pageSize: 10,
    establishmentId: estId === "" ? "" : estId,
    fromCost: 0,
    toCost: 1000,
    // "sortBy": "",
    // "sortDirection": "",
    // "establishmentId": "",
    // "customerId": "",
    // "customerName": customerName,
    // "fromDate": "2024-05-10T10:56:01.819Z",
    // "toDate": "2024-05-25T10:56:01.822Z",
  };
  const { isLoading, data: userInfo } = useQuery({
    queryKey: ["query-user-info"],
    queryFn: () => {
      return endpoint.getBusinessAppointments(payload);
    },
  });
  let bookedByName;
  let team;
  if (!isLoading && userInfo) {
    const {
      data: {
        data: { content, ...pageD },
      },
    } = userInfo;
    console.log("apts", content, pageD);
    bookedByName = [
      ...new Set(content.map((appointment) => appointment.customerName)),
    ];
    team = [...new Set(content.map((appointment) => appointment.employeeName))];
  }

  return (
    <div className="flex flex-col justify-between h-full relative">
      <div className="text-lg h-14 p-4 mb-2 sticky w-full top-0 right-0 text-white bg-[#1B1464]">
        Filters
      </div>
      <div className="flex-1 mx-7">
        {/* <SelectSeparator className='bg-black'/> */}
        <Selector
          value={selectedTeamMember}
          onSelect={setSelectedTeamMember}
          placeholder={"Everyone"}
          options={team}
          className={"w-full mb-4 shadow-lg rounded"}
          label={"Team member"}
        />
        <Divider />
        <Selector
          value={selectedClient}
          onSelect={setClient}
          placeholder={"All Bookings"}
          options={bookedByName}
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
      <div className="absolute bottom-0 flex justify-center gap-5 w-full bg-white p-3.5">
        <Button
          onClick={resetFilter}
          sx={styles.txtBtn}
        >
          Reset
        </Button>
        <Button onClick={handleFilterDrawerSubmit}  sx={styles.btn}>Done</Button>
      </div>
    </div>
  );
}
const styles = {
  btn: {
    color: '#FFFFFF',
    backgroundColor: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    padding: '10px 40px 10px 40px',
    borderRadius: '10px',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#5A3EBF',
    }
  },
  txtBtn: {
    color: '#825FFF',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'none',
  },
  textField: {
    width: '272px',
    '& .MuiInputBase-root': {
      height: '55px', // Apply height to the input root
      borderRadius: '9px',
    },

  },
  select: {
    '& .MuiInputBase-root': {
      width: '272px !important',
      height: '55px',
      borderRadius: '9px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '9px',
    },
  },
}