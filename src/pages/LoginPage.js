import React, { useEffect, useReducer } from 'react';
import { Grid } from '@mui/material';
import Login from '../features/Login';
import LoginLanding from '../features/Login/LoginLanding';

const LoginPage = () => {
  return (
      <div className="login-page">
          <LoginLanding />
      </div>
  );
};

export default LoginPage;
