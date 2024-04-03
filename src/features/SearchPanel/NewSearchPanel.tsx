import React, { useEffect, useRef } from "react";
import { Grid, Box, Paper, Divider } from "@mui/material";
import Text from "../../components/Text";
import SelectTreatment from "./SelectTreatment";
import SelectTimePicker from "./SelectTime/SelectTimePicker.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from "@mui/icons-material";
import dayjs from "dayjs";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchModal, updateSearchDate, updateSearchSelectedBox } from "../../store/slices/searchPageSlice";
import SelectLocation from "./SelectLocation.tsx";
const NewSearchPanel = () => {


  const { selectedBox, showOptionContainer, treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state: any) => state.searchPage
  );

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
        const tomorrow = dayjs().add(1, 'day');
        return [tomorrow.startOf("day"), tomorrow.endOf("day")];
      },
    },
    {
      label: "+2days",
      getValue: () => {
        const tomorrow = dayjs().add(2, 'day');
        return [tomorrow.startOf("day"), tomorrow.endOf("day")];
      },
    },
    {
      label: "+3days",
      getValue: () => {
        const tomorrow = dayjs().add(3, 'day');
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

  const gridRef = useRef<HTMLDivElement>(null); // Explicitly specify the type of gridRef

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        // Clicked outside of the grid box
        dispatch(closeSearchModal());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);
  
  const onChangeDate = (data: any, context) => {
    debugger
    console.log('data', data)
    console.log('context', context)
    const fromDate = data[0]?.format('MMM DD') === undefined ? '' : data[0]?.format('MMM DD')
    const toDate = data[1]?.format('MMM DD') === undefined ? '' : data[1]?.format('MMM DD')

    dispatch(updateSearchDate({ selectedDate: `${fromDate} - ${toDate}` }));
  }

  const handleBoxClick = (name) => {
    debugger
    // Update form values on box click
    dispatch(updateSearchSelectedBox({ selectedBox: name, showOptionContainer: true }))
  };

  return (
    <div>
    <div className="search-panel">
      {/* <Form> */}

      <Grid container spacing={0}>
        <>
          <Grid key={`grid${1}`} item xs={2.98}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>
                {<ContentCut className='icon' />}
                <div className='search-box-title'>
                  {treatmentList && treatmentList.length > 0 ? (
                    <Text name={treatmentList.toString()}></Text>) :
                    (<><Text align="left" className='name-top' name="Select" />
                      <label htmlFor="name-bottom">
                        <Text id='name-bottom' align="left" className='name-bottom' name={'Treatment'} onClick={() => handleBoxClick('Treatment')} />
                      </label></>
                    )}

                </div>
              </div>

            </Box>
          </Grid>
          <Divider key={1} orientation="vertical" flexItem />

          <Grid key={`grid${2}`} item xs={2.98}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>
                {<LocationOn className='icon' />}
                <div className='search-box-title'>
                  {locationList && locationList.length > 0
                    ? <Text onClick={() => handleBoxClick('Location')} name={locationList.toString()}></Text>
                    :
                    <>
                      <Text align="left" className='name-top' name="Select" />
                      <label htmlFor="name-bottom">
                        <Text id='name-bottom' align="left" className='name-bottom' name='Location' onClick={() => handleBoxClick('Location')} />
                      </label></>
                  }
                </div>
              </div>

            </Box>
          </Grid>
          <Divider key={1} orientation="vertical" flexItem />


          <Grid key={`grid${3}`} item xs={2.98}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>
                <DateRange className='icon' />
                <div className='search-box-title'>
                  {selectedDate
                    ? <Text onClick={() => handleBoxClick('Date')} name={selectedDate}></Text>
                    :
                    <>
                      <Text align="left" className='name-top' name="Select" />
                      <label htmlFor="name-bottom">
                        <Text id='name-bottom' align="left" className='name-bottom' name='Date' onClick={() => handleBoxClick('Date')} />
                      </label></>
                  }
                </div>
              </div>
            </Box>
          </Grid>
          <Divider key={1} orientation="vertical" flexItem />

          <Grid key={`grid${4}`} item xs={2.98}>
            <Box
              className='search-box addtl-button MuiBox-root css-0'
            >
              <div className='search-box-title-icon'>
                {<AccessTime className='icon' />}
                <div className='search-box-title'>
                  {SelectedTime && (SelectedTime.from || SelectedTime.to)
                    ? <Text className='' onClick={() => handleBoxClick('Time')} name={`${SelectedTime?.from} - ${SelectedTime?.to}`}></Text>
                    :
                    <>
                      <Text align="left" className='name-top' name="Select" />
                      <label htmlFor="name-bottom">
                        <Text id='name-bottom' align="left" className='name-bottom' name='Time' onClick={() => handleBoxClick('Time')} />
                      </label></>
                  }
                </div>
              </div>
                <div className='addtl-search-icon'>
                  <Search className='search-button text-right mr-2' fontSize='medium' />
                </div>
            </Box>
          </Grid>


        </>
      </Grid>

      {selectedBox === "Treatment" &&
        showOptionContainer && (
          <Box>
            <Paper elevation={2} className="treatment-panel">
              <SelectTreatment />
            </Paper>
          </Box>
        )}



      {selectedBox === "Location" &&
        showOptionContainer && (
          <Box>
            <Paper elevation={2} className="treatment-panel">
              <SelectLocation />
            </Paper>
          </Box>
        )}

      {selectedBox === "Date" &&
        showOptionContainer && (
          <Box>
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
                  calendars={2}
                  onChange={onChangeDate}
                  sx={{
                    [`.${pickersLayoutClasses.contentWrapper}`]: {
                      alignItems: 'center',
                    },
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </Box>
        )}

      {selectedBox === "Time" &&
        showOptionContainer && (
          <Box>
            <Paper
              elevation={2}
              className="time-panel"
              style={{ overflow: "auto" }}
            >
              <SelectTimePicker /> {/* Pass form controller to SelectTimePicker */}
            </Paper>
          </Box>
        )}
      {/* </Form> */}
    </div>
    </div>
  );
};

export default NewSearchPanel;
