import React, { Fragment } from 'react';import {
  Paper,
  Grid
} from '@mui/material';
import EstablishmentForm from './components/EstablishmentForm';
import EstablishmentManagement from './components/EstablishmentManagement';

const Establishment = () => {
  return (
    <Fragment>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EstablishmentManagement />
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              // maxHeight: '75vh',
              overflow: 'hidden'
            }}
          >
            <EstablishmentForm />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Establishment;