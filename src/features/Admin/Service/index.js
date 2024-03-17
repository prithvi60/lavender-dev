import React from 'react';
import { Grid, Paper } from '@mui/material';
import ServiceManagement from './components/ServiceManagement';
import ServiceForm from './components/ServiceForm';

const Service = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* <Typography variant="h6">Salon Services</Typography> */}
        {/* MUI DataTable component for salon services */}
        <ServiceManagement />
      </Grid>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '75vh',
            overflow: 'hidden'
          }}
        >
          <ServiceForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Service;