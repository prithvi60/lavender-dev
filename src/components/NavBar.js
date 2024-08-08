import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Stack, Box } from '@mui/material';
import Button from './Button.js';
import ButtonRouter from './ButtonRouter';
import { getRoute } from '../utils';
import PersonIcon from '@mui/icons-material/Person';
import GetIcon from '../assets/Icon/icon.tsx';
import { useNavigate } from 'react-router-dom';
import endpoint from '../api/endpoints.ts';
import NavFilter from './NavFilter.tsx';
import NewSearchPanel from '../features/SearchPanel/NewSearchPanel.jsx';

const Navbar = (props) => {
  const { isSearchPage, isLoggedIn } = props;
  const [showSearchBar, setshowSearchBar] = useState(false);
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem('Token')) {
        const fetchCurrentUserDetails = async () => {
          try {
            const response = await endpoint.getCurrentUserDetails();
            const userDetails = response?.data;
            setUserName(userDetails?.data?.fullName);
            setUserType(userDetails?.data?.userType);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
        };
        fetchCurrentUserDetails();
      }
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const handleLogOutBtn = () => {
    localStorage.clear();
    return navigate('/');
  };

  return (
    <>
      <AppBar position="fixed" className="nav-bar">
        <Toolbar>
          <GetIcon
            className="cursor-pointer nav-bar-title flex"
            align="left"
            onClick={() => navigate('/')}
            iconName="LavenderFullLogo"
          />
          <Box sx={{display: 'flex', justifyContent: 'end', '@media (max-width: 600px)': {display: 'flex', flexDirection: 'column-reverse'}}}>
            {isSearchPage && <Box sx={{'@media (max-width: 600px)': {alignSelf: 'center'}}}><NavFilter setshowSearchBar={setshowSearchBar} /></Box>}
            <Stack spacing={2} direction="row" sx={{'@media (max-width: 600px)': {display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}}>
              {isLoggedIn && (
                <Button
                  onClick={handleLogOutBtn}
                  className="button-outline"
                  variant="outlined"
                  name="Logout"
                  sx={{ width: '120px', height: '37px', fontFamily: 'Urbanist', borderRadius: '10px' }}
                />
              )}
              {userType === 'BU' && (
                <Button
                  href={getRoute('Business')}
                  className="button-outline"
                  variant="outlined"
                  name={'Business'}
                  sx={{ width: '120px', height: '37px', fontFamily: 'Urbanist', borderRadius: '10px' }}
                />
              )}
              {isLoggedIn ? (
                <ButtonRouter
                  sx={{ width: '100%', height: '37px', fontFamily: 'Urbanist', borderRadius: '10px' }}
                  name={userName}
                  to="/userprofile"
                  startIcon={<PersonIcon />}
                />
              ) : (
                <ButtonRouter
                  sx={{ width: '120px', height: '37px', fontFamily: 'Urbanist', borderRadius: '10px' }}
                  name={'Log in'}
                  to="/login"
                />
              )}
            </Stack>
          </Box>

          {isSearchPage && showSearchBar && (
            <div className="searched-search-panel">
              <NewSearchPanel />
            </div>
          )}
        </Toolbar>
      </AppBar>
      {isSearchPage && showSearchBar && <div className="search-overlay"></div>}
    </>
  );
};

export default Navbar;
