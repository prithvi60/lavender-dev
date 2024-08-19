import React, { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import SideBar from "../components/SideBar.tsx";
import AppointmentsPage from "../features/Business/Appointments/AppointmentsTable.tsx";
import { DrawerProvider } from "../features/Business/BusinessDrawerContext.tsx";
import BusinessHeader from "../features/Business/BusinessHeader.tsx";
import { BusinessClients } from "../features/Business/Clients/BusinessClients.tsx";
import { Services } from "../features/Business/services/Services.tsx";
import BusinessTeam from "../features/Business/team/BusinessTeam.tsx";
import SchedulePageWrapper from "../features/Business/Schedule/SchedulePage.tsx";
import endpoint from "../api/endpoints.ts";
import { useDispatch, useSelector } from "react-redux";
import { setEstablishmentData } from "../store/slices/businessSlice.js";
import { SalonProfile } from "../features/Business/SalonProfile/SalonProfile.tsx";
import { updateUser } from "../store/slices/currentUserSlice.js";
import { useTheme } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useFetchAppointments } from "../features/Business/BusinessHooks/index.ts";

const BusinessLayoutPage = () => {
  const [activeField, setActiveField] = useState("Schedule");
  const [userDetails, setUserDetails] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.businessSlice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchCurrentUserDetails = useCallback(async () => {
    try {
      const response = await endpoint.getCurrentUserDetails();
      const userDetails = response?.data;
      setUserDetails(userDetails);
      dispatch(updateUser(userDetails?.data));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("Token")) {
      fetchCurrentUserDetails();
    }
  }, [fetchCurrentUserDetails]);

  const estId = userDetails?.data?.establishmentId || "";
  const payload = {
    pageNumber: 0,
    pageSize: 10,
    establishmentId: estId,
    fromCost: 0,
    toCost: 1000,
  };

  const { isLoading, data: appointmentsData, refetch } = useFetchAppointments(payload);

  useEffect(() => {
    if (estId) {
      refetch();
    }
  }, [estId, refetch]);

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      if (userDetails?.data?.establishmentId) {
        try {
          const response = await endpoint.getEstablishmentDetailsById(
            userDetails.data.establishmentId
          );
          if (response.data.data.published === false) {
            setActiveField("Salon profile");
          }
          if (response.status === 200) {
            dispatch(setEstablishmentData(response.data.data));
          }
        } catch (error) {
          console.error("Error fetching establishment details:", error);
        }
      }
    };

    getEstablishmentDetails();
  }, [userDetails, dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMainContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    switch (activeField) {
      case "Home":
        return <div>Home</div>;
      case "Schedule":
        return <SchedulePageWrapper appointmentsData={appointmentsData} />;
      case "Appointments":
        return <AppointmentsPage estId={estId} appointmentsData={appointmentsData} />;
      case "Clients":
        return <BusinessClients />;
      case "Services":
        return <Services />;
      case "Team":
        return <BusinessTeam />;
      case "Salon profile":
        return <SalonProfile />;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <DrawerProvider>
      <Box className="landing-page">
        <div className="flex flex-col h-full">
          <BusinessHeader pageName={activeField} toggleSidebar={toggleSidebar} />
          <div className="flex flex-row ">
            {(!isMobile || sidebarOpen) && (
              <div className={`rounded-lg  z-10 bg-white'  sticky top-0`}>
                <SideBar
                  activeField={activeField}
                  onChange={(field) => {
                    setActiveField(field);
                    if (isMobile) setSidebarOpen(false);
                  }}
                />
              </div>
            )}
            <div id="render-main" className="w-full h-full">
              {renderMainContent()}
            </div>
          </div>
        </div>
      </Box>
    </DrawerProvider>
  );
};

export default BusinessLayoutPage;