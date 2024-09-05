import React, { useState } from 'react'
import Index from '../features/CustomerProfile/Index'
import { Box } from '@mui/material';
import Navbar from '../components/NavBar';
import { useSelector } from 'react-redux';

export const UserPage = () => {
    const [isSearchPage, setIsSearchPage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const userDetails = useSelector((state: any) => {
      return state.currentUserDetails;
    });
  return (
    <div>
        <Box className='landing-page'>
            <Navbar isSearchPage={isSearchPage} isLoggedIn={isLoggedIn} userName={userDetails?.fullName}/>
            <Index />
        </Box>
    </div>
  )
}
