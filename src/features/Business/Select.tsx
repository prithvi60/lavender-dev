import React from 'react';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ServiceSelect() {
  const [service, setService] = React.useState('Ladies Haircut');

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <div>
      <InputLabel id="service-label" style={{ fontSize: '1rem', color: '#000', marginBottom: '0.5rem' }}>Service</InputLabel>
      {/* <FormControl variant="outlined" style={{ width: '100%', marginBottom: '1rem' }}>
        <Select
          labelId="service-label"
          id="service-select"
          value={service}
          onChange={handleChange}
          label="Service"
          style={{ height: '2.5rem' }}
          
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        >
          <MenuItem value="Hair shaping">Hair shaping</MenuItem>
          <MenuItem value="Ladies Trim">Ladies Trim</MenuItem>
          <MenuItem value="Ladies Haircut">Ladies Haircut</MenuItem>
          <MenuItem value="Kids Haircut">Kids Haircut</MenuItem>
          <MenuItem value="Colouring">Colouring</MenuItem>
          <MenuItem value="Highlights">Highlights</MenuItem>
          <MenuItem value="Permanent colouring">Permanent colouring</MenuItem>
        </Select>
      </FormControl> */}
      <TextField
          id="standard-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select your currency"
          variant="outlined"
        >
          {['qwe', 'asd', 'asd'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
    </div>
  );
}
