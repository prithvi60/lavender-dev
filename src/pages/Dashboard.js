import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
            <div className='footer'>
              <Copyright sx={{ pt: 4 }} />
            </div>
            
          </Container>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;