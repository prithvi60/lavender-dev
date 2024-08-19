import {
  Modal,
  Card,
  Grid,
  Divider,
  Box,
  IconButton,
  Typography,
  Button,
  Slide,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  convertToDateOnly,
  convertToDayOnly,
  convertToMonthOnly,
  convertToTimeOnly,
  convertToYearOnly,
} from "../../utils/TimeFormat";
import GetIcon from "../../assets/Icon/icon";
import { CancelAppointmentModal } from "./CancelAppointmentModal";
import { useNavigate } from "react-router-dom";
import SaveReviews from "./SaveReviews";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 900,
  height: "90%",
  boxShadow: 24,
  borderRadius: 8,
  overflow: "hidden",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
};

// import { Modal, Card, Grid, Divider, Box, IconButton, Typography, Button, useMediaQuery, Slide } from '@mui/material';
// import React, { useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import { convertToDateOnly, convertToDayOnly, convertToMonthOnly, convertToTimeOnly, convertToYearOnly } from '../../utils/TimeFormat';
// import GetIcon from '../../assets/Icon/icon';
// import { CancelAppointmentModal } from './CancelAppointmentModal';
// import { useNavigate } from 'react-router-dom';
// import SaveReviews from './SaveReviews';

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const BookingInfoModalListView = ({
  isModalOpen,
  bookings,
  toggleModal,
  userflow,
  // disable
}) => {
  const [isOpen, setIsOpen] = useState(isModalOpen);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  // console.log(userflow);


  const establishmentId = bookings?.services[0]?.establishmentId;

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    toggleModal(!isModalOpen);
  };

  function timeDifference(startTime, endTime) {
    const startDate: any = new Date(startTime);
    const endDate: any = new Date(endTime);
    const differenceMs = endDate - startDate;
    const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    return differenceMinutes;
  }

  function handleClickReschedule() {
    navigate(`/salon/${establishmentId}#SearchDetailService`, {
      replace: true,
    });
  }

  const modalStyle = {
    position: "absolute",
    top: isMobile ? "auto" : "50%",
    left: isMobile ? "0" : "50%",
    bottom: isMobile ? "0" : "auto",
    transform: isMobile ? "none" : "translate(-50%, -50%)",
    width: isMobile ? "100%" : "90%",
    height: isMobile ? "70%" : "auto",
    maxWidth: isMobile ? "100%" : 400,
    maxHeight: isMobile ? "70%" : "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: isMobile ? "20px 20px 0 0" : 4,
    overflow: "hidden",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
        {...(isMobile ? { TransitionComponent: Transition } : {})}
      >
        <Card sx={modalStyle}>
          <Box sx={contentStyle}>
            <IconButton
              onClick={handleClick}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <GetIcon iconName="CloseIcon" />
            </IconButton>
            <Box sx={{ p: 3, bgcolor: "#EEEEFF" }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {convertToDateOnly(bookings?.startTime)}{" "}
                {convertToMonthOnly(bookings?.startTime)},{" "}
                {convertToYearOnly(bookings?.startTime)}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {convertToDayOnly(bookings?.startTime)}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {convertToTimeOnly(bookings?.startTime)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {bookings?.establishmentLocation}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ p: 2, color: "#4D4D4D" }}
            >
              {bookings?.establishmentName}
            </Typography>
            <Divider />
            <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto" }}>
              {bookings?.services?.map((service, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    {service?.serviceName}
                  </Typography>
                  <Typography variant="body2">
                    {timeDifference(service?.startTime, service?.endTime)} mins
                  </Typography>
                  <Typography variant="body2">
                    {service?.bookingStatus}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Estimated time</Typography>
                <Typography variant="body2">approx 30 mins</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                  Cancellation policy at this venue
                </Typography>
                <Typography variant="body2">
                  Cancel for free anytime in advance, otherwise you will be
                  charged 100% of the service price for not showing up.
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                color: "#4D4D4D",
              }}
            >
              <Button
                className="!mb-0 !w-max"
                startIcon={<GetIcon iconName="LocationIcon" />}
              >
                <h6 className="text-[#4D4D4D] text-base !mb-0">Directions</h6>
              </Button>
              {userflow !== "past" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    // color: "#4D4D4D",
                  }}
                >
                  <Button
                    className="!mb-0 !w-max"
                    startIcon={userflow !== "past" ? (<GetIcon iconName="CalendarIcon" />) : (<GetIcon iconName="DisableCalendarIcon" />)}
                    onClick={handleClickReschedule}
                  >
                    <h6 className={` text-base !mb-0 ${userflow !== "past" ? "text-[#4D4D4D]" : "text-[#B3B3B3]"}`}>
                      {" "}
                      Reschedule
                    </h6>
                  </Button>
                </Box>
              )}
              {userflow === "past" && (
                <SaveReviews
                  bookings={bookings}
                  establishmentId={establishmentId}
                />
              )}
              <CancelAppointmentModal userFlow={userflow} bookings={bookings?.services[0]}
              />
            </Box>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};
