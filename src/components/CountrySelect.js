import React from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';
import { COUNTRIES } from '../constants/countries';

const CountrySelect = () => {
  return (
    <Autocomplete
      id="country-select"
      sx={{ width: '100%' }}
      options={COUNTRIES}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default CountrySelect;
