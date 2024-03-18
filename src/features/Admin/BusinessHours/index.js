import React, { Fragment } from 'react';
import {
  Paper,
  Grid
} from '@mui/material';

import BusinessHoursCard from './BusinessHoursCard';

const BusinessHours = () => {
  return (
    <Fragment>
    <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            className={"b-business-hours-div"}
            elevation={0}
          >
            <BusinessHoursCard />
          </Paper>
        </Grid>
        
      </Grid>
      
    </Fragment>
  );
}

export default BusinessHours;