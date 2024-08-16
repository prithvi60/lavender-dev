import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Text from "../../components/Text.js";
import SelectTreatment from "./SelectTreatment.js";
import SelectTimePicker from "./SelectTime/SelectTimePicker.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import {
  AccessTime,
  ContentCut,
  DateRange,
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  LocationOn,
  Search,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker, pickersLayoutClasses } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSearchModal,
  updateDate,
  updateSearchDate,
  updateSearchLocationList,
  updateSearchSelectedBox,
  updateSearchTime,
  updateSearchTreatment,
} from "../../store/slices/searchPageSlice.js";
import SelectLocation from "./SelectLocation.tsx";
import ButtonRouter from "../../components/ButtonRouter.js";
import { getRoute } from "../../utils/index.js";
import { Link } from "react-router-dom";
import { convertTo_HH_AM } from "../../utils/TimeFormat.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints.ts";
import GetIcon from "../../assets/Icon/icon.tsx";
import MyVerticallyCenteredModal from "../../modals/MyVerticallyCenteredModal.js";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { MdOutlineClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
//  Change date picker forma
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
});
// Custom shortcut
const ShortcutButton = styled(Button)(({ theme, selected }) => ({
  borderRadius: "16px",
  padding: "4px 6px",
  marginRight: "8px",
  marginBottom: "8px",
  textTransform: "none",
  backgroundColor: selected ? "#E6E1FF" : "#f0f0f0",
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: "#E6E1FF",
  },
}));

const NewSearchPanel = () => {
  const [isTreatmentOpen, setIsTreatmentOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const [treatmentValue, setTreatmentValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [treatmentDate, setTreatmentDate] = useState("");
  const [treatmentTime, setTreatmentTime] = useState({});
  const [filterType, setFilterType] = useState("Treatemt");
  const [treatmentServicesList, setTreatmentServicesList] = useState([]);

  const navigate = useNavigate();

  const {
    selectedBox,
    showOptionContainer,
    treatmentList,
    locationList,
    selectedDate,
    SelectedTime,
    choseFromOptions,
    date,
  } = useSelector((state) => state.searchPage);

  const dispatch = useDispatch();

  const datePanelRef = useRef(null);
  const treatmentPanelRef = useRef(null);
  const timePanelRef = useRef(null);

  const shortcutsItems = [
    {
      label: "Flexible",
      getValue: () => "",
    },
    {
      label: "Today",
      getValue: () => {
        const today = dayjs();
        return `${today.format("MMMM DD")} - ${today.format("MMMM DD")}`;
      },
    },
    {
      label: "Tomorrow",
      getValue: () => {
        const today = dayjs();
        const tomorrow = today.add(1, "day");
        return `${tomorrow.format("MMMM DD")} - ${tomorrow.format("MMMM DD")}`;
      },
    },
    {
      label: "+2 Days",
      getValue: () => {
        const today = dayjs();
        const plusTwoDay = today.add(2, "day");
        return `${today.format("MMMM DD")} - ${plusTwoDay.format("MMMM DD")}`;
      },
    },
    {
      label: "+3 Days",
      getValue: () => {
        const today = dayjs();
        const plusThreeDay = today.add(3, "day");
        return `${today.format("MMMM DD")} - ${plusThreeDay.format("MMMM DD")}`;
      },
    },
    {
      label: "Next Week",
      getValue: () => {
        const today = dayjs();
        const startOfNextWeek = today.endOf("week").add(1, "day");
        const endOfNextWeek = startOfNextWeek.endOf("week");
        return `${startOfNextWeek.format("MMMM DD")} - ${endOfNextWeek.format(
          "MMMM DD"
        )}`;
      },
    },
    { label: "Reset", getValue: () => "" },
  ];

  const gridRef = useRef < HTMLDivElement > null; // Explicitly specify the type of gridRef

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gridRef.current && !gridRef.current.contains(event.target)) {
        // Clicked outside of the grid box
        dispatch(closeSearchModal());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);
  const [activeShortcut, setActiveShortcut] = useState(null);

  const onChangeTime = (data) => {
    const startTime = data.target.value;

    const [hours, minutes] = startTime.split(":");
    const selectedDate = new Date();
    selectedDate.setHours(parseInt(hours));
    selectedDate.setMinutes(parseInt(minutes));

    selectedDate.setHours(selectedDate.getHours() + 3);

    const endTime = selectedDate.toTimeString().slice(0, 5);

    setTreatmentTime({ from: startTime, to: endTime });
  };

  const handleBoxClick = (name) => {
    if (name === "Location") {
      setModalShow(true);
    } else {
      dispatch(
        updateSearchSelectedBox({
          selectedBox: name,
          showOptionContainer: true,
        })
      );
    }
  };

  const handleDateChange = (newDate) => {
    setDatePickerOpen(false);
  };

  const onChangeDate = (data) => {
    const fromDate = data[0] ? format(new Date(data[0]), "MMMM dd") : "";
    const toDate = data[1] ? format(new Date(data[1]), "MMMM dd") : "";

    const fromDateToPayload = data[0]
      ? format(new Date(data[0]), "yyyy-MM-dd")
      : "";
    const toDateToPayload = data[1]
      ? format(new Date(data[1]), "yyyy-MM-dd")
      : "";

    dispatch(updateSearchDate({ selectedDate: `${fromDate} ${toDate}` }));
    dispatch(
      updateDate({ date: `${fromDateToPayload} to ${toDateToPayload}` })
    );
  };

  const [queryResult, setQueryResult] = useState(null);
  const payLoad = {};
  useEffect(() => {}, []);

  const getAddressDetails = async (card) => {
    const { geoX, geoY } = card;
    if (geoX !== null && geoY !== null) {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${geoX},${geoY}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.results && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].formatted_address;
        return location;
      }
    }
    return null;
  };

  const handleSearchIconClick = async () => {
    const payLoad = {};

    if (treatmentList && treatmentList.length > 0) {
      payLoad.serviceNames = treatmentList;
    }

    if (date) {
      const [startDate, endDate] = date.split("to").map((date) => date?.trim());
      if (startDate) {
        payLoad.startDate = startDate;
      }
      if (endDate) {
        payLoad.endDate = endDate;
      }
    }

    if (locationList.length > 0) {
      const { center, range } = locationList[0];
      if (center) {
        if (center.lat) {
          payLoad.geoX = center.lat;
        }
        if (center.lng) {
          payLoad.geoY = center.lng;
        }
      }
      if (range) {
        payLoad.range = range;
      }
    }

    if (SelectedTime) {
      const { from, to } = SelectedTime;
      if (from) {
        payLoad.startTime = from;
      }
      if (to) {
        payLoad.endTime = to;
      }
    }

    try {
      const establishmentSearchResultResponse =
        await endpoint.getEstablishmentSearchResults(payLoad);

      if (establishmentSearchResultResponse.data.success) {
        const treatmentServicesList =
          establishmentSearchResultResponse.data.data;

        for (const card of treatmentServicesList) {
          const location = await getAddressDetails(card);
          card.location = location;
        }
        setTreatmentServicesList(treatmentServicesList);
        navigate("/search", {
          state: {
            treatmentServicesList: treatmentServicesList,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeTreatment = (e) => {
    dispatch(updateSearchTreatment([{ treatmentList: e.target.value }]));
    setIsTreatmentOpen(!isTreatmentOpen);
  };

  const closeTreatmentInputBox = () => {
    setIsTreatmentOpen(false);
  };

  const closeDateInputBox = () => {
    setDatePickerOpen(false);
  };

  const closeTimeInputBox = () => {
    setTimePickerOpen(false);
  };

  const getTreatementBasedGeoLocation = async () => {
    if (treatmentValue.length >= 3) {
      const payLoad = {
        serviceName: treatmentValue,
      };
      try {
        const treatementBasedGeoLocationResponse =
          await endpoint.getTreatmentServicesList(payLoad);

        const treatmentServicesList =
          treatementBasedGeoLocationResponse.data.data;

        for (const card of treatmentServicesList) {
          const location = await getAddressDetails(card);
          card.location = location;
        }

        setTreatmentServicesList(treatmentServicesList);
        navigate("/search", {
          state: {
            treatmentServicesList: treatmentServicesList,
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please enter minimum 3 letters to Search");
    }
  };

  const getLocationBasedGeoLocation = () => {
    setModalShow(true);
  };

  const getDateBasedGeoLocation = async () => {
    if (treatmentDate) {
      const payLoad = {
        date: treatmentDate,
      };

      try {
        const dateBasedGeoLocationResponse =
          await endpoint.getTreatmentServicesListByDate(payLoad);

        const treatmentServicesList = dateBasedGeoLocationResponse.data.data;

        for (const card of treatmentServicesList) {
          const location = await getAddressDetails(card);
          card.location = location;
        }

        setTreatmentServicesList(treatmentServicesList);
        navigate("/search", {
          state: {
            treatmentServicesList: treatmentServicesList,
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please select date to Search");
    }
  };

  const getTimeBasedGeoLocation = async () => {
    if (treatmentTime.from) {
      const payLoad = {
        startTime: treatmentTime.from,
        endTime: treatmentTime.to,
      };

      try {
        const timeBasedGeoLocationResponse =
          await endpoint.getTreatmentServicesListByTime(payLoad);
        const treatmentServicesList = timeBasedGeoLocationResponse.data.data;
        for (const card of treatmentServicesList) {
          const location = await getAddressDetails(card);
          card.location = location;
        }
        setTreatmentServicesList(treatmentServicesList);
        navigate("/search", {
          state: {
            treatmentServicesList: treatmentServicesList,
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please select time to Search");
    }
  };

  const closeFilterPannel = () => {
    dispatch(updateSearchSelectedBox({ selectedBox: "" }));
  };

  const [selectedShortcut, setSelectedShortcut] = useState("Flexible");
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);

  const handleShortcutClick = (shortcut) => {
    const selectedDate = shortcut.getValue();
    dispatch(updateSearchDate({ selectedDate }));

    if (selectedDate) {
      const [start, end] = selectedDate.split(" - ");
      const startDate = dayjs(start, "MMMM DD");
      const endDate = dayjs(end, "MMMM DD");
      dispatch(
        updateDate({
          date: `${startDate.format("YYYY-MM-DD")} to ${endDate.format(
            "YYYY-MM-DD"
          )}`,
        })
      );
      setSelectedDateRange([startDate, endDate]);
    } else {
      dispatch(updateDate({ date: "" }));
      setSelectedDateRange([null, null]);
    }

    setSelectedShortcut(shortcut.label);
  };

  const handleDateRangeChange = (newValue) => {
    onChangeDate(newValue);
    setSelectedDateRange(newValue);
    setSelectedShortcut("Flexible");
  };

  // Outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (datePanelRef.current &&
          !datePanelRef.current.contains(event.target)) ||
        (treatmentPanelRef.current &&
          !treatmentPanelRef.current.contains(event.target)) ||
        (timePanelRef.current && !timePanelRef.current.contains(event.target))
      ) {
        closeFilterPannel();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // DatePicker shortcuts and customstyling componenet
  // Use an effect to set the initial state
  useEffect(() => {
    handleShortcutClick(shortcutsItems[0]); // Set "Flexible" as default
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        filterType={filterType}
        setIsLocationOpen={setIsLocationOpen}
        setIsTreatmentOpen={setIsTreatmentOpen}
        setDatePickerOpen={setDatePickerOpen}
        setTimePickerOpen={setTimePickerOpen}
        treatmentServicesList={treatmentServicesList}
      />

      <div className="w-full relative">
        <div className="search-panel">
          {/* <Form> */}

          <div className="grid-container">
            <>
              <div
                className={`grid-items ${
                  selectedBox === "Treatment" && "active"
                }`}
              >
                <Box
                  className={`search-box ${false ? "selected" : ""} ${
                    selectedBox?.toLowerCase() === "time" ? "addtl-button" : ""
                  }`}
                >
                  <div
                    className="search-box-title-icon"
                    onClick={() => handleBoxClick("Treatment")}
                  >
                    <GetIcon iconName="TreatmentHeartIcon" />
                    <div className="search-box-title">
                      {treatmentList && treatmentList.length > 0 ? (
                        <Text
                          sx={{
                            fontSize: "20px",
                            fontWeight: 400,
                            color: "#616161",
                          }}
                          className="cursor-pointer"
                          name={treatmentList.toString().replaceAll(",", ", ")}
                        ></Text>
                      ) : (
                        <>
                          <Text
                            align="left"
                            className="name-top"
                            name="Select"
                          />
                          <label htmlFor="name-bottom">
                            <Text
                              id="name-bottom"
                              align="left"
                              className="name-bottom"
                              name={"Treatment"}
                              onClick={() => handleBoxClick("Treatment")}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              </div>

              <div
                className={`grid-items ${
                  selectedBox === "Location" && "active"
                }`}
              >
                <Box
                  className={`search-box ${false ? "selected" : ""} ${
                    selectedBox?.toLowerCase() === "time" ? "addtl-button" : ""
                  }`}
                >
                  <div
                    className="search-box-title-icon"
                    onClick={() => handleBoxClick("Location")}
                  >
                    <GetIcon iconName="LocationIcon" />
                    <div className="search-box-title">
                      {locationList && locationList.length > 0 ? (
                        <Text
                          className="cursor-pointer"
                          sx={{
                            fontSize: "20px",
                            fontWeight: 400,
                            color: "#616161",
                          }}
                          name={locationList[0]?.location
                            ?.toString()
                            .replaceAll(",", ", ")}
                        ></Text>
                      ) : (
                        <>
                          <Text
                            align="left"
                            className="name-top"
                            name="Select"
                          />
                          <label htmlFor="name-bottom">
                            <Text
                              id="name-bottom"
                              align="left"
                              className="name-bottom"
                              name="Location"
                              onClick={() => handleBoxClick("Location")}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              </div>

              <div
                className={`grid-items ${selectedBox === "Date" && "active"}`}
              >
                <Box
                  className={`search-box ${false ? "selected" : ""} ${
                    selectedBox?.toLowerCase() === "time" ? "addtl-button" : ""
                  }`}
                >
                  <div
                    className="search-box-title-icon"
                    onClick={() => handleBoxClick("Date")}
                  >
                    <GetIcon iconName="CalendarIcon" />
                    <div className="search-box-title">
                      {selectedDate ? (
                        <Text
                          sx={{
                            fontSize: "20px",
                            fontWeight: 400,
                            color: "#616161",
                          }}
                          className="cursor-pointer"
                          name={selectedDate}
                        ></Text>
                      ) : (
                        <>
                          <Text
                            align="left"
                            className="name-top"
                            name="Select"
                          />
                          <label htmlFor="name-bottom">
                            <Text
                              id="name-bottom"
                              align="left"
                              className="name-bottom"
                              name="Date"
                              onClick={() => handleBoxClick("Date")}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </Box>
              </div>

              <div
                className={`grid-items ${selectedBox === "Time" && "active"}`}
              >
                <Box className="search-box addtl-button MuiBox-root css-0">
                  <div
                    className="search-box-title-icon"
                    onClick={() => handleBoxClick("Time")}
                  >
                    <GetIcon iconName="AccessTimeFilledIcon" />
                    <div className="search-box-title">
                      {SelectedTime &&
                      (SelectedTime.from || SelectedTime.to) ? (
                        <Text
                          sx={{
                            fontSize: "20px",
                            fontWeight: 400,
                            color: "#616161",
                          }}
                          className="cursor-pointer"
                          // name={
                          //   !choseFromOptions
                          //     ? `${convertTo_HH_AM(
                          //         SelectedTime?.from
                          //       )} - ${convertTo_HH_AM(SelectedTime?.to)}`
                          //     : `${SelectedTime?.from} - ${SelectedTime?.to}`
                          // }
                          name={
                            SelectedTime?.to
                              ? `${SelectedTime?.from} - ${SelectedTime?.to}`
                              : `${SelectedTime?.from}`
                          }
                        ></Text>
                      ) : (
                        <>
                          <Text
                            align="left"
                            className="name-top"
                            name="Select"
                          />
                          <label htmlFor="name-bottom">
                            <Text
                              id="name-bottom"
                              align="left"
                              className="name-bottom"
                              name="Time"
                              onClick={() => handleBoxClick("Time")}
                            />
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className="addtl-search-icon"
                    onClick={() => handleSearchIconClick()}
                  >
                    <IconButton>
                      <GetIcon iconName="MainSearch" />
                    </IconButton>
                    {/* <Search className='search-button text-right mr-2' fontSize='medium' /> */}
                  </div>
                </Box>
              </div>
            </>
          </div>

          {selectedBox === "Treatment" && showOptionContainer && (
            <div className="home-filter-panel">
              <Paper
                elevation={2}
                className="treatment-panel"
                ref={treatmentPanelRef}
              >
                <SelectTreatment />
              </Paper>
            </div>
          )}

          {selectedBox === "Location" && showOptionContainer && (
            <div className="home-filter-panel three-column ">
              <div></div>
              <Paper elevation={2} className="treatment-panel">
                <SelectLocation />
              </Paper>
            </div>
          )}

          {selectedBox === "Date" && showOptionContainer && (
            <div
              className="home-filter-panel"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Paper
                elevation={2}
                className="date-panel"
                style={{
                  overflow: "auto",
                  width: "100%",
                  maxWidth: "max-content",
                }}
                ref={datePanelRef}
              >
                <div className="flex justify-end p-2 pb-0 cursor-pointer text-black">
                  <CloseIcon onClick={() => closeFilterPannel()} />
                </div>
                <div>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      borderRadius: "12px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "24px",
                        paddingTop: "6px",
                        paddingRight: "8px",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ marginBottom: "10%", textAlign: "left" }}
                      >
                        Choose your convenient date
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "8px",
                        }}
                      >
                        {shortcutsItems.map((shortcut) => (
                          <ShortcutButton
                            key={shortcut.label}
                            selected={selectedShortcut === shortcut.label}
                            onClick={() => handleShortcutClick(shortcut)}
                          >
                            {shortcut.label}
                          </ShortcutButton>
                        ))}
                      </Box>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateRangePicker
                        value={selectedDateRange}
                        onChange={handleDateRangeChange}
                        slotProps={{
                          actionBar: { actions: [] },
                        }}
                        minDate={dayjs()}
                        displayStaticWrapperAs="desktop"
                        calendars={1}
                        slots={{
                          calendarHeader: ({ currentMonth, onMonthChange }) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "0 16px",
                                marginBottom: "12px",
                              }}
                            >
                              <IconButton
                                onClick={() =>
                                  onMonthChange(
                                    dayjs(currentMonth).subtract(1, "month")
                                  )
                                }
                              >
                                <KeyboardArrowLeftOutlined
                                  sx={{
                                    backgroundColor: "#1a237e",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "4px",
                                  }}
                                />
                              </IconButton>
                              <Typography variant="h6">
                                {dayjs(currentMonth).format("MMMM YYYY")}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  onMonthChange(
                                    dayjs(currentMonth).add(1, "month")
                                  )
                                }
                              >
                                <KeyboardArrowRightOutlined
                                  sx={{
                                    backgroundColor: "#1a237e",
                                    color: "white",
                                    borderRadius: "50%",
                                    padding: "4px",
                                  }}
                                />
                              </IconButton>
                            </div>
                          ),
                        }}
                        sx={{
                          "& .MuiDateRangeCalendar-root": {
                            "& > *:first-child": {
                              display: "none",
                            },
                            // maxWidth: "300px",
                          },
                          "& .MuiPickersCalendarHeader-root": {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: 2,
                            paddingRight: 2,
                            paddingTop: 1,
                            paddingBottom: 1,
                            borderBottom: "1px solid #e0e0e0",
                            marginBottom: "10px",
                          },
                          "& .MuiDateRangePickerDay-rangeIntervalDayHighlight":
                            {
                              backgroundColor: "#F3F0FF",
                            },
                          "& .MuiDateRangePickerDay-rangeIntervalDayHighlightStart, & .MuiDateRangePickerDay-rangeIntervalDayHighlightEnd":
                            {
                              backgroundColor: "#E6E1FF",
                              "&::before": {
                                backgroundColor: "#E6E1FF",
                              },
                            },
                          "& .MuiDateRangePickerDay-day.Mui-selected": {
                            backgroundColor: "#825FFF !important",
                          },
                          "& .MuiDayCalendar-header": {
                            borderBottom: "1px solid #e0e0e0",
                            paddingBottom: "8px",
                            marginBottom: "8px",
                            marginLeft: "5%",
                            marginRight: "5%",
                          },
                          "& .MuiPickersCalendarHeader-label": {
                            fontWeight: "bold",
                            order: 2,
                            flex: 1,
                            textAlign: "center",
                          },
                          "& .MuiPickersArrowSwitcher-root": {
                            order: 1,
                          },
                          "& .MuiDayPickersDay-root": {
                            width: 36,
                            height: 36,
                            fontSize: "0.875rem",
                            margin: "0 2px",
                          },
                        }}
                        componentsProps={{
                          leftArrowButton: {
                            children: <GetIcon iconName="ForwardIcon" />,
                          },
                          rightArrowButton: {
                            children: <GetIcon iconName="BackIcon" />,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </div>
              </Paper>
            </div>
          )}
          {selectedBox === "Time" && showOptionContainer && (
            <div className="home-filter-panel one-column absolute top-full left-0 right-0 z-10">
              <div></div>
              <Paper
                elevation={2}
                className="time-panel"
                ref={timePanelRef}
                // style={{ overflow: "auto" }}
              >
                <SelectTimePicker />{" "}
              </Paper>
            </div>
          )}
          <Typography
            sx={{
              ...styles.subTitle,
              position: "absolute",
              top: { xs: "50vh", sm: "18vh" },
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: { xs: "34px", sm: "45px" },
              lineHeight: { xs: "30px", sm: "54px" },
              width: "100%",
            }}
            className="hero-subtitle"
          >
            Book your next salon experience
            <br />
            with Lavender
          </Typography>
        </div>
      </div>
    </>
  );
};

export default NewSearchPanel;
const styles = {
  subTitle: {
    fontFamily: "Urbanist",
    fontWeight: 700,
    color: "#333333",
    textAlign: "center",
    paddingLeft: 0,
  },
};
