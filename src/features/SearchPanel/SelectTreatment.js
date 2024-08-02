import React, { Fragment } from "react";
import { Grid, Box } from "@mui/material";
import Text from "../../components/Text";
import CategoryPanel from "../SearchPanel/SelectTreatment/CategoryPanel";
import TreatmentPanel from "./TreatmentPanel.tsx";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { updateSearchSelectedBox } from "../../store/slices/searchPageSlice.js";

const SelectTreatment = () => {
  const dispatch = useDispatch();
  const closeFilterPannel = () => {
    dispatch(updateSearchSelectedBox({ selectedBox: "" }));
  };

  return (
    <div className="treatment-container">
      <TreatmentPanel />
      <Box className="home-treatments-filter">
        <div className="flex-between-container">
          <Text sx={styles.header} align="left" name="Categories" />
          <CloseIcon onClick={() => closeFilterPannel()} />
        </div>
        <CategoryPanel />
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
