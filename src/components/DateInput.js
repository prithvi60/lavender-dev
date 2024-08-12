import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Typography, Grid } from '@mui/material';

const DatePicker = ({control, error, field}) => {
  const { watch, setValue } = useForm();
  const [days, setDays] = useState([]);

  const years = Array.from(new Array(100), (val, index) => 2024 - index);
  const months = Array.from(new Array(12), (val, index) => index + 1);

  const year = watch('date.year');
  const month = watch('date.month');

  useEffect(() => {
    if (year && month) {
      const daysInMonth = new Date(year, month, 0).getDate();
      setDays(Array.from(new Array(daysInMonth), (val, index) => index + 1));
    }
  }, [year, month]);
  
  
//   useEffect(() => {
//     if (year && month) {
//       const daysInMonth = new Date(year, month, 0).getDate();
//       setDays(Array.from(new Array(daysInMonth), (val, index) => index + 1));
//     }
//   }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Typography variant="caption" style={{ position: 'absolute', top: 0, left: 0 }}>
        Date of Birth
      </Typography>
      <Grid container spacing={2} >
        <Controller
          name="date"
          control={control}
          defaultValue={{ year: '', month: '', day: '' }}
          render={({ field }) => (
            <>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={field.value.year}
                    onChange={(e) => setValue('date.year', e.target.value)}
                    label="Year"
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={field.value.month}
                    onChange={(e) => setValue('date.month', e.target.value)}
                    label="Month"
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Day</InputLabel>
                  <Select
                    value={field.value.day}
                    onChange={(e) => setValue('date.day', e.target.value)}
                    label="Day"
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}
        />
      </Grid>
    </div>
  );
};

export default DatePicker;
