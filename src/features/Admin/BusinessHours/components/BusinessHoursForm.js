import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { WEEKDAYS } from '../../../../constants/constants';

import '../index.css';

const BusinessHours = () => {
  const [businessHours, setBusinessHours] = useState(
    WEEKDAYS.reduce((acc, day) => {
      acc[day] = {
        isOpen: false,
        openTime: '',
        closeTime: '',
      };
      return acc;
    }, {})
  );

  const handleCheckboxChange = (day) => (event) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        isOpen: event.target.checked,
      },
    });
  };

  const handleTimeChange = (day, field) => (event) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        [field]: event.target.value,
      },
    });
  };

  return (
    <Grid container spacing={2}>
      {WEEKDAYS.map((day) => (
        <Grid key={day} item xs={12} className='b-weekday-grid'>
          <FormControlLabel
            className='b-weekday-control-label'
            control={
              <Checkbox
                checked={businessHours[day].isOpen}
                onChange={handleCheckboxChange(day)}
              />
            }
            label={day}
          />
          <div>
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
          </div>
          
        </Grid>
      ))}
    </Grid>
  );
};

export default BusinessHours;