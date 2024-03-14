import React, { Fragment } from 'react';
import {
  Paper,
  Grid
} from '@mui/material';

import BusinessHoursCard from './components/BusinessHoursCard';

const BusinessHours = () => {
  return (
    <Fragment>
    <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: '75vh',
              overflow: 'hidden'
            }}
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