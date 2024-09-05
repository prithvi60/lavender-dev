import * as React from "react";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GetIcon from "../../assets/Icon/icon.tsx";
import { useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints.ts";
import {
  UpdateEmployeeId,
  UpdateSelectedDate,
  UpdateTimeOfDayAndTime,
} from "../../store/slices/Booking/ScheduleAppoinmentSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { TimeOfDay } from "../../api/type.ts";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import Chip from "../../components/Chip.js";
import Text from "../../components/Text.js";
import {
  format,
  addDays,
  isSameDay,
  startOfWeek,
  isAfter,
  isSameMonth,
  isBefore,
  startOfToday,
} from "date-fns";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";

export default function RescheduleAppointment(props) {
  const datePickerRef = useRef(null);

  const scheduleAppoinmentList = useSelector(
    (state: any) => state.ScheduleAppoinment
  );
  // console.log("object is scheduleAppoinmentList", scheduleAppoinmentList);


  const [selectedDateBtn, setSelectedDateBtn] = useState(new Date());
  const { estData, onSetActiveStep } = props;
  const [availableTimeSlots, setAvailableTimeSlots] = React.useState<any>([]);
  const [clickedChipIndices, setClickedChipIndices] = React.useState(null);
  console.log(estData);
  const [employee, setEmployee] = React.useState([""]);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [timePeriodValue, setTimePeriodValue] = React.useState([]);
  const [indexValue, setIndexValue] = React.useState([]);
  const [totalDurationValue, setTotalDurationValue] = useState(0);
  const [startTimeValue, setStartTimeValue] = useState("11:59 pm");
  const [dateClicked, setDateClicked] = useState(false);
  const [employeeList, setEmployeeList] = useState(props?.estData?.employees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeeSlot, setEmployeeSlot] = useState("");

  const handleDateSelect = (date) => {
    if (date !== selectedDateBtn) {
      // console.log("Date selected:", date);
      setSelectedDateBtn(date);
      handleDateClick([date]);
      setDateClicked(true);
    }
  };
  let appointmentTimings;
  const dispatch = useDispatch();
  const { selectedDate, timeOfDay, startTime, endTime, id, totalDuration } =
    useSelector((state: any) => state.ScheduleAppoinment);

  // Function to fetch available slots
  const fetchAvailableSlots = async (day) => {
    const payLoad = {
      startDate: day[0],
      establishmentId: estData?.id,
      // "employeeId": "",
      totalDuration: 30,
      serviceTags: ["hair"],
    };
    return await endpoint.getAvailableSlots(payLoad);
  };

  async function handleDateClick(day) {
    setSelectedDateBtn(day[0]);
    appointmentTimings = await fetchAvailableSlots(day);

    setTimeout(() => {
      selectedDay(day[0]);
    }, 1000);
  }
  const selectedDay = (val) => {
    const date = new Date(val);
    // Extract year, month, and day
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adding leading zero if month < 10
    const day = ("0" + date.getDate()).slice(-2); // Adding leading zero if day < 10
    // Concatenate the formatted parts
    const formattedDate = `${year}-${month}-${day}`;
    const test = appointmentTimings?.data?.data?.filter(
      (slot) => slot.availableDate === formattedDate
    );
    setAvailableTimeSlots(test);
    setEmployee(id);
    //TODO set date value in store redux
    dispatch(UpdateSelectedDate({ selectedDate: formattedDate }));
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => { };
  };

  const handleClick = (timePeriod, slot, index) => {
    setClickedChipIndices(slot.startTime);

    dispatch(
      UpdateTimeOfDayAndTime({
        TimeOfDay: TimeOfDay[timePeriod],
        startTime: slot.startTime,
        endTime: slot.endTime,
        id: slot.employeeId,
      })
    );
  };

  const [selectedPaymentChips, setSelectedPaymentChips] = useState([]);

  useEffect(() => { }, [totalDuration, totalDurationValue]);

  const handleChipClick = (timePeriod, slot, index) => {
    const currentDate = new Date();
    const currentDateValue = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1
      }/${currentDate.getDate()}`;
    // Parse time strings into Date objects
    const startTime: any = new Date(`${currentDateValue} ${slot.startTime}`);
    const endTime: any = new Date(`${currentDateValue} ${slot.endTime}`);

    // Calculate the difference in milliseconds
    const timeDiffInMilliseconds = Math.abs(endTime - startTime);

    const newTotalDurationValue =
      totalDurationValue + timeDiffInMilliseconds / (1000 * 60);
    setTotalDurationValue(newTotalDurationValue);

    if (totalDuration <= newTotalDurationValue) {
      if (timePeriodValue === timePeriod && indexValue === index) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
    setTimePeriodValue([...timePeriodValue, timePeriod]);
    setIndexValue([...indexValue, index]);

    const item = `${slot.startTime} - ${slot.endTime}`;

    const updatedChips = selectedPaymentChips.includes(item)
      ? selectedPaymentChips.filter((chip) => chip !== item)
      : [...selectedPaymentChips, item];
    setSelectedPaymentChips(updatedChips);
    setEmployeeSlot(slot?.employeeId);

    dispatch(
      UpdateTimeOfDayAndTime({
        TimeOfDay: TimeOfDay[timePeriod],
        startTime: calculateTime(slot?.startTime),
        endTime: slot?.endTime,
      })
    );
  };

  function calculateTime(newStartTime) {
    const convertTo24Hour = (time12h) => {
      const [time, period] = time12h.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);
      if (period === "pm" && hours !== 12) {
        hours += 12;
      } else if (period === "am" && hours === 12) {
        hours = 0;
      }
      return hours * 60 + parseInt(minutes);
    };

    const startTimeInMinutes = convertTo24Hour(startTimeValue);
    const newStartTimeInMinutes = convertTo24Hour(newStartTime);

    // Compare times
    if (newStartTimeInMinutes < startTimeInMinutes) {
      setStartTimeValue(newStartTime);
      return newStartTime;
    }
    return startTimeValue;
  }

  const handleChipDelete = (timePeriod, slot, index) => {
    // Parse time strings into Date objects
    const startTime: any = new Date(`1970/01/01 ${slot.startTime}`);
    const endTime: any = new Date(`1970/01/01 ${slot.endTime}`);

    // Calculate the difference in milliseconds
    const timeDiffInMilliseconds = Math.abs(endTime - startTime);

    const newTotalDurationValue =
      totalDurationValue - timeDiffInMilliseconds / (1000 * 60);
    setTotalDurationValue(newTotalDurationValue);

    setIsDisabled(false);
    const item = `${slot.startTime} - ${slot.endTime}`;

    const updatedChips = selectedPaymentChips.filter((chip) => chip !== item);
    setSelectedPaymentChips(updatedChips);
  };

  // Handle employee selection
  const handleChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  useEffect(() => {
    dispatch(
      UpdateEmployeeId({
        id: selectedEmployeeId ? selectedEmployeeId : employeeSlot,
      })
    );
  });

  return (
    <div className="my-10 mt-2 md:mx-16" >
      {/* className="my-10 mt-2 md:mr-16 w-full md:w-3/5 px-6 lg:w-[70%]" */}
      <div className="flex items-center gap-3 ml-2 sm:ml-0">
        {/* <IconButton onClick={() => onSetActiveStep(0)}>
          <GetIcon iconName="BackIconArrow" />
        </IconButton> */}
        <div className="text-3xl font-bold">Reschedule</div>
      </div>

      <div className="mb-4">
        <CustomWeeklyDatePicker onDateSelect={handleDateSelect} />
      </div>

      <div className="mt-4 overflow-hidden ml-8">
        {availableTimeSlots?.length > 0 ? (
          Object.entries(availableTimeSlots[0]?.availableSlots).map(
            ([timePeriod, slotsArray]: any) => {
              return (
                <div className="schedule-chips" key={timePeriod}>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#4D4D4D",
                    }}
                  >
                    {timePeriod}
                  </p>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-2  gap-y-2.5 lg:gap-3 !overflow-x-auto md:grid-rows-3 w-full"
                    style={{
                      scrollbarWidth: "thin",
                      // @ts-ignore
                      "&::-webkit-scrollbar": {
                        height: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: "2px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                      },
                    }}
                  >
                    {slotsArray.length > 0 ? (
                      slotsArray?.map((slot: any, index: any) => {
                        return (
                          <div
                            className="cursor-pointer w-max"
                            key={index}
                            style={{ flexShrink: 0 }}
                          >
                            <Chip
                              disabled={
                                isDisabled &&
                                (timePeriodValue?.includes(timePeriod) &&
                                  indexValue?.includes(index)
                                  ? false
                                  : true)
                              }
                              type={
                                selectedPaymentChips.includes(
                                  `${slot.startTime} - ${slot.endTime}`
                                )
                                  ? "deletable"
                                  : "clickable"
                              }
                              label={`${slot.startTime} - ${slot.endTime}`}
                              onDelete={() =>
                                handleChipDelete(timePeriod, slot, index)
                              }
                              deleteIcon={
                                selectedPaymentChips.includes(
                                  `${slot.startTime} - ${slot.endTime}`
                                ) ? (
                                  <IconButton>
                                    <GetIcon iconName="CloseIcon" />
                                  </IconButton>
                                ) : undefined
                              }
                              onClick={() =>
                                handleChipClick(timePeriod, slot, index)
                              }
                              style={{
                                margin: "0px",
                                backgroundColor: selectedPaymentChips.includes(
                                  `${slot.startTime} - ${slot.endTime}`
                                )
                                  ? "#E6E1FF"
                                  : "#F2F2F2",
                                maxWidth: "150px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <Text
                        name={"No slots available."}
                        sx={{
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "#B3B3B3",
                        }}
                      />
                    )}
                  </div>
                  {/* TODO */}
                  <Divider sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />
                </div>
              );
            }
          )
        ) : (
          <div>
            {dateClicked ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <GetIcon
                  onClick={() => { }}
                  className="p-1 mx-16 my-5 rounded-sm cursor-pointer"
                  iconName="SlotBoxesFilled"
                />
                <div
                  id="title"
                  className="mb-3 text-xl font-bold "
                  style={{ color: "#4D4D4D" }}
                >
                  We are fully booked
                </div>
                <div style={{ color: "#4D4D4D" }}>
                  How about the next slot ?
                </div>
                <Button
                  onClick={() => { }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  variant="contained"
                >
                  Go to next slot
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <GetIcon
                  onClick={() => { }}
                  className="p-1 mx-16 my-5 rounded-sm cursor-pointer"
                  iconName="SlotBoxesFilled"
                />
                <div
                  id="title"
                  className="mb-3 text-xl font-bold "
                  style={{ color: "#4D4D4D" }}
                >
                  Select a date to book your slot
                </div>
              </div>
            )}
          </div>
        )}

        <Grid
          container
          spacing={2}
          sx={{
            marginTop: "10px",
            "@media (max-width: 600px)": {
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              paddingBottom: { xs: "120px", md: "250px" },
            },
          }}
        >
          <Grid item xs={3}>
            <p style={{ fontSize: "20px", fontWeight: 600, color: "#4D4D4D" }}>
              Service by
            </p>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <Select
                id="employee-select"
                value={selectedEmployeeId}
                onChange={handleChange}
                defaultValue="Any Employee"
                sx={{
                  width: "300px",
                  height: "45px",
                  borderRadius: "10px",
                  marginBottom: "25px",
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#825FFF',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#825FFF',
                  },
                }}
              >
                <MenuItem value="Any Employee">
                  Any Employee
                </MenuItem>
                {employeeList?.map((employee) => (
                  <MenuItem
                    key={employee?.employeeId}
                    value={employee?.employeeId}
                  >
                    {employee?.employeeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const styles = {
  customWeeklyPicker: {
    width: "100%",
    maxWidth: "800px",
    marginLeft: "5%",
  },
  monthYear: {
    textAlign: "center" as const,
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
  },
  weekContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#6200ee",
    cursor: "pointer",
  },
  daysContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  dayColumn: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  dayName: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "5px",
  },
  dayNumber: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "14px",
    color: "black",
    border: "1px solid #B3B3B3",
  },

  dayNumberCurrentSelected: {
    backgroundColor: "#E6E1FF",
    border: "none",
  },
  dayNumberSelected: {
    backgroundColor: "#E6E1FF",
    color: "black",
    border: "none",
  },
  dayNumberPast: {
    color: "#ccc",
    backgroundColor: "#f5f5f5",
    cursor: "not-allowed",
    border: "none",
  },
};

const CustomWeeklyDatePicker = ({ onDateSelect }) => {
  const [weekStart, setWeekStart] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    onDateSelect(startOfToday());
  }, []);

  const handleDateClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    // console.log("date,", formattedDate)
    if (!isBefore(date, startOfToday())) {
      setSelectedDate(date);
      onDateSelect(formattedDate);
    }
  };

  const handlePrevWeek = () => {
    setWeekStart(addDays(weekStart, -7));
  };

  const handleNextWeek = () => {
    setWeekStart(addDays(weekStart, 7));
  };

  return (
    <div style={styles.customWeeklyPicker}>
      <div style={styles.monthYear}>{format(weekStart, "MMMM yyyy")}</div>
      <div style={styles.weekContainer}>
        <IconButton
          onClick={handlePrevWeek}
          style={{ marginRight: "10px", marginTop: "5%" }}
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
        <div style={styles.daysContainer}>
          {days.map((day, index) => (
            <div key={index} style={styles.dayColumn}>
              <div style={styles.dayName}>{format(day, "EEE")}</div>
              <div
                style={{
                  ...styles.dayNumber,
                  ...(isBefore(day, startOfToday())
                    ? styles.dayNumberPast
                    : {}),
                  ...(isSameDay(day, selectedDate) &&
                    isSameDay(day, startOfToday())
                    ? styles.dayNumberCurrentSelected
                    : {}),
                  ...(isSameDay(day, selectedDate) &&
                    !isSameDay(day, startOfToday())
                    ? styles.dayNumberSelected
                    : {}),
                }}
                onClick={() => handleDateClick(day)}
              >
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        <IconButton
          onClick={handleNextWeek}
          style={{ marginLeft: "10px", marginTop: "5%" }}
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
    </div>
  );
};
