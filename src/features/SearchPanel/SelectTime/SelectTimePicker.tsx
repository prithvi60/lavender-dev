import React, { Fragment, useState } from "react";
import { Grid, Box } from "@mui/material";
import Text from "../../../components/Text";
import Chip from "../../../components/Chip";
import { DigitalClock, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { updateSearchTimeFrom, updateSearchTimeTo } from "../../../store/slices/searchPageSlice";
import dayjs from "dayjs";

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
    debugger
    dispatch(updateSearchTimeFrom({ SelectedTimeFrom: value.format('hh a') }))

  }

  const onChangeToTime = (value) => {
    debugger
    dispatch(updateSearchTimeTo({ SelectedTimeTo: value.format('hh a') }))
  }

  function handleTagSelect(value) {
    debugger

  }
  return (
    <React.Fragment>
      <div className="ml-4">
        <Text
          variant="body1"
          align="left"
          className="bold"
          name="Chose your convenient Time slot"
        ></Text>
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

          <div className="flex row-auto gap-3 mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <TimePicker sx={{
                minWidth: 100,
                maxWidth: 150
              }} label="from"
                value={dayjs(SelectedTime.from, 'hh a')}
                // defaultValue={dayjs(SelectedTime.from, 'hh a')}
                onAccept={onChangeFromTime}
              />

              <TimePicker sx={{
                minWidth: 100,
                maxWidth: 150,
                marginLeft: 3
              }} label="To"
                value={dayjs(SelectedTime.to, 'hh a')}
                // defaultValue={dayjs(SelectedTime.to, 'hh a')}
                onAccept={onChangeToTime}
              />
            </LocalizationProvider>
          </div>
        </Grid>
      </div>

      {/* </Grid> */}
    </React.Fragment>
  );
}
