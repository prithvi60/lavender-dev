import { useEffect, useState } from "react";
import {
  range,
  addDateBy,
  areDatesSame,
  getMonday,
  addTime,
  getSelectedWeekDetails,
  formatDate,
} from "./utils";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  DAYS,
  DayWrapper,
  FlexBox,
  HGrid,
  Hour,
  HourLine,
  VGrid,
  HOUR_HEIGHT,
  HOUR_MARGIN_TOP,
  HourLineWithLabel,
  Wrapper,
  DayHeader,
  HourTimeline,
} from "./components/CalenderComponents";
import { GetScheduleDates } from "./BusinessScheduleContext";
import GetIcon from "../../../assets/Icon/icon";
import { Appointment } from "./components/Appointment";

export const WeeklyCalendar = () => {
  const {
    filteredAppointments,
    filterWeekStartDate,
    filterWeekEndDate,
    employees,
  } = GetScheduleDates();
  const week = getSelectedWeekDetails(filterWeekStartDate);
  const [appointments, setAppointments] = useState(filteredAppointments);

  const onAddEvent = (date) => {
    const text = "Hello";
    const from = 10;
    const to = 12;

    date.setHours(from);
    // date.setMinutes(from)

    setAppointments((prev) => [...prev, { text, date, howLong: to - from }]);
  };
  useEffect(() => {
    setAppointments(filteredAppointments);
  }, [filteredAppointments]);
  return (
    <Wrapper>
      <HGrid first={"60px"} cols={1}>
        <VGrid rows={24}>
          <HourTimeline />
        </VGrid>
        <HGrid cols={DAYS.length} className="h-full">
          {week.map((day, index) => (
            <DayWrapper
              className="sticky !important"
              //onDoubleClick={() => onAddEvent(addDateBy(mondayDate, index))}
            >
              <DayHeader currentDay={day} />

              {range(24).map((_) => (
                <Hour className="flex flex-col border-r border-solid border-r-gray-400 overflow-y-auto">
                  {range(4).map((_) => (
                    <div className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid"></div>
                  ))}
                </Hour>
              ))}

              {appointments[formatDate(day.date)]?.map((appointmentGroup) =>
                appointmentGroup.map((appointment, index, allAppointments) => {
                  const allAppointmentsCount = allAppointments.length;
                  return (
                    //<></>
                    <Appointment
                      index={index}
                      count={allAppointmentsCount}
                      data={appointment}
                      onDragEnd={(e) => {}}
                      elementRef={null}
                      onDragStart={(e) => {}}
                      disabled={true}
                      disableHoverOnDrag={undefined}
                      onDrag={() => {}}
                    />
                  );
                })
              )}
            </DayWrapper>
          ))}
        </HGrid>
      </HGrid>

      <HourLineWithLabel />
    </Wrapper>
  );
};
