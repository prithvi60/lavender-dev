import React from 'react';
import { Grid } from '@mui/material';
import Login from '../features/Login';

const LoginPage = () => {
  return (
      <div className="login-page">
          <Grid container spacing={0} className="background-grids">
              <Grid item xs={7} className="background-grid cover" />
              <Grid item xs={5} className="background-grid" />
          </Grid>
          <Grid container spacing={5} justifyContent="center" alignItems="center" className="login-container">
              <Grid item xs={12}>
                  <Login />
              </Grid>
          </Grid>
      </div>
  );
};

export default LoginPage;
