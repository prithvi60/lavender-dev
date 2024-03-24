import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@mui/material';
import { Notifications, Menu } from '@mui/icons-material';

const AdminAppBar = ({ open, toggleDrawer }) => {
    return ( 
        <AppBar position="fixed" className={`admin-appbar ${open ? 'open' : ''}`}>
          <Toolbar className='admin-toolbar'>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              className="menu-button"
            >
              <Menu />
            </IconButton>
            <Typography
              className="title"
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, textAlign: 'center' }}
            >
              Admin
            </Typography>
            <IconButton color="inherit" className="notification-button">
              <Badge badgeContent={4} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
     );
}

export default AdminAppBar;
