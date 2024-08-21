import React, { useEffect, useState } from "react";
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
import { FilterProvider } from "../features/Business/FilterContext.tsx";

const BusinessLayoutPage = () => {
  const [activeField, setActiveField] = useState("Schedule");
  const [userDetails, setUserDetails] = useState("");
  // opens Sidebar menu on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.businessSlice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("Token")) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails();
            const userDetails = response?.data;
            setUserDetails(userDetails);
            dispatch(updateUser(userDetails?.data));
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
        fetchCurrentUserDetails();
      }
    }, [1000]);
  }, []);

  useEffect(() => {
    const getEstablishmentDetails = async () => {
      const response = await endpoint.getEstablishmentDetailsById(
        userDetails?.data?.establishmentId
      );
      if (response.data.data.published == false) {
        setActiveField("Salon profile");
      }
      if (response.status === 200) {
        dispatch(setEstablishmentData(response.data.data));
      } else {
        console.log("err-getEstablishmentDetailsById", response);
      }
    };

    getEstablishmentDetails();
  }, [userDetails]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderMainContent = () => {
    switch (activeField) {
      case "Home":
        return <div>Home</div>;
      case "Schedule":
        return <SchedulePageWrapper />;
      case "Appointments":
        return <AppointmentsPage estId={userDetails?.data?.establishmentId} />;
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
            <BusinessHeader
              pageName={activeField}
              toggleSidebar={toggleSidebar}
            />
            <div className="flex flex-row ">
              {(!isMobile || sidebarOpen) && (
                <div className={`rounded-lg  z-10 bg-white  sticky top-0`}>
                  <SideBar
                    activeField={activeField}
                    onChange={(field) => {
                      setActiveField(field);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  />
                </div>
              )}
              <div id="render-main" className="w-full overflow-hidden">
                {renderMainContent()}
              </div>
            </div>
          </div>
        </Box>
    </DrawerProvider>
  );
};

export default BusinessLayoutPage;
