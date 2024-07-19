import React, { Fragment, useState } from "react";
import { Grid, Box, Avatar } from "@mui/material";
import Text from "../../../components/Text";
import { DigitalClock, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { updateSearchSelectedBox, updateSearchTime, updateSearchTimeFrom, updateSearchTimeTo } from "../../../store/slices/searchPageSlice";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import GetIcon from "../../../assets/Icon/icon.tsx";

export default function SelectTimePicker() {
  const { selectedBox, showOptionContainer, treatmentList, locationList, selectedDate, SelectedTime } = useSelector(
    (state: any) => state.searchPage
  );
  const dispatch = useDispatch();


  const timeSelectorChip = [
    { item: "Anytime", iconName: 'AccessTimeFilledIcon', from: 1, to: 23 },
    { item: "Now", iconName: 'AccessTimeFilledIcon', from: new Date().getHours(), to: new Date().getHours() + 1 },
    { item: "Twohour", iconName: 'MoreTimeIcon', from: new Date().getHours(), to: new Date().getHours() + 1 },
    { item: "Morning", iconName: 'MorningIcon', from: 5, to: 12 },
    { item: "Afternoon", iconName: 'LightModeIcon', from: 12, to: 16 },
    { item: "Evening", iconName: 'NightIcon', from: 16, to: 23 },
  ];

  const onChangeFromTime = (value) => {
    dispatch(updateSearchTimeFrom({ SelectedTimeFrom: value.toDate() }))

  }

  const onChangeToTime = (value) => {
    dispatch(updateSearchTimeTo({ SelectedTimeTo: value.toDate() }))
  }

  function handleTagSelect(from, to) {
    const currentDate = new Date()

    dispatch(updateSearchTime({ SelectedTimeFrom: currentDate.setHours(from), SelectedTimeTo: currentDate.setHours(to) }))

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
        <Grid container xs={7} md={7} lg={12} className="grid" spacing={2}>
          {timeSelectorChip?.map((tag, index) => (
            <Grid item key={index}>
              <Chip
                label={tag.item}
                onClick={() => handleTagSelect(tag.from, tag.to)}
                // avatar={<Avatar src="/static/images/avatar/1.jpg" />}
                icon={<GetIcon iconName={tag.iconName} />}
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
