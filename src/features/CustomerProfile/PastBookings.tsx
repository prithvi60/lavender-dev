import {
  Card,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
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
import Text from "../../components/Text";
import GetIcon from "../../assets/Icon/icon";
import { BookingInfoModalListView } from "./BookingInfoModalListview";

function PastBookings({ userInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingIndex, setBookingIndex] = useState(0);

  const scrollContainerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleCardClick = (index) => {
    setBookingIndex(index);
    setIsModalOpen(!isModalOpen);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 500;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 500;
    }
  };

  const cardCount = userInfo?.pastBookings?.length;
  const cardWidth = cardCount <= 2 ? "48%" : "32%";

  const cardStyle = {
    flex: "0 0 auto",
    margin: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    boxSizing: "border-box",
    width: isMobile ? "100%" : cardWidth,
    flexDirection: "row",
    transition: "0.5s",
    overflowX: "auto",
    borderRadius: 4,
    cursor: "pointer",
  };

  return (
    <div className="mt-10">
      {/* <Text sx={styles.heading} name={"Past Bookings"} align="left"></Text> */}
      <h4 className="text-[#4D4D4D] text-[18px] md:text-[36px] text-bold pb-2">
        {"Past Bookings"}
      </h4>
      <div style={{ position: "relative", zIndex: 0 }}>
        {userInfo?.pastBookings?.length > 0 ? (
          <>
            <div
              ref={scrollContainerRef}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                overflowX: isMobile ? "hidden" : "auto",
                overflowY: isMobile ? "auto" : "visible",
                padding: "10px",
                scrollbarWidth: "thin",
                // @ts-ignore
                "&::-webkit-scrollbar": {
                  width: "3px",
                  height: "3px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              {userInfo?.pastBookings?.map((bookings, index) => (
                <React.Fragment key={index}>
                  <Card
                    sx={{
                      ...cardStyle,
                      padding: 0,
                      boxShadow: isMobile ? "none" : cardStyle.boxShadow,
                      border: "1px solid #d3d3d3"
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    {isMobile ? (
                      <>
                        <div
                          style={{
                            backgroundColor: "#EEEEFF",
                            padding: "16px",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                          }}
                        >
                          <Text
                            sx={{ ...styles.mobileDate }}
                            name={`${convertToDateOnly(
                              bookings?.startTime
                            )} ${convertToMonthOnly(
                              bookings?.startTime
                            )} ${convertToYearOnly(
                              bookings?.startTime
                            )}, ${convertToDayOnly(bookings?.startTime)}`}
                          />
                        </div>
                        <Grid container spacing={0} sx={{ padding: "16px" }}>
                          <Grid
                            item
                            xs={5}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              sx={{ ...styles.mobileTime }}
                              name={convertToTimeOnly(bookings?.startTime)}
                            />
                            <Text
                              sx={{
                                ...styles.services,
                                fontSize: "16px",
                                color: "#666",
                                fontWeight: 400,
                              }}
                              name={`${bookings.services.length} services`}
                            />
                          </Grid>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mr: "-1px" }}
                          />
                          <Grid item xs={7}>
                            <Text
                              sx={{
                                ...styles.estName,
                                fontSize: "16px",
                                fontWeight: 400,
                              }}
                              name={bookings?.establishmentName}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <Grid container spacing={1}>
                        <Grid item xs={isMobile ? 3 : 4}>
                          <Card
                            sx={{
                              height: "100%",
                              borderRadius: 4,
                              backgroundColor: "#C9C5FF",
                              color: "#1B1464",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: isMobile ? 0.5 : 1,
                            }}
                          >
                            <Text
                              sx={{
                                ...styles.startMonth,
                                fontSize: isMobile ? "12px" : "15px",
                              }}
                              name={`${convertToMonthOnly(
                                bookings?.startTime
                              )} ${convertToYearOnly(bookings?.startTime)}`}
                            />
                            <Text
                              sx={{
                                ...styles.startDate,
                                fontSize: isMobile ? "16px" : "36px",
                                lineHeight: isMobile ? "19.2px" : "44px",
                              }}
                              name={convertToDateOnly(bookings?.startTime)}
                            />
                            <Text
                              sx={{
                                ...styles.startDay,
                                fontSize: isMobile ? "12px" : "12px",
                              }}
                              name={convertToDayOnly(bookings?.startTime)}
                            />
                          </Card>
                        </Grid>
                        <Grid
                          item
                          xs={isMobile ? 9 : 8}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "start",
                            paddingLeft: "24px !important",
                          }}
                        >
                          <Text
                            sx={{
                              ...styles.estName,
                              fontSize: isMobile ? "14px" : "15px",
                              fontWeight: 700,
                            }}
                            name={bookings?.establishmentName}
                          />
                          <Text
                            sx={{
                              ...styles.startTime,
                              fontSize: isMobile ? "20px" : "28px",
                            }}
                            name={convertToTimeOnly(bookings?.startTime)}
                          />
                          <Text
                            sx={{
                              ...styles.services,
                              fontSize: isMobile ? "16px" : "12px",
                              fontWeight: 600,
                            }}
                            name={`${bookings.services.length} services`}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Card>
                  {isMobile && index < userInfo.pastBookings.length - 1 && (
                    <Divider sx={{ my: 2 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
            {!isMobile && (
              <>
                <IconButton
                  onClick={scrollLeft}
                  style={{
                    position: "absolute",
                    // left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                  className="-left-6 xl:-left-14"
                >
                  <GetIcon iconName="BackIconArrow" />
                </IconButton>
                <IconButton
                  onClick={scrollRight}
                  style={{
                    position: "absolute",
                    // right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                  }}
                  className="-right-6 xl:-right-14"
                >
                  <GetIcon iconName="RightArrowIcon" />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <EmptyBookings noAppointmentsMessage={NoPastBookings} />
        )}
        {isModalOpen && (
          <>
            {isMobile ? (
              <BookingInfoModalListView
                isModalOpen={isModalOpen}
                toggleModal={setIsModalOpen}
                bookings={userInfo?.pastBookings[bookingIndex]}
                // disable={userInfo?.pastBookings}
                userflow={"past"}
              />
            ) : (
              <BookingInfoModal
                isModalOpen={isModalOpen}
                toggleModal={setIsModalOpen}
                bookings={userInfo?.pastBookings[bookingIndex]}
                // disable={userInfo?.pastBookings}
                userflow={"past"}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PastBookings;

const styles = {
  heading: {
    color: "#1B1464",
    fontSize: "36px",
    fontWeight: 700,
    paddingBottom: 2,
  },
  startMonth: {
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    padding: 1,
  },
  startDate: {
    fontWeight: 700,
    fontSize: "90px",
    lineHeight: "108px",
    color: "#1B1464",
  },
  startDay: {
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    p: 1,
  },
  estName: {
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    p: 1,
    maxWidth: "250px",
  },
  startTime: {
    fontWeight: 700,
    fontSize: "36px",
    lineHeight: "43px",
    color: "#1B1464",
    p: 1,
  },
  services: {
    fontSize: "20px",
    lineHeight: "24px",
    color: "#1B1464",
    p: 1,
  },
  mobileDate: {
    fontWeight: 700,
    fontSize: "16px",
    color: "#1B1464",
  },
  mobileTime: {
    fontWeight: 700,
    fontSize: "28px",
    color: "#4D4D4D",
  },
};
