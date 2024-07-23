import { Card, Grid, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import EmptyBookings from "./EmptyBookings";
import { NoPastBookings } from "./Constant";
import { BookingInfoModal } from "./BookingInfoModal";
import {
  convertToDateOnly,
  convertToDayOnly,
  convertToMonthOnly,
  convertToTimeOnly,
  convertToYearOnly,
} from "../../utils/TimeFormat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Text from "../../components/Text";

function PastBookings({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleCardClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 500; // Adjust scroll amount as per your card width
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 500; // Adjust scroll amount as per your card width
    }
  };

  return (
    <div className="mt-10">
      <Text sx={styles.heading} name={"Past Bookings"} align="left"></Text>
      <div style={{ overflow: "hidden", position: "relative" }}>
        {userInfo?.pastBookings?.length > 0 ? (
          <>
            <div
              ref={scrollContainerRef}
              style={{
                display: "flex",
                flexDirection: "row",
                transition: "0.5s",
                overflowX: "auto",
                paddingBottom: 5,
              }}
            >
              {userInfo?.pastBookings?.map((bookings, index) => (
                <Card
                  key={index}
                  sx={{
                    minWidth: "576px",
                    maxWidth: "576px",
                    height: "200px",
                    borderRadius: 4,
                    marginLeft: 2,
                    marginRight: 2,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick()}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: 4,
                          backgroundColor: "#EEEEFF",
                          color: "#1B1464",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 1,
                        }}
                      >
                        <Text
                          sx={styles.startMonth}
                          name={`${convertToMonthOnly(
                            bookings?.startTime
                          )} ${convertToYearOnly(bookings?.startTime)}`}
                        />
                        <Text
                          sx={styles.startDate}
                          name={convertToDateOnly(bookings?.startTime)}
                        />
                        <Text
                          sx={styles.startDay}
                          name={convertToDayOnly(bookings?.startTime)}
                        />
                      </Card>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                      }}
                    >
                      <Text
                        sx={styles.estName}
                        name={bookings?.establishmentName}
                      />
                      <Text
                        sx={styles.startTime}
                        name={convertToTimeOnly(bookings?.startTime)}
                      />
                      <Text
                        sx={styles.services}
                        name={`${bookings.services.length} services`}
                      />
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </div>
            <IconButton
              onClick={scrollLeft}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={scrollRight}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        ) : (
          <EmptyBookings noAppointmentsMessage={NoPastBookings} />
        )}
        {isModalOpen && (
          <BookingInfoModal
            isModalOpen={isModalOpen}
            bookings={userInfo?.pastBookings[0]}
            establishmentId={""}
          />
        )}
      </div>
    </div>
  );
}

export default PastBookings;
const styles = {
  heading: {
    color: "#4D4D4D",
    fontSize: "36px",
    fontWeight: 600,
    paddingBottom: 2,
  },
  startMonth: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    padding: 1,
  },
  startDate: {
    fontWeight: 500,
    fontSize: "90px",
    lineHeight: "108px",
    color: "#1B1464",
  },
  startDay: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    p: 1,
  },
  estName: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#4D4D4D",
    p: 1,
    maxWidth: "250px",
  },
  startTime: {
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "43px",
    color: "#4D4D4D",
    p: 1,
  },
  services: {
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#4D4D4D",
    p: 1,
  },
};
