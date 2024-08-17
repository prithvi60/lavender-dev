import { Modal, Card, Grid, Divider, Box } from "@mui/material";
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
  maxHeight: "90%",
  boxShadow: 24,
  borderRadius: 8,
  overflow: "hidden",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  height: "auto",
  maxHeight: "90vh",
  overflowY: "auto",
};

export const BookingInfoModal = ({
  isModalOpen,
  bookings,
  toggleModal,
  // disable,
  userflow,
}) => {
  const establishmentId = bookings?.services[0]?.establishmentId;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(isModalOpen);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    toggleModal(!isModalOpen);
  };

  function timeDifference(startTime, endTime) {
    // Convert ISO strings to Date objects
    const startDate: any = new Date(startTime);
    const endDate: any = new Date(endTime);

    // Calculate the difference in milliseconds
    const differenceMs = endDate - startDate;

    // Convert milliseconds to minutes
    const differenceMinutes = Math.floor(differenceMs / (1000 * 60));
    return differenceMinutes;
  }

  function handleClickReschedule() {
    navigate(`/salon/${establishmentId}#SearchDetailService`, {
      replace: true,
    });
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Card sx={modalStyle}>
          <Box sx={contentStyle}>
            <Grid container spacing={2} sx={{ minHeight: "100%" }}>
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                sx={{ padding: "40px 24px 40px 40px !important" }}
              >
                <div>
                  <Grid container spacing={1} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          height: "100%",
                          width: "100%",
                          padding: "",
                          borderRadius: 4,
                          backgroundColor: "#EEEEFF",
                          color: "#1B1464",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="p-1 text-xl">
                          {convertToMonthOnly(bookings?.startTime)}{" "}
                          {convertToYearOnly(bookings?.startTime)}
                        </div>
                        <div className="p-1 text-5xl font-bold">
                          {convertToDateOnly(bookings?.startTime)}
                        </div>
                        <div className="p-1 text-xl">
                          {convertToDayOnly(bookings?.startTime)}
                        </div>
                        <div className="p-1 text-2xl font-bold">
                          {convertToTimeOnly(bookings?.startTime)}
                        </div>
                      </Card>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={8}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                      }}
                    >
                      <div
                        className="p-1 text-4xl font-semibold"
                        style={{ color: "#4D4D4D" }}
                      >
                        {bookings?.establishmentName}
                      </div>
                      <div
                        className="text-[28px] font-bold p-1"
                        style={{ color: "#808080" }}
                      >
                        {bookings?.establishmentLocation}
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <div>
                    {bookings?.services?.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between w-full py-2"
                      >
                        <div
                          style={{
                            color: "#4D4D4D",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          {service?.serviceName}
                        </div>
                        <div className="flex items-center">
                          <div
                            style={{
                              color: "#4D4D4D",
                              fontSize: "20px",
                              fontWeight: "600",
                            }}
                          >
                            {timeDifference(
                              service?.startTime,
                              service?.endTime
                            )}{" "}
                            mins
                          </div>
                          <div className="pl-2 text-center text-md">
                            {service?.bookingStatus}
                          </div>
                          {service?.bookingStatus !== "CANCELED" && (
                            <CancelAppointmentModal userFlow={userflow} bookings={service} />
                          )}
                        </div>
                      </div>
                    ))}
                    <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
                    <div>
                      <div className="flex justify-between w-full py-4">
                        <div>
                          <div
                            style={{
                              color: "#4D4D4D",
                              fontSize: "20px",
                              fontWeight: "600",
                            }}
                          >
                            Estimated time
                          </div>
                          <div>approx</div>
                        </div>
                        <div
                          style={{
                            color: "#4D4D4D",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          30 mins
                        </div>
                      </div>
                      <div className="w-full pt-8">
                        <div
                          style={{
                            color: "#4D4D4D",
                            fontSize: "20px",
                            fontWeight: "600",
                          }}
                        >
                          Cancellation policy at this venue
                        </div>
                        <div>
                          Cancel for free anytime in advance, otherwise you will
                          be charged 100% of the service price for not showing
                          up.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                sx={{ backgroundColor: "#EEEEFF" }}
              >
                <div
                  style={{ height: "100%", width: "100%" }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="flex items-center p-5 ">
                    <GetIcon iconName="LocationIcon" />
                    <div className="pl-4 text-[#4D4D4D] text-base">Directions</div>
                  </div>
                  <div
                    className="flex items-center p-5"
                    onClick={() => {
                      handleClickReschedule();
                    }}
                  >
                    <GetIcon iconName="CalendarIcon" />
                    <div className="pl-4 text-[#4D4D4D] text-base">Reschedule</div>
                  </div>
                  <SaveReviews
                    bookings={bookings}
                    establishmentId={establishmentId}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};
