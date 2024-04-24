import React, { useEffect, useRef, useState } from "react";
import { Box, Paper } from "@mui/material";
import Text from "../../components/Text.js";
import SelectTreatment from "./SelectTreatment.js";
import SelectTimePicker from "./SelectTime/SelectTimePicker.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { AccessTime, ContentCut, DateRange, LocationOn, Search } from "@mui/icons-material";
import dayjs from "dayjs";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchModal, updateSearchDate, updateSearchSelectedBox } from "../../store/slices/searchPageSlice.js";
import SelectLocation from "./SelectLocation.tsx";
import ButtonRouter from "../../components/ButtonRouter.js";
import { getRoute } from "../../utils/index.js";
import { Link } from "react-router-dom";
import {convertTo_HH_AM} from '../../utils/TimeFormat.ts'
import { useMutation, useQuery } from "@tanstack/react-query";
import endpoint from "../../api/endpoints.ts";
import GetIcon from "../../assets/Icon/icon.tsx";
const NewSearchPanel = () => {


  const { selectedBox, showOptionContainer, treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state) => state.searchPage
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
  
  const onChangeDate = (data) => {
    
    const fromDate = data[0]?.format('MMM DD') === undefined ? '' : data[0]?.format('MMM DD')
    const toDate = data[1]?.format('MMM DD') === undefined ? '' : data[1]?.format('MMM DD')

    dispatch(updateSearchDate({ selectedDate: `${fromDate} - ${toDate}` }));
  }

  const handleBoxClick = (name) => {
    
    // Update form values on box click
    dispatch(updateSearchSelectedBox({ selectedBox: name, showOptionContainer: true }))
  };
//  const mutation = useMutation({
//     mutationFn : (payLoad) => {
//       return useQuery([], ()=>{endpoint.getSearchCustomers(payLoad)})
//     },
//   })
const [queryResult, setQueryResult] = useState(null);
const payLoad = {
  
}
useEffect(()=>{
  
}, [])

//const {isLoading, isRefetching, data: customersData} = useQuery({queryKey: ['customer-data'], queryFn: () =>{ return endpoint.getSearchCustomers(payLoad)}})
//const {data} = useQuery({queryKey: ['customer-da'], queryFn: () =>{ return endpoint.getEstablishemntDetails()}})




  const handleSearchIconClick = () => {
    
    // mutation.mutate(payLoad)
    return getRoute("Search")
  }

 

  return (
    <div>
    <div className="search-panel">
      {/* <Form> */}

      <div className="grid-container">
        <>
          <div className={`grid-items ${selectedBox === 'Treatment' && 'active'}`}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>

                <GetIcon iconName='TreatmentHeartIcon'/>
                <div className='search-box-title'>
                  {treatmentList && treatmentList.length > 0 ? (
                    <Text className='cursor-pointer' onClick={() => handleBoxClick('Treatment')} name={treatmentList.toString().replaceAll(',', ', ')}></Text>) :
                    (<><Text align="left" className='name-top' name="Select" />
                      <label htmlFor="name-bottom">
                        <Text id='name-bottom' align="left" className='name-bottom' name={'Treatment'} onClick={() => handleBoxClick('Treatment')} />
                      </label></>
                    )}

                </div>
              </div>

            </Box>
          </div>

          <div className={`grid-items ${selectedBox === 'Location' && 'active'}`}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>
              <GetIcon iconName='LocationIcon'/>
                <div className='search-box-title'>
                  {locationList && locationList.length > 0
                    ? <Text className='cursor-pointer' onClick={() => handleBoxClick('Location')} name={locationList.toString().replaceAll(',', ', ')}></Text>
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
          </div>

          <div className={`grid-items ${selectedBox === 'Date' && 'active'}`}>
            <Box
              className={`search-box ${false ? 'selected' : ''} ${selectedBox?.toLowerCase() === "time" ? 'addtl-button' : ''}`}
            >
              <div className='search-box-title-icon'>
              <GetIcon iconName='CalendarIcon'/>
                <div className='search-box-title'>
                  {selectedDate
                    ? <Text  className='cursor-pointer' onClick={() => handleBoxClick('Date')} name={selectedDate}></Text>
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
          </div>

          <div className={`grid-items ${selectedBox === 'Time' && 'active'}`}>
            <Box
              className='search-box addtl-button MuiBox-root css-0'
            >
              <div className='search-box-title-icon'>
              <GetIcon iconName='AccessTimeFilledIcon'/>
                <div className='search-box-title'>
                  {SelectedTime && (SelectedTime.from || SelectedTime.to)
                    ? <Text  className='cursor-pointer' onClick={() => handleBoxClick('Time')} name={`${convertTo_HH_AM(SelectedTime?.from)} - ${convertTo_HH_AM(SelectedTime?.to)}`}></Text>
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
                    <Link to={handleSearchIconClick()}>
                      <Search className='search-button text-right mr-2' fontSize='medium' />
                    </Link>
                </div>
            </Box>
          </div>


        </>
      </div>

      {selectedBox === "Treatment" &&
        showOptionContainer && (
          <div className="home-filter-panel">
            <Paper elevation={2} className="treatment-panel">
              <SelectTreatment />
            </Paper>
          </div>
        )}



      {selectedBox === "Location" &&
        showOptionContainer && (
          <div className="home-filter-panel three-column">
            <div></div>
            <Paper elevation={2} className="treatment-panel">
              <SelectLocation />
            </Paper>
          </div>
        )}

      {selectedBox === "Date" &&
        showOptionContainer && (
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
                      alignItems: 'center',
                    },
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </div>
        )}

      {selectedBox === "Time" &&
        showOptionContainer && (
          <div className="home-filter-panel one-column">
            <div></div>
            <Paper
              elevation={2}
              className="time-panel"
              style={{ overflow: "auto" }}
            >
              <SelectTimePicker /> {/* Pass form controller to SelectTimePicker */}
            </Paper>
          </div>
        )}
      {/* </Form> */}
    </div>
    </div>
  );
};

export default NewSearchPanel;
