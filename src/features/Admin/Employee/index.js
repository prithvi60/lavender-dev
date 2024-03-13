import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import {
  Paper,
  Grid
} from '@mui/material';
import EmployeeManagement from './components/EmployeeManagement';
import EmployeeForm from './components/EmployeeForm';

const Employee = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
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
            <EmployeeManagement />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
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
            <EmployeeForm />
          </Paper>
        </Grid>
        
      </Grid>
    </Fragment>
  );
}

export default Employee;