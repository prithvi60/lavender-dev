import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
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
  LocationOn,
  Search,
} from "@mui/icons-material";
import dayjs from "dayjs";
import { DatePicker, pickersLayoutClasses } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSearchModal,
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
import MyVerticallyCenteredModal from "../../Modals/MyVerticallyCenteredModal.js";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer";
import { MdOutlineClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

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
  } = useSelector((state) => state.searchPage);

  const dispatch = useDispatch();

  const shortcutsItems = [
    {
      label: "Today",
      getValue: () => {
        const today = dayjs();
        return [today.startOf("day"), today.endOf("day")];
      },
    },
    {
      label: "tomorrow",
      getValue: () => {
        const tomorrow = dayjs().add(1, "day");
        return [tomorrow.startOf("day"), tomorrow.endOf("day")];
      },
    },
    {
      label: "+2days",
      getValue: () => {
        const tomorrow = dayjs().add(2, "day");
        return [tomorrow.startOf("day"), tomorrow.endOf("day")];
      },
    },
    {
      label: "+3days",
      getValue: () => {
        const tomorrow = dayjs().add(3, "day");
        return [tomorrow.startOf("day"), tomorrow.endOf("day")];
      },
    },
    {
      label: "Next Week",
      getValue: () => {
        const today = dayjs();
        const startOfNextMonth = today.endOf("month").add(1, "day");
        return [startOfNextMonth, startOfNextMonth.endOf("month")];
      },
    },
    { label: "Reset", getValue: () => [null, null] },
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

  // const onChangeDate = (data) => {

  //   const fromDate =
  //     data[0]?.format("MMM DD") === undefined ? "" : data[0]?.format("MMM DD");
  //   const toDate =
  //     data[1]?.format("MMM DD") === undefined ? "" : data[1]?.format("MMM DD");

  //   dispatch(updateSearchDate({ selectedDate: `${fromDate} - ${toDate}` }));
  // };

  const onChangeDate = (data) => {
    dispatch(updateSearchDate({ selectedDate: data.target.value }));
  };

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
    switch (name) {
      case "Treatment":
        setIsTreatmentOpen(true);
        break;
      case "Location":
        setModalShow(true);
        break;
      case "Date":
        setDatePickerOpen(true);
        break;

      case "Time":
        setTimePickerOpen(true);
        break;

      default:
        return;
    }

    // Update form values on box click
    // dispatch(updateSearchSelectedBox({ selectedBox: name, showOptionContainer: true }))
  };
  //  const mutation = useMutation({
  //     mutationFn : (payLoad) => {
  //       return useQuery([], ()=>{endpoint.getSearchCustomers(payLoad)})
  //     },
  //   })

  const handleDateChange = (newDate) => {
    setDatePickerOpen(false);
  };

  const [queryResult, setQueryResult] = useState(null);
  const payLoad = {};
  useEffect(() => {}, []);

  //const {isLoading, isRefetching, data: customersData} = useQuery({queryKey: ['customer-data'], queryFn: () =>{ return endpoint.getSearchCustomers(payLoad)}})
  //const {data} = useQuery({queryKey: ['customer-da'], queryFn: () =>{ return endpoint.getEstablishemntDetails()}})

  const handleSearchIconClick = () => {
    // mutation.mutate(payLoad)
    return getRoute("Search");
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

  const getTreatementBasedGeoLocation = async () => {
    // setModalShow(true);
    // setFilterType("Treatement");
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
    // setModalShow(true);
    // setFilterType("Date");
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
    // setModalShow(true);
    // setFilterType("Time");
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

      <div className="w-full">
        <div className="search-panel">
          {/* <Form> */}

          {isTreatmentOpen ? (
            <>
              <div className="flex justify-end  mb-2 ">
                <MdOutlineClose
                  size={22}
                  color="red"
                  className="cursor-pointer"
                  onClick={closeTreatmentInputBox}
                />
              </div>
              <div className="treatment-input-grid-container ">
                <div className="treatment-input-container">
                  <input
                    type="text"
                    id="treatment"
                    placeholder="Enter Service name"
                    onChange={(e) => setTreatmentValue(e.target.value)}
                  />
                </div>
                <div
                  className="addtl-search-icon"
                  onClick={getTreatementBasedGeoLocation}
                >
                  <Search
                    className="search-button text-right text-white"
                    fontSize="medium"
                  />
                </div>
              </div>
            </>
          ) : isDatePickerOpen ? (
            <>
              <div className="flex justify-end mb-2">
                <MdOutlineClose
                  size={22}
                  color="red"
                  className="cursor-pointer"
                  onClick={closeDateInputBox}
                />
              </div>
              <div className="treatment-input-grid-container ">
                <div className="treatment-input-container">
                  <input
                    type="date"
                    id="treatement-date"
                    placeholder="Select Date"
                    onChange={(e) => setTreatmentDate(e.target.value)}
                  />
                </div>
                <div
                  className="addtl-search-icon"
                  onClick={getDateBasedGeoLocation}
                >
                  <Search
                    className="search-button text-right text-white"
                    fontSize="medium"
                  />
                </div>
              </div>
            </>
          ) : isTimePickerOpen ? (
            <>
              <div className="flex justify-end mb-2">
                <MdOutlineClose
                  size={22}
                  color="red"
                  className="cursor-pointer"
                  onClick={closeTimeInputBox}
                />
              </div>
              <div className="treatment-input-grid-container ">
                <div className="treatment-input-container">
                  <input
                    id="treatement-Time"
                    placeholder="Select Time"
                    type="time"
                    onChange={onChangeTime}
                  />
                </div>
                <div
                  className="addtl-search-icon"
                  onClick={getTimeBasedGeoLocation}
                >
                  <Search
                    className="search-button text-right text-white"
                    fontSize="medium"
                  />
                </div>
              </div>
            </>
          ) : isLocationOpen ? (
            <div className="treatment-input-grid-container ">
              <div className="treatment-input-container">
                <input
                  id="treatement-location"
                  placeholder="Enter Location"
                  type="text"
                  onChange={(e) => setLocationValue(e.target.value)}
                />
              </div>
              <div
                className="addtl-search-icon"
                onClick={getLocationBasedGeoLocation}
              >
                <Search
                  className="search-button text-right text-white"
                  fontSize="medium"
                />
              </div>
            </div>
          ) : (
            <div className="grid-container">
              <>
                <div
                  className={`grid-items ${
                    selectedBox === "Treatment" && "active"
                  }`}
                >
                  <Box
                    className={`search-box ${false ? "selected" : ""} ${
                      selectedBox?.toLowerCase() === "time"
                        ? "addtl-button"
                        : ""
                    }`}
                  >
                    <div className="search-box-title-icon">
                      <GetIcon iconName="TreatmentHeartIcon" />
                      <div className="search-box-title">
                        {treatmentList &&
                        treatmentList.length > 0 &&
                        !isTreatmentOpen ? (
                          <>
                            <Text name="Select" />
                            <Text
                              className="cursor-pointer name-bottom"
                              onClick={() => handleBoxClick("Treatment")}
                              name={treatmentList[0].treatmentList
                                .toString()
                                .replaceAll(",", ", ")}
                            ></Text>
                          </>
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
                      selectedBox?.toLowerCase() === "time"
                        ? "addtl-button"
                        : ""
                    }`}
                  >
                    <div className="search-box-title-icon">
                      <GetIcon iconName="LocationIcon" />
                      <div className="search-box-title">
                        {locationList && locationList.length > 0 ? (
                          <>
                            <Text
                              className="name-bottom"
                              onClick={() => handleBoxClick("Location")}
                              name={locationList[0].location
                                .toString()
                                .replaceAll(",", ", ")}
                            ></Text>
                          </>
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
                      selectedBox?.toLowerCase() === "time"
                        ? "addtl-button"
                        : ""
                    }`}
                  >
                    <div className="search-box-title-icon">
                      <GetIcon iconName="CalendarIcon" />
                      <div className="search-box-title">
                        {selectedDate && !isDatePickerOpen ? (
                          <>
                            <Text
                              align="left"
                              className="name-top"
                              name="Select"
                            />
                            <Text
                              className="cursor-pointer"
                              onClick={() => handleBoxClick("Date")}
                              name={selectedDate}
                              type
                            ></Text>
                          </>
                        ) : (
                          <>
                            <Text
                              align="left"
                              className="name-top"
                              name="Select"
                            />

                            <Text
                              id="name-bottom"
                              align="left"
                              className="name-bottom"
                              name="Date"
                              onClick={() => handleBoxClick("Date")}
                            />
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
                    <div className="search-box-title-icon">
                      <GetIcon iconName="AccessTimeFilledIcon" />
                      <div className="search-box-title">
                        {SelectedTime &&
                        (SelectedTime.from || SelectedTime.to) ? (
                          <Text
                            className="cursor-pointer"
                            onClick={() => handleBoxClick("Time")}
                            name={`${convertTo_HH_AM(
                              SelectedTime?.from?.selectedTime?.from
                            )} - ${convertTo_HH_AM(
                              SelectedTime?.to?.selectedTime?.to
                            )}`}
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
                    <div className="addtl-search-icon">
                      {/* <Link to={handleSearchIconClick()}>
                        <Search
                          className="search-button text-right text-white"
                          fontSize="medium"
                        />
                      </Link> */}
                      <Search
                        className="search-button text-right text-white"
                        fontSize="medium"
                      />
                    </div>
                  </Box>
                </div>
              </>
            </div>
          )}

          {selectedBox === "Treatment" && showOptionContainer && (
            <div className="home-filter-panel">
              <Paper elevation={2} className="treatment-panel">
                <SelectTreatment />
              </Paper>
            </div>
          )}

          {selectedBox === "Location" && showOptionContainer && (
            <div className="home-filter-panel three-column">
              <div></div>
              <Paper elevation={2} className="treatment-panel">
                <SelectLocation />
              </Paper>
            </div>
          )}

          {selectedBox === "Date" && showOptionContainer && (
            <div className="home-filter-panel two-column">
              <div></div>
              <Paper
                elevation={2}
                className="date-panel"
                style={{ overflow: "auto" }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDateRangePicker
                    slotProps={{
                      shortcuts: {
                        items: shortcutsItems,
                      },
                      actionBar: { actions: [] },
                    }}
                    // calendars={2}
                    onChange={onChangeDate}
                    sx={{
                      [`.${pickersLayoutClasses.contentWrapper}`]: {
                        alignItems: "center",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Paper>
            </div>
          )}

          {selectedBox === "Time" && showOptionContainer && (
            <div className="home-filter-panel one-column">
              <div></div>
              <Paper
                elevation={2}
                className="time-panel"
                style={{ overflow: "auto" }}
              >
                <SelectTimePicker />{" "}
                {/* Pass form controller to SelectTimePicker */}
              </Paper>
            </div>
          )}
          {/* </Form> */}
        </div>
      </div>
    </>
  );
};

export default NewSearchPanel;
