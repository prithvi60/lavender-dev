import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import {
  Paper,
  Grid
} from '@mui/material';
import EstablishmentForm from './components/EstablishmentForm';
import ImageUploader from '../../../components/ImageUploader';

const Establishment = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={9}>
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
            <EstablishmentForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxHeight: '75vh',
              overflow: 'auto'
            }}
          >
            <ImageUploader />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Establishment;