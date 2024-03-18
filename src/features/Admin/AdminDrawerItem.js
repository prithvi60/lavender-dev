import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Collapse
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  People,
  ShoppingCart,
  Settings,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { DASHBOARD } from '../../constants/constants'; 
import AdminDrawerSubItem from './AdminDrawerSubItem';
import { saveOpenDrawer } from '../../store/slices/adminPageSlice';


export const AdminDrawerItem = ({ collapse }) => {
  const dispatch = useDispatch();

  const initialState = {
    Dashboard: false,
    Management: false,
    Bookings: false,
    Users: false,
    Settings: false,
  };
  const [open, setOpen] = useState({...initialState});

  const handleCollapseClick = (name) => {
    if (collapse) {
      const openTemp = {...open}
      openTemp[name] = !openTemp[name];
      setOpen(openTemp);

      if (name) {
        dispatch(saveOpenDrawer({openDrawer: name}));
      }
    }
  };

  const getIcons = (name) => {
    const icons = {
      "Dashboard": <Dashboard />,
      "Management": <Inventory />,
      "Bookings": <ShoppingCart />,
      "Users": <People />,
      "Settings": <Settings />
    }

    return (name in icons) ? icons[name] : null;
  }

  useEffect(() => {
    if (!collapse) {
      setOpen({
        Dashboard: false,
        Establishments: false,
        Bookings: false,
        Users: false,
        Settings: false,
      });
    }
  }, [collapse])

  return (
    <Fragment>
    {DASHBOARD?.DRAWER_ITEMS?.map((item, index) => {
      return (
        item?.subTitle ? 
          <div key={index}>
            <ListItem button onClick={() => handleCollapseClick(item?.title)}>
              <ListItemIcon className='b-drawer-icon'>
                  {getIcons(item?.title)}
              </ListItemIcon>
              <ListItemText primary={item?.title} />
              {open?.[item?.title] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open?.[item?.title]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <AdminDrawerSubItem items={item?.subTitle}/>
              </List>
            </Collapse>
          </div> :
          <div key={index}>
            <ListItemButton key={index} onClick={() => handleCollapseClick(item?.title)}>
              <ListItemIcon className='b-drawer-icon'>
                {getIcons(item?.title)}
              </ListItemIcon>
              <ListItemText primary={item?.title}/>
            </ListItemButton>
          </div>
      )
    })}
    </Fragment>
  )
};

export default AdminDrawerItem;