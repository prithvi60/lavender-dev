import React from 'react';
import { Typography, Grid } from '@mui/material';
import BusinessHoursForm from './BusinessHoursForm';
import '../index.css'

const BusinessHoursCard = () => {
  return (
    <Grid className='b-business-hours-card'>
        <Grid item xs={12} md={6} lg={6}>
            <Typography className='b-business-hours-title'>{"Opening Hours"}</Typography>
            <Typography>{'These are the hours during which your business is open'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
            <BusinessHoursForm />
        </Grid>
    </Grid>
    


  );
};

export default BusinessHoursCard;
