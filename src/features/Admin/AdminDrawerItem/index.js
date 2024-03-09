import React, { Fragment } from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Dashboard, Inventory, People, ShoppingCart, Settings } from '@mui/icons-material';
import { DASHBOARD } from '../../../constants/constants';
import './index.css';


export const AdminDrawerItem = () => {
  const getIcons = (name) => {
    const icons = {
      "Dashboard": <Dashboard />,
      "Establishments": <Inventory />,
      "Bookings": <ShoppingCart />,
      "Users": <People />,
      "Settings": <Settings />
    }

    return (name in icons) ? icons[name] : null;
  }

  return (
    <Fragment>
    {DASHBOARD?.DRAWER_ITEMS?.map((item, index) => {
      return (
      <ListItemButton key={index}>
        <ListItemIcon className='drawerIcon'>
          {getIcons(item)}
        </ListItemIcon>
        <ListItemText primary={item}/>
      </ListItemButton>
      )
    })}
    </Fragment>
  )
};

export default AdminDrawerItem;

