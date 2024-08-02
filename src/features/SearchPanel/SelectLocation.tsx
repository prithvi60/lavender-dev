import React, { Fragment, useState } from "react";
import { Grid, Box } from "@mui/material";
import Text from "../../components/Text";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { updateSearchSelectedBox } from "../../store/slices/searchPageSlice.js";
import LocationPanel from "./LocationPanel.tsx";
import VenuePanel from "./SelectLocation/VenuePanel.js";

const SelectTreatment = () => {
  const dispatch = useDispatch();
  const closeFilterPannel = () => {
    dispatch(updateSearchSelectedBox({ selectedBox: "" }));
  };

  return (
    <div className="treatment-container">
      <LocationPanel />
      <Box className="home-treatments-filter">
        <div className="flex-between-container">
          <Text sx={styles.header} align="left" name="Venues" />
          <CloseIcon onClick={() => closeFilterPannel()} />
        </div>
        <VenuePanel />
      </Box>
    </div>
  );
};

export default SelectTreatment;
const styles = {
  header: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#4D4D4D",
  },
};
