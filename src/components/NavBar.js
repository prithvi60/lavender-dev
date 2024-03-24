import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Text from './Text';
import ButtonRouter from './ButtonRouter';
import { getRoute } from '../utils';
import TextRouter from './TextRouter';

const Navbar = () => {
  const getLoginRoute = () => {
    return getRoute("Login")
  }

  const getAdminRoute = () => {
    return getRoute("Admin");
  }

  return (
    <AppBar position="fixed" className="nav-bar">
      <Toolbar>
        <Text align="left" className="nav-bar-title flex" variant="h6" sx={{ flexGrow: 1 }} name="Lavender"/>
        <TextRouter className='nav-bar-title' variant="body2" name="Business" to={getAdminRoute()}/>
        <ButtonRouter name={"Login"} to={getLoginRoute()}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;