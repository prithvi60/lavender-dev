import React, { useState, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import {
  Box,
  Container,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import { Button } from '../../../components/Button';
import AddressForm from './components/AddressForm';
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