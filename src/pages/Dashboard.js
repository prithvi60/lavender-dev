import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box,
  Toolbar,
  Container,
} from '@mui/material';
import Copyright from '../components/Copyright';
import AdminAppBar from '../features/Admin/AdminAppBar';
import AdminDrawer from '../features/Admin/AdminDrawer';
import { DASHBOARD } from '../constants/constants';

const Dashboard = () => {
  const { openDrawer } = useSelector((state) => state.adminPage);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getViews = (name) => {
    const views = DASHBOARD?.DRAWER_COMPONENTS;
    const title = name?.toUpperCase()?.replace(/ /g, '_');

    return (title in views) ? views[title]?.COMPONENT : null;
  }

  return (
    <Box className="dashboard">
      <AdminAppBar open={open} toggleDrawer={toggleDrawer}/>
      <AdminDrawer open={open} toggleDrawer={toggleDrawer}/>
      <Box
        component="main"
        className="dashboard-box"
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <div>
            {getViews(openDrawer)}
          </div>
          <div className='footer'>
            <Copyright sx={{ pt: 4 }} />
          </div>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;