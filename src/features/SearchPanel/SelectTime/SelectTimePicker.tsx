import React, { Fragment, useState } from "react";
import { Grid, Box } from "@mui/material";
import Text from "../../../components/Text";
import Chip from "../../../components/Chip";
import { DigitalClock, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { updateSearchSelectedBox, updateSearchTimeFrom, updateSearchTimeTo } from "../../../store/slices/searchPageSlice";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';

export default function SelectTimePicker() {
  const { selectedBox, showOptionContainer, treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state: any) => state.searchPage
  );
  const dispatch = useDispatch();


  const timeSelectorChip = [
    { item: "Anytime", value: 2 },
    { item: "onehour", value: 1 },
    { item: "twohour", value: 2 },
    { item: "threehour", value: 3 },
    { item: "Morning", value: "Morning" },
    { item: "Afternoon", value: "Afternoon" },
    { item: "Evening", value: "Evening" },
  ];

  const onChangeFromTime = (value) => {
    dispatch(updateSearchTimeFrom({ SelectedTimeFrom: value.toDate() }))

  }

  const onChangeToTime = (value) => {
    
    dispatch(updateSearchTimeTo({ SelectedTimeTo: value.format('hh a') }))
  }

  function handleTagSelect(value) {
    

  }
  const closeFilterPannel = () => {
    dispatch(updateSearchSelectedBox({ selectedBox: '' }))
  }
  return (
    <React.Fragment>
      <div className="home-time-filter">
        <div className="flex-start-container">
          <Text
            variant="body1"
            align="left"
            className="bold"
            name="Chose your convenient Time slot"
          ></Text>
          <CloseIcon onClick={() => closeFilterPannel()} />
        </div>
        <Grid container xs={7} md={7} lg={12} className="grid">
          {timeSelectorChip?.map((tag, index) => (
            <Grid item key={index}>
              <Chip
                type={"clickable"}
                label={tag.item}
                onClick={() => handleTagSelect(tag.value)}
              />
            </Grid>
          ))}

        </Grid>
        <div className="flex row-auto gap-3 mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>

              <TimePicker
              views={['hours']}
              sx={{
                minWidth: 100,
                maxWidth: 150
              }} label="from"
                value={dayjs(SelectedTime.from)}
                // value={dayjs('2022-04-17T15:30')}
                // defaultValue={dayjs(SelectedTime.from, 'hh a')}
                onAccept={onChangeFromTime}
              />

              <TimePicker
              views={['hours']}
              sx={{
                minWidth: 100,
                maxWidth: 150,
                marginLeft: 3
              }} label="To"
              // value={dayjs('2022-04-17T15:30')}

                value={dayjs(SelectedTime.to)}
                // defaultValue={dayjs(SelectedTime.to, 'hh a')}
                onAccept={onChangeToTime}
              />
            </LocalizationProvider>
          </div>
      </div>
      {/* </Grid> */}
    </React.Fragment>
  );
}
