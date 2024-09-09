import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "../../../components/ui/select";

import { ChevronDown, ChevronRight } from "lucide-react";
import { ChevronLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdownMenu";
import GetIcon from "../../../assets/Icon/icon";
import { Button } from "../../../components/ui/button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { Divider } from "@mui/material";
import { format } from "date-fns";
const LeftArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RightArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="#667085" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function SearchInput({ value, onChange, placeholder }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "35%",
        height: "37px",
        boxShadow : "none",
        border: "1px solid #DEE2E6"
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        size="medium"
        value={value}
        sx={{ ml: 1, flex: 1, fontWeight: "600",minWidth:"135px",overflow:"hidden" }}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        onChange={onChange}
      />
    </Paper>
  );
}

export function Selector({
  placeholder = "",
  options,
  className,
  label = null,
  onSelect,
  value = "", 
}) {
  return (
    <>
      <Select
        onValueChange={(value) => {
          onSelect(value);
        }}
        value={value}
      >
        <SelectGroup>
          {label ? (
            <SelectLabel
              style={{
                color: "#4D4D4D",
                fontSize: "18px",
                fontWeight: 700,
                paddingTop: "10px",
              }}
            >
              {label}
            </SelectLabel>
          ) : (
            <></>
          )}

          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} /> 
          </SelectTrigger>
          <SelectContent className="z-[1500]">
            {options?.map((opt) => (
              <SelectItem value={opt} key={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </SelectGroup>
      </Select>
    </>
  );
}

// export function PaginationComp() {
//     return (
//         <div>
//         <Pagination>
//             <PaginationContent>
//                 <PaginationItem>
//                 <PaginationPrevious href="#" />
//                 </PaginationItem>
//                 <PaginationItem>
//                 <PaginationLink href="#">1</PaginationLink>
//                 </PaginationItem>
//                 <PaginationItem>
//                 <PaginationEllipsis />
//                 </PaginationItem>
//                 <PaginationItem>
//                 <PaginationNext href="#" />
//                 </PaginationItem>
//             </PaginationContent>
//         </Pagination>
//         {/* <ChevronRight color={"white"} className="w-4 h-4 p-4 text-black bg-orange-400 rounded-full" /> */}
//         </div>
//     )
// }

// export function FilterDrawer() {
//     return (<SwipeableDrawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//             onOpen={toggleDrawer(anchor, true)}
//           >
//             {list(anchor)}
//     </SwipeableDrawer>)
//}

// import DatePicker from 'react-datepicker';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// export const DropdownContent = ({ startDate, endDate, setStartDate, setEndDate }) => {
//   return (
//     <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px', width: '300px', background: 'white' }}>
//       <Tabs>
//         <TabList>
//           <Tab>Start Date</Tab>
//           <Tab>End Date</Tab>
//         </TabList>

//         <TabPanel>
//           <h3>Select Start Date</h3>
//           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//         </TabPanel>
//         <TabPanel>
//           <h3>Select End Date</h3>
//           <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
//         </TabPanel>
//       </Tabs>
//     </div>
//   );
// };

const CustomCalendarHeaderRoot = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 16px",
  alignItems: "center",
});

export function CustomCalendarHeader(props: PickersCalendarHeaderProps<Dayjs>) {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () =>
    onMonthChange(currentMonth.add(1, "month"), "left");
  const selectNextYear = () =>
    onMonthChange(currentMonth.add(1, "year"), "left");
  const selectPreviousMonth = () =>
    onMonthChange(currentMonth.subtract(1, "month"), "right");
  const selectPreviousYear = () =>
    onMonthChange(currentMonth.subtract(1, "year"), "right");

  return (
    <CustomCalendarHeaderRoot>
      <Stack spacing={1} direction="row">
        {/* <IconButton onClick={selectPreviousYear} title="Previous year">
          <KeyboardDoubleArrowLeftIcon />
        </IconButton> */}
        <IconButton onClick={selectPreviousMonth} title="Previous month">
          <ChevronLeft
            width={17}
            height={17}
            className={`text-white bg-blue-950 rounded-full`}
          />
        </IconButton>
      </Stack>
      <Typography className="text-black" variant="body2">
        {currentMonth.format("MMMM YYYY")}
      </Typography>
      <Stack spacing={1} direction="row">
        <IconButton onClick={selectNextMonth} title="Next month">
          <ChevronRight
            width={24}
            height={24}
            className={`text-white bg-blue-950 rounded-full`}
          />
        </IconButton>
        {/* <IconButton onClick={selectNextYear} title="Next year">
          <KeyboardDoubleArrowRightIcon />
        </IconButton> */}
      </Stack>
    </CustomCalendarHeaderRoot>
  );
}

export function CalendarHeaderComponent({ date, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DateCalendar
          onChange={(v) => {
            const dateV = new Date(v);
            onChange(dateV);
          }}
          value={dayjs(date)}
          // sx={{
          //   border: '2px solid #000', // Customize the border width and color
          //   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Customize the shadow
          //   borderRadius: '8px' // Optional: add border radius for rounded corners
          // }}
          slots={{ calendarHeader: CustomCalendarHeader }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const AppointmentDateSelector = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate || new Date()));
  const [activeTab, setActiveTab] = useState('start');

  useEffect(() => {
    if (endDate < startDate) {
      endDateControl("");
    }
  }, [endDate]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" className="mr-2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          {formatDateRange()}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0" align="start">
        <div className="flex justify-around p-2 pb-0 bg-gray-100">
          <Button
            variant="ghost"
            className={`flex-1 justify-start font-normal ${activeTab === 'start' ? 'bg-[#7F56D9] text-white rounded-t-xl rounded-b-none' : ''}`}
            onClick={() => setActiveTab('start')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" className="mr-2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Starting date
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 justify-start font-normal ${activeTab === 'end' ? 'bg-[#7F56D9] text-white rounded-t-xl rounded-b-none' : ''}`}
            onClick={() => setActiveTab('end')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" className="mr-2">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            Ending date
          </Button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 w-[320px]">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-1">
              <LeftArrowIcon />
            </button>
            <h2 className="text-sm font-semibold text-gray-900">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <button onClick={handleNextMonth} className="p-1">
              <RightArrowIcon />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <Divider className='border-b-gray-300 border-solid' />
          <div className="grid grid-cols-7 gap-1">
            {[...Array((firstDayOfMonth + 6) % 7).keys()].map((_, index) => (
              <div key={`empty-${index}`} className="h-8"></div>
            ))}
            {[...Array(daysInMonth).keys()].map((day) => {
              const date = day + 1;
              const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date);
              const isSelected = activeTab === 'start'
                ? date === startDate?.getDate() && currentMonth.getMonth() === startDate?.getMonth() && currentMonth.getFullYear() === startDate?.getFullYear()
                : date === endDate?.getDate() && currentMonth.getMonth() === endDate?.getMonth() && currentMonth.getFullYear() === endDate?.getFullYear();
              const isToday = date === new Date().getDate() &&
                              currentMonth.getMonth() === new Date().getMonth() &&
                              currentMonth.getFullYear() === new Date().getFullYear();
              const isDisabled = activeTab === 'end' && startDate && currentDate < startDate;
              return (
                <button
                  key={date}
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`h-8 w-8 flex items-center justify-center rounded-[6px] text-sm ${
                    isSelected
                      ? 'bg-[#7F56D9] text-white font-semibold'
                      : isToday
                      ? 'bg-[#F4EBFF] text-[#7F56D9] font-semibold'
                      : isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
