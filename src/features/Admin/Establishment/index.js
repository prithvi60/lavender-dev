import React, { useState, Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';
import { Button } from '../../../components/Button';
import AddressForm from './components/AddressForm';

const Establishment = () => {

  const handleSubmit = () => {
    alert('submit!')
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Add Establishment
          </Typography>
        <Fragment>
            <AddressForm />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleSubmit}
              name={"Submit"}
              sx={{ mt: 3, ml: 1 }}
            />
            </Box>
        </Fragment>
          
        </Paper>
      </Container>
    </Fragment>
  );
}

export default Establishment;