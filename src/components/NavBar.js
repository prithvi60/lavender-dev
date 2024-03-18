import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Navbar = () => {
  return (
    <AppBar position="static" className="b-nav-bar">
      <Toolbar>
        <Typography className="b-nav-bar-title" variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lavender
        </Typography>
        <Typography>Business</Typography>
        <Button className="b-button">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;