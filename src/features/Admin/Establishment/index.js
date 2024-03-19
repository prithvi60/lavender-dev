import React, { Fragment, useState } from 'react';import {
  Paper,
  Grid
} from '@mui/material';
import EstablishmentForm from './components/EstablishmentForm';
import EstablishmentManagement from './components/EstablishmentManagement';

const Establishment = () => {
  const [data, setData] = useState({
    addEst: false,
    editEst: false
  });

  return (
    <Fragment>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EstablishmentManagement />
        </Grid>
        {
          data?.addEst &&
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
        }
      </Grid>
    </Fragment>
  );
}

export default Establishment;