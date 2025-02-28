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
}) {
  return (
    <>
      <Select
        onValueChange={(value) => {
          onSelect(value);
        }}
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
              <SelectItem value={opt}>{opt}</SelectItem>
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
export const AppointmentDateSelector = ({
  startDate,
  endDate,
  startDateControl,
  endDateControl,
}) => {
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (endDate < startDate) {
      endDateControl("");
    }
  }, [endDate]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className="flex justify-between w-64"
          >
            <GetIcon iconName={"CalenderIcon"} />
            {startDate.toLocaleDateString("en-au") || "__/__/____"} to{" "}
            {endDate ? endDate?.toLocaleDateString("en-au") : "__/__/____"}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[350px]">
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <Tabs
              value={tabValue}
              onChange={(event, v: number) => setTabValue(v)}
            >
              <Tab
                sx={{ "& ": { textTransform: "initial", minHeight: "35px" } }}
                icon={<GetIcon iconName={"CalenderIcon"} />}
                iconPosition="start"
                label="Starting date"
              />
              <Tab
                sx={{ "& ": { textTransform: "initial", minHeight: "35px" } }}
                icon={<GetIcon iconName={"CalenderIcon"} />}
                iconPosition="start"
                label="Ending date"
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={tabValue} index={0}>
            <CalendarHeaderComponent
              date={startDate}
              onChange={startDateControl}
            />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <CalendarHeaderComponent date={endDate} onChange={endDateControl} />
          </CustomTabPanel>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
