import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { WEEKDAYS } from "../../../constants/constants";
import { updateBusinessHours } from '../../../store/slices/admin/establishmentAdminSlice';

const BusinessHours = ({ onSubmit }) => {
  const { establishments, editEstablishmentId, businessHours } = useSelector((state) => state.establishmentAdmin);
  

  const handleCheckboxChange = (day) => (event) => {
    updateBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        isOpen: event.target.checked,
      },
    });
  };

  const handleTimeChange = (day, field) => (event) => {
    updateBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: event.target.value,
      },
    });
  };

  const handleSubmit = () => {
    console.log('============handleSubmit: ', businessHours);


    
  };

  useEffect(() => {
    if (onSubmit) {
      handleSubmit();
    }
  }, [onSubmit]);

  return (
    <>
    {WEEKDAYS?.map((day) => (
      <Grid key={day} item xs={12} className='weekday-grid'>
        <Grid item xs={4} >
          <FormControlLabel
            className='weekday-control-label'
            control={
              <Checkbox
                checked={businessHours[day].isOpen}
                onChange={handleCheckboxChange(day)}
              />
            }
            label={day}
          />
        </Grid>
        <Grid>
        {businessHours[day].isOpen ? (
              <>
              <TextField
                  // label="Open Time"
                  type="time"
                  value={businessHours[day].openTime}
                  onChange={handleTimeChange(day, 'openTime')}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  inputProps={{
                      step: 300, // 5 min
                  }}
              />
              <TextField
                  // label="Close Time"
                  type="time"
                  value={businessHours[day].closeTime}
                  onChange={handleTimeChange(day, 'closeTime')}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  inputProps={{
                      step: 300, // 5 min
                  }}
              />
              </>
          ) : (
              <Typography variant="body1">Closed</Typography>
          )}
        </Grid>
      </Grid>
    ))}

    </>
      
  );
};

export default BusinessHours;