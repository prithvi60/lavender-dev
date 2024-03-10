import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box,
  Toolbar,
  Container,
  Grid,
  Paper
} from '@mui/material';
import Bookings from './Bookings';
import Copyright from '../components/Copyright';
import AdminAppBar from '../features/Admin/AdminAppBar';
import AdminDrawer from '../features/Admin/AdminDrawer';
import { DRAWER_SUBITEMS } from '../constants/constants';

const Dashboard = () => {
  const { openDrawer } = useSelector((state) => state.adminPage);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getViews = (name) => {
    // 
    const views = DRAWER_SUBITEMS?.ESTABLISHMENT;
    const title = name?.toUpperCase()?.replace(/ /g, '_');

    return (title in views) ? views[title]?.COMPONENT : null;
  }

  return (
    <ThemeProvider theme={createTheme()}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AdminAppBar open={open} toggleDrawer={toggleDrawer}/>
        <AdminDrawer open={open} toggleDrawer={toggleDrawer}/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {getViews(openDrawer)}
            
          </Container>
          <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;