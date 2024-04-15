import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import Text from "../../components/Text";
import Chip from "../../components/Chip";
import { updateSearchTreatment } from "../../store/slices/searchPageSlice";
import { useDispatch, useSelector } from "react-redux";

const TreatmentPanel = () => {
  const {
    selectedBox,
    showOptionContainer,
    treatmentList,
    locationList,
    selectedDate,
    SelectedTime,
  } = useSelector((state) => state.searchPage);
  const dispatch = useDispatch();

  const sampleData = {
    treatments: [
      "Hair Colouring",
      "Hair Cut",
      "Manicure",
      "Pedicure",
      "Body exfoliation",
      "Body wraps",
      "Body sculpting",
      "Body conditioning",
      "Body exfoliation",
      "Body wraps",
      "Body sculpting",
      "Body conditioning",
      "Body exfoliation",
      "Body wraps",
      "Body sculpting",
      "Body conditioning",
      "Body exfoliation",
      "Body wraps",
      "Body sculpting",
      "Body conditioning",
    ],
    categories: ["hair", "body", "massage", "nails", "hair", "body"],
  };

  const handleOnChange = (key, value) => {
    const dataTemp = [...treatmentList, value];
    // dataTemp[key] = value;
    dispatch(updateSearchTreatment({ treatment: dataTemp }));
  };

  const handleTagSelect = (tag) => {
    // Check if the tag already exists in the newTags list
    const tagAlreadyExists = treatmentList.some(
      (existingTag) => existingTag === tag,
    );

    if (!tagAlreadyExists) {
      handleOnChange("treatments", tag);
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = treatmentList?.filter((item) => item !== tag);
    // handleOnChange('treatments', updatedTags);
    dispatch(updateSearchTreatment({ treatment: updatedTags }));
  };

  return (
    <div className="home-treatments-filter">
      <Text
        variant="body1"
        align="left"
        className="bold"
        name="Choose your Treatments"
      />
      <div className="treatment-grid">
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {treatmentList?.map((tag, index) => {
              return (
                <Grid item key={index}>
                  <Chip
                    type={"deletable"}
                    className="delete"
                    label={tag}
                    onDelete={() => handleTagRemove(tag)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {sampleData?.treatments?.map((tag, index) => (
              <Grid item key={index}>
                <Chip
                  type={"clickable"}
                  label={tag}
                  onClick={() => handleTagSelect(tag)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TreatmentPanel;
