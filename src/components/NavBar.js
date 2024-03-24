import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Text from './Text';
import ButtonRouter from './ButtonRouter';
import { routes } from '../routes';

const Navbar = () => {
  const getLoginRoute = () => {
    return routes?.filter(item => item?.name === "Login")?.[0]?.path ?? ""
  }

  return (
    <AppBar position="fixed" className="nav-bar">
      <Toolbar>
        <Text align="left" className="nav-bar-title flex" variant="h6" sx={{ flexGrow: 1 }} name="Lavender"/>
        <Text className='nav-bar-title' variant="body2" name="Business"/>
        <ButtonRouter name={"Login"} to={getLoginRoute()}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;