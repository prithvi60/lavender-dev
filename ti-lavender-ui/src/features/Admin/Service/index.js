import React from 'react';
import { Grid, Paper } from '@mui/material';
import ServiceManagement from './ServiceManagement';
import ServiceForm from './ServiceForm';

const Service = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ServiceManagement />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ServiceForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Service;