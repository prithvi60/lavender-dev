import React, { useState, Fragment } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';
import { Button } from '../../../../components/Button';
import AddressForm from './AddressForm';

const EstablishmentForm = () => {
    const handleSubmit = () => {
        alert('submit!')
      };

    return ( <>
        <Typography component="h1" variant="h5" align="center" style={{ wordWrap: "break-word" }}>
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
    </>);
}

export default EstablishmentForm;