import React, { useEffect, useState } from "react";
import {
  range,
  addDateBy,
  areDatesSame,
  getMonday,
  addTime,
  getSelectedWeekDetails,
  formatDate,
} from "./utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { useFilterContext } from "../FilterContext";
import { useRef } from "react";
export const WeeklyCalendar = () => {
  const { filteredAppointments, filterWeekStartDate } = GetScheduleDates();
  const week = getSelectedWeekDetails(filterWeekStartDate);
  const [appointments, setAppointments] = useState(filteredAppointments);
  const { statusFilter, bookingFilter, teamFilter } = useFilterContext();
  const scheduleGridRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);

  useEffect(() => {
    setAppointments(filteredAppointments);
  }, [filteredAppointments]);

  useEffect(() => {
    if (scheduleGridRef.current) {
      const currentHour = new Date().getHours();
      const scrollPosition = currentHour * 120; // HOUR_HEIGHT = 120
      scheduleGridRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top fixed section */}
      <div className="flex-none bg-white border-b z-10 ">
        {/* Date selector */}

        {/* Fixed days header row */}
        <div className="flex bg-white border-b ">
          <div className="w-[60px]"></div>
          {week.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <DayHeader currentDay={day} />
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable schedule grid */}
      <div className="flex-1 overflow-y-auto" ref={scheduleGridRef}>
        <Wrapper>
          <HGrid first={"60px"} cols={1}>
            <VGrid rows={24}>
              <HourTimeline />
            </VGrid>
            <HGrid cols={DAYS.length} className="h-full">
              {week.map((day, index) => (
                <DayWrapper key={index}>
                  {range(24).map((hour) => (
                    <Hour key={hour} className="flex flex-col border-r border-solid border-r-gray-400">
                      {range(4).map((quarter) => (
                        <div key={quarter} className="border-b border-dashed border-b-[#B3B3B3] w-full h-1/4 last:border-solid"></div>
                      ))}
                    </Hour>
                  ))}
                  {appointments[formatDate(day.date)]?.map((appointmentGroup) =>
                    appointmentGroup
                      .filter(appointment =>
                        (statusFilter.length === 0 || statusFilter.includes(appointment.status)) &&
                        (teamFilter === "" || teamFilter === appointment.employee) &&
                        (bookingFilter === "" || bookingFilter === appointment.client)
                      )
                      .map((appointment, index, allAppointments) => (
                        <Appointment
                          key={index}
                          index={index}
                          count={allAppointments.length}
                          data={appointment}
                          onDragEnd={() => {}}
                          elementRef={null}
                          onDragStart={() => {}}
                          disabled={true}
                          disableHoverOnDrag={undefined}
                          onDrag={() => {}}
                        />
                      ))
                  )}
                </DayWrapper>
              ))}
            </HGrid>
          </HGrid>
          <HourLineWithLabel />
        </Wrapper>
      </div>
    </div>
  );
};
