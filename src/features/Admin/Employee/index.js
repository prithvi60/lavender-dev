import React, { Fragment } from 'react';

import {
  Paper,
  Grid
} from '@mui/material';
import EmployeeManagement from './EmployeeManagement';
import EmployeeForm from './EmployeeForm';

const Employee = () => {
  return (
    <Fragment>
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
            <EmployeeManagement />
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
            <EmployeeForm />
          </Paper>
        </Grid>
        
      </Grid>
    </Fragment>
  );
}

export default Employee;