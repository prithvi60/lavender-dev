import React, { Fragment, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Text from "../../components/Text";
import Chip from "../../components/Chip";
import { updateSearchTreatment } from "../../store/slices/searchPageSlice";
import { useDispatch, useSelector } from "react-redux";
import endpoint from "../../api/endpoints";

const TreatmentPanel = () => {
  const [availableTreatments, setAvailableTreatments] = useState([]);

  const {
    selectedBox,
    showOptionContainer,
    treatmentList,
    locationList,
    selectedDate,
    SelectedTime,
  } = useSelector((state: any) => state.searchPage);
  const dispatch = useDispatch();

  const getServicesList = async () => {
    try {
      const treatementServicesResponse =
        await endpoint.getTreatmentServicesList();

      setAvailableTreatments(treatementServicesResponse?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getServicesList();
  }, []);

  const treatments = availableTreatments.map(
    (treatment) => treatment.serviceName
  );

  const sampleData = {
    treatments: [...treatments],
  };

  const handleOnChange = (key, value) => {
    const dataTemp = [...treatmentList, value];
    // dataTemp[key] = value;
    dispatch(updateSearchTreatment({ treatment: dataTemp }));
  };

  const handleTagSelect = (tag) => {
    // Check if the tag already exists in the newTags list
    const tagAlreadyExists = treatmentList.some(
      (existingTag) => existingTag === tag
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
        sx={{fontSize: '18px', fontWeight: 700, color: '#4D4D4D'}}
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
                    sx={{fontSize: '16px', fontWeight: 400, color: '#4D4D4D', backgroundColor: '#E6E1FF', borderRadius: '12px', padding: '8px 16px 8px 16px'}}
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
                  sx={{fontSize: '16px', fontWeight: 400, color: '#545454', backgroundColor: '#F2F2F2', borderRadius: '12px', padding: '8px 16px 8px 16px'}}
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
