import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
import { DASHBOARD } from '../../../constants/constants';
import './index.css';
import AdminDrawerSubItem from '../AdminDrawerSubItem';


export const AdminDrawerItem = ({ collapse }) => {
  const initialState = {
    Dashboard: false,
    Establishments: false,
    Bookings: false,
    Users: false,
    Settings: false,
  };
  const [open, setOpen] = useState({...initialState});

  const handleCollapseClick = (name) => {
    if (collapse) {
      console.log('handleCollapseClick: ', name);
      const openTemp = {...open}
      openTemp[name] = !openTemp[name];
      setOpen(openTemp);
    }
  };

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

  const getRoutes = (name) => {
    const icons = {
      "Dashboard": <Dashboard />,
      "Establishments": <Inventory />,
      "Bookings": <ShoppingCart />,
      "Users": <People />,
      "Settings": <Settings />
    }

    return (name in icons) ? icons[name] : null;
  }

  useEffect(() => {
    if (!collapse) {
      setOpen({...initialState});
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
                {/* {
                  item?.subTitle?.map((sub, ind) => {
                    return (
                      <ListItem key={ind} button>
                        <ListItemText inset primary={sub} />
                      </ListItem>
                    )  
                  })
                } */}
                <AdminDrawerSubItem items={item?.subTitle}/>
              </List>
            </Collapse>
          </div> :
          <div key={index}>
            <ListItemButton key={index}>
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

